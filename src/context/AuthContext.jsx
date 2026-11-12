import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { INITIAL_PROJECTS } from '../data/mockProjects';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://n-a-p-i.onrender.com';

const AuthContext = createContext(null);

const GUEST_USER = {
  role: 'guest', // 'guest' | 'teacher' | 'student' | 'admin'
  rol: 'guest',  // 'guest' | 'docente' | 'estudiante' | 'administrador'
  name: '',
  email: '',
  title: '',
  career: '',
  area: '',
  avatar: ''
};

// Normaliza el rol retornado por el backend ('docente'|'estudiante'|'administrador' o 'teacher'|'student'|'admin')
export const normalizeUserRole = (rawRole) => {
  const clean = String(rawRole || '').toLowerCase().trim();
  if (clean === 'docente' || clean === 'teacher') {
    return { role: 'teacher', rol: 'docente' };
  }
  if (clean === 'administrador' || clean === 'admin') {
    return { role: 'admin', rol: 'administrador' };
  }
  if (clean === 'estudiante' || clean === 'student' || clean === 'alumno') {
    return { role: 'student', rol: 'estudiante' };
  }
  return { role: null, rol: null };
};

// Convierte un proyecto de Supabase al formato esperado por los componentes móviles
export const normalizeProject = (sp, index = 0) => {
  if (!sp) return null;

  const rawStatus = sp.status || sp.estado || 'Publicado';
  let status = 'Publicado';
  if (rawStatus === 'Público' || rawStatus === 'Publicado') {
    status = 'Publicado';
  } else if (rawStatus === 'Oculto') {
    status = 'Oculto';
  } else {
    status = rawStatus;
  }

  const authors = Array.isArray(sp.authors)
    ? sp.authors
    : typeof sp.autores === 'string' && sp.autores.trim()
      ? sp.autores.split(',').map(a => a.trim()).filter(Boolean)
      : typeof sp.authors === 'string' && sp.authors.trim()
        ? sp.authors.split(',').map(a => a.trim()).filter(Boolean)
        : ['Estudiante INACAP'];

  const stack = Array.isArray(sp.stack)
    ? sp.stack
    : typeof sp.stack === 'string' && sp.stack.trim()
      ? sp.stack.split(',').map(s => s.trim()).filter(Boolean)
      : ['Tecnología Aplicada'];

  const notaNum = parseFloat(String(sp.nota || sp.finalGrade || 6.5).replace(',', '.')) || 6.5;

  return {
    id: sp.id || `tesis-${index + 1}`,
    title: sp.title || sp.titulo || sp.nombre || 'Proyecto sin título',
    summary: sp.summary || sp.resumen || sp.desc || 'Sin resumen disponible.',
    career: sp.career || sp.carrera || 'Ingeniería en Informática',
    academicArea: sp.academicArea || sp.area || 'Informática, Ciberseguridad y Telecomunicaciones',
    year: String(sp.year || sp.anio || '2025'),
    authors,
    advisor: sp.advisor || 'Prof. Sede Maipú',
    methodology: sp.methodology || 'Metodología de investigación aplicada y desarrollo tecnológico INACAP.',
    conclusions: sp.conclusions || 'Proyecto validado e indexado en el repositorio académico de Sede Maipú.',
    stack,
    originalityScore: sp.originalityScore || Math.min(98, Math.max(85, Math.round(notaNum * 14))),
    status,
    finalGrade: String(notaNum),
    nota: notaNum,
    archivo_url: sp.archivo_url || null,
    fileSize: sp.fileSize || '6.4 MB',
    pages: sp.pages || 85,
    views: sp.views ?? 120,
    featured: sp.featured ?? false,
    rating: sp.rating || 4.8,
    created_at: sp.created_at || null
  };
};

export const AuthProvider = ({ children }) => {
  // Restaurar sesión guardada en localStorage
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('napi_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed && parsed.email && parsed.role && parsed.role !== 'guest') {
          const { role, rol } = normalizeUserRole(parsed.role || parsed.rol);
          if (role) {
            return {
              ...GUEST_USER,
              ...parsed,
              role,
              rol: parsed.rol || rol
            };
          }
        }
      }
    } catch (e) {
      console.warn('Error al restaurar sesión desde localStorage:', e);
    }
    return GUEST_USER;
  });

  // Vista activa actual en la SPA ('landing' | 'admin' | 'student')
  const [activeView, setActiveView] = useState(() => {
    try {
      const savedUser = localStorage.getItem('napi_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        const { role } = normalizeUserRole(parsed?.role || parsed?.rol);
        if (role === 'teacher' || role === 'admin') return 'admin';
        if (role === 'student') return 'student';
      }
    } catch (e) {}
    return 'landing';
  });

  // Base de proyectos sincronizada con Supabase (con INITIAL_PROJECTS como respaldo)
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('napi_projects');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((p, i) => normalizeProject(p, i));
        }
      }
    } catch (e) {}
    return INITIAL_PROJECTS;
  });

  const [isLoadingProjects, setIsLoadingProjects] = useState(false);

  // Guardar respaldo local de proyectos cuando cambien
  useEffect(() => {
    try {
      localStorage.setItem('napi_projects', JSON.stringify(projects));
    } catch (e) {}
  }, [projects]);

  // Sincronizar lista de proyectos desde Render / Supabase
  const syncProjects = useCallback(async () => {
    setIsLoadingProjects(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects`);
      if (res.ok) {
        const data = await res.json();
        const remoteList = Array.isArray(data?.projects)
          ? data.projects
          : Array.isArray(data)
            ? data
            : [];

        if (remoteList.length > 0) {
          const normalized = remoteList
            .filter(sp => sp && (sp.titulo || sp.title || sp.nombre))
            .map((sp, idx) => normalizeProject(sp, idx));
          if (normalized.length > 0) {
            setProjects(normalized);
          }
        }
      }
    } catch (err) {
      console.warn('Servidor dormido o sin conexión, manteniendo proyectos de respaldo:', err);
    } finally {
      setIsLoadingProjects(false);
    }
  }, []);

  // Al montar: despertar instancia Free de Render con /api/health y sincronizar proyectos
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/health`).catch(() => {});
    syncProjects();
  }, [syncProjects]);

  // Control de Modales
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('teacher'); // 'teacher' | 'student'

  const [isNapiOpen, setIsNapiOpen] = useState(false);
  const [napiInitialPrompt, setNapiInitialPrompt] = useState('');

  const [selectedProject, setSelectedProject] = useState(null);

  // Autenticación real contra POST ${API_BASE_URL}/api/auth/login
  const login = async ({ email, password, name, expectedRole } = {}) => {
    const cleanEmail = (email || '').trim();
    const cleanPassword = (password || '').trim();

    if (!cleanEmail || !cleanPassword) {
      throw new Error('Por favor ingresa tu correo institucional y contraseña.');
    }

    let res;
    try {
      res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: cleanEmail,
          password: cleanPassword
        })
      });
    } catch (networkErr) {
      throw new Error('No se pudo conectar con el servidor N.A.P.I. Verifica tu conexión o intenta nuevamente en unos segundos.');
    }

    let data = {};
    try {
      data = await res.json();
    } catch (parseErr) {
      throw new Error('Respuesta inválida del servidor de autenticación.');
    }

    if (!res.ok || !data.success || !data.user) {
      throw new Error(data.detail || data.message || 'Credenciales inválidas. Verifica tu correo y contraseña.');
    }

    const { role, rol } = normalizeUserRole(data.user.rol || data.user.role || expectedRole);

    if (!role || !['teacher', 'student', 'admin'].includes(role)) {
      throw new Error('El rol del usuario retornado no es válido para esta plataforma.');
    }

    // Validar que el rol corresponda a la pestaña seleccionada si se especificó expectedRole
    if (expectedRole === 'student' && role !== 'student') {
      throw new Error('Esta cuenta pertenece a un perfil Docente/Administrador. Cambia a la pestaña Docente.');
    }
    if (expectedRole === 'teacher' && role === 'student') {
      throw new Error('Esta cuenta pertenece a un Estudiante. Cambia a la pestaña Estudiante.');
    }

    const authenticatedUser = {
      id: data.user.id || '',
      role, // 'teacher' | 'student' | 'admin'
      rol,  // 'docente' | 'estudiante' | 'administrador'
      name: (name && name.trim()) || data.user.nombre || data.user.name || (role === 'student' ? 'Estudiante INACAP' : 'Docente INACAP'),
      email: data.user.email || cleanEmail,
      title:
        role === 'admin'
          ? 'Administrador Sede Maipú'
          : role === 'teacher'
            ? 'Docente / Evaluador INACAP'
            : 'Estudiante INACAP Sede Maipú',
      career: data.user.carrera || data.user.career || 'Ingeniería en Informática',
      area: data.user.area || 'Informática, Ciberseguridad y Telecomunicaciones',
      avatar:
        data.user.avatar ||
        (role === 'student'
          ? 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'),
      accessToken: data.access_token || null
    };

    setUser(authenticatedUser);
    try {
      localStorage.setItem('napi_user', JSON.stringify(authenticatedUser));
    } catch (e) {}

    setActiveView(role === 'student' ? 'student' : 'admin');
    setIsAuthModalOpen(false);
    syncProjects();

    return authenticatedUser;
  };

  // Helpers compatibles con componentes existentes (usan login real en Render)
  const loginTeacher = async (customData = {}) => {
    return login({
      email: customData.email || 'docente.maipu@inacap.cl',
      password: customData.password || 'InacapPassword123!',
      name: customData.name,
      expectedRole: 'teacher'
    });
  };

  const loginStudent = async (customData = {}) => {
    return login({
      email: customData.email || 'flavio.escobar@inacapmail.cl',
      password: customData.password || 'InacapPassword123!',
      name: customData.name,
      expectedRole: 'student'
    });
  };

  const logout = () => {
    setUser(GUEST_USER);
    try {
      localStorage.removeItem('napi_user');
    } catch (e) {}
    setIsNapiOpen(false);
    setSelectedProject(null);
    setActiveView('landing');
  };

  const openAuthModal = (tab = 'teacher') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Gestión de NAPI
  const openNapi = (initialPrompt = '') => {
    setNapiInitialPrompt(initialPrompt);
    setIsNapiOpen(true);
  };

  const closeNapi = () => {
    setIsNapiOpen(false);
  };

  // Gestión de Tesis sincronizada con Supabase
  const addProject = async (newProject, rawFile = null) => {
    const tempId = `tesis-${Date.now().toString().slice(-4)}`;
    const optimisticProject = normalizeProject({
      ...newProject,
      id: tempId,
      views: 1,
      rating: 5.0,
      status: newProject.status || 'Publicado',
      featured: false
    });

    setProjects(prev => [optimisticProject, ...prev]);

    try {
      const formData = new FormData();
      formData.append('titulo', optimisticProject.title);
      formData.append('carrera', optimisticProject.career);
      formData.append('anio', parseInt(optimisticProject.year, 10) || 2025);
      formData.append(
        'autores',
        Array.isArray(optimisticProject.authors)
          ? optimisticProject.authors.join(', ')
          : String(optimisticProject.authors || '')
      );
      formData.append('resumen', optimisticProject.summary);
      formData.append('nota', parseFloat(String(optimisticProject.finalGrade || '6.5').replace(',', '.')) || 6.5);
      formData.append('area', optimisticProject.academicArea || 'Informática, Ciberseguridad y Telecomunicaciones');
      formData.append(
        'stack',
        Array.isArray(optimisticProject.stack)
          ? optimisticProject.stack.join(', ')
          : String(optimisticProject.stack || 'General')
      );
      formData.append('estado', optimisticProject.status === 'Publicado' ? 'Público' : 'Oculto');
      if (rawFile) {
        formData.append('archivo', rawFile);
      }

      const resp = await fetch(`${API_BASE_URL}/api/projects`, {
        method: 'POST',
        body: formData
      });

      if (resp.ok) {
        const savedData = await resp.json();
        if (savedData?.project) {
          const normalizedSaved = normalizeProject(savedData.project);
          setProjects(prev => prev.map(p => (p.id === tempId ? normalizedSaved : p)));
          return normalizedSaved;
        }
      }
    } catch (err) {
      console.warn('No se pudo sincronizar nuevo proyecto con el servidor:', err);
    }

    return optimisticProject;
  };

  const toggleProjectStatus = async (id) => {
    let targetProject = null;
    setProjects(prev =>
      prev.map(p => {
        if (p.id === id) {
          const nextStatus = p.status === 'Publicado' ? 'Oculto' : 'Publicado';
          targetProject = { ...p, status: nextStatus };
          return targetProject;
        }
        return p;
      })
    );

    if (targetProject) {
      try {
        await fetch(`${API_BASE_URL}/api/projects/${encodeURIComponent(id)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            estado: targetProject.status === 'Publicado' ? 'Público' : 'Oculto'
          })
        });
      } catch (err) {
        console.warn('Error actualizando estado del proyecto en Supabase:', err);
      }
    }
  };

  const deleteProject = async (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    try {
      await fetch(`${API_BASE_URL}/api/projects/${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.warn('Error eliminando proyecto en Supabase:', err);
    }
  };

  const openProjectDetail = (project) => {
    if (!project) return;
    const normalized = normalizeProject(project);
    setProjects(prev => prev.map(p => (p.id === normalized.id ? { ...p, views: (p.views || 0) + 1 } : p)));
    setSelectedProject(normalized);
  };

  const closeProjectDetail = () => {
    setSelectedProject(null);
  };

  return (
    <AuthContext.Provider
      value={{
        API_BASE_URL,
        user,
        login,
        loginTeacher,
        loginStudent,
        logout,
        projects,
        isLoadingProjects,
        syncProjects,
        addProject,
        toggleProjectStatus,
        deleteProject,
        activeView,
        setActiveView,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        isNapiOpen,
        napiInitialPrompt,
        openNapi,
        closeNapi,
        selectedProject,
        openProjectDetail,
        closeProjectDetail
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
