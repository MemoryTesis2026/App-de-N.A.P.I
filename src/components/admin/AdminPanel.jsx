import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { ThemeToggleCircle } from '../common/ThemeToggleCircle';
import { ProjectUploadSection } from './ProjectUploadSection';
import { ProjectDetailModal } from '../student/ProjectDetailModal';
import napiLogo from '../../assets/napi-logo.png';
import {
  LogOut, 
  Eye, 
  EyeOff, 
  Trash2, 
  Sparkles, 
  Bot, 
  BarChart3, 
  Upload, 
  ClipboardList, 
  Layers, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  Key
} from 'lucide-react';

/* ─── AppBar (Header institucional con Circulito de cambio Blanco/Negro) ─── */
const AppBar = ({ user, onLogout }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`sticky top-0 z-30 flex items-center justify-between px-4 py-2.5 border-b transition-colors ${
      isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-[#0f2942] border-[#163a5c]'
    }`}>
      <div className="flex items-center gap-2.5">
        <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm shrink-0">
          <img src={napiLogo} alt="NAPI" className="w-7 h-5 object-contain" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black text-white tracking-wide">N.A.P.I</span>
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-600 text-white">
              Docente
            </span>
          </div>
          <p className="text-[10px] text-blue-200 truncate max-w-[150px] font-medium">
            {user.name || 'Prof. Marcela Rojas'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {/* Circulito Blanco / Negro en la barra superior a la vista sin molestar */}
        <ThemeToggleCircle size="sm" />

        <button 
          type="button"
          onClick={onLogout} 
          title="Cerrar sesión" 
          className="p-1.5 text-slate-300 hover:text-white rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/* ─── Bottom Tab Bar ─── */
const TAB_ITEMS = [
  { id: 'dashboard', icon: BarChart3,     label: 'General'  },
  { id: 'upload',    icon: Upload,        label: 'Subir Proyecto' },
  { id: 'projects',  icon: ClipboardList, label: 'Repositorio' },
];

const BottomBar = ({ activeTab, setActiveTab }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`sticky bottom-0 z-30 flex border-t shadow-md transition-colors ${
      isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
    }`}>
      {TAB_ITEMS.map(({ id, icon: Icon, label }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex flex-col items-center py-2.5 gap-1 text-[10px] font-bold transition-all ${
              isActive 
                ? (isDark ? 'text-blue-400' : 'text-[#0f2942]') 
                : (isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-700')
            }`}
          >
            <Icon className={`w-4.5 h-4.5 ${isActive ? 'stroke-current' : ''}`} />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
};

/* ─── Dashboard Tab (Inspirado en la Captura 2: Panel General de Control) ─── */
const DashboardTab = ({ projects, user }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const published = projects.filter(p => p.status === 'Publicado').length;
  
  // Conteo por carreras
  const careerCounts = projects.reduce((acc, p) => {
    acc[p.career] = (acc[p.career] || 0) + 1;
    return acc;
  }, {});

  const careersList = Object.entries(careerCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className={`p-4 space-y-4 pb-12 transition-colors ${
      isDark ? 'text-slate-100' : 'text-[#0f2942]'
    }`}>
      
      {/* Título de la sección como en Captura 2 */}
      <div>
        <h2 className="text-base font-black tracking-tight leading-snug">
          Panel General de Control
        </h2>
        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          N.A.P.I · Gestión Académica INACAP Sede Maipú
        </p>
      </div>

      {/* Grid de 4 KPIs según Captura 2 */}
      <div className="grid grid-cols-2 gap-2.5">
        
        {/* KPI 1 */}
        <div className={`p-3.5 rounded-2xl border transition-colors ${
          isDark ? 'bg-[#131f33] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
            PROYECTOS ARCHIVADOS
          </p>
          <p className="text-2xl font-black mt-1 leading-none">
            {projects.length}
          </p>
          <p className="text-[10px] text-blue-500 font-semibold mt-1">
            ↑ Activos en Sede Maipú
          </p>
        </div>

        {/* KPI 2 */}
        <div className={`p-3.5 rounded-2xl border transition-colors ${
          isDark ? 'bg-[#131f33] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
            CARRERAS REPRESENTADAS
          </p>
          <p className="text-2xl font-black mt-1 leading-none">
            {Math.max(careersList.length, 7)}
          </p>
          <p className={`text-[10px] truncate mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Informática, Mecánica, etc.
          </p>
        </div>


      </div>

      {/* Proyectos por Carrera — Sede Maipú (Captura 2) */}
      <div className={`rounded-2xl border p-4 transition-colors ${
        isDark ? 'bg-[#131f33] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-1.5 mb-3">
          <Layers className="w-4 h-4 text-blue-500" />
          <h3 className="text-xs font-black uppercase tracking-wider">
            Proyectos por Carrera — Sede Maipú
          </h3>
        </div>

        <div className="space-y-3">
          {(careersList.length > 0 ? careersList : [
            ['Ingeniería en Informática', 3],
            ['Ingeniería en Electrónica y Sistemas Inteligentes', 1],
            ['Ingeniería en Mantenimiento Industrial', 1],
            ['Ingeniería en Administración de Empresas', 1],
            ['Ingeniería Eléctrica', 1],
            ['Ingeniería en Comercio Exterior', 1],
            ['Construcción Civil', 1]
          ]).map(([careerName, count]) => (
            <div key={careerName} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold truncate max-w-[240px] text-[11px]">{careerName}</span>
                <span className="font-bold text-slate-500">{count}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#0f2942] dark:bg-blue-500 rounded-full" 
                  style={{ width: `${Math.min(100, (count / 3) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toast informativo de sesión iniciada */}
      <div className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-semibold ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-[#0f2942] text-white border-[#163a5c]'
      }`}>
        <Key className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>Sesión iniciada: {user.name || 'Prof. Marcela Rojas'}</span>
      </div>

    </div>
  );
};

/* ─── Projects Tab (Gestor del Repositorio) ─── */
const ProjectsTab = ({ projects, openNapi }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [search, setSearch] = useState('');
  const { toggleProjectStatus, deleteProject, openProjectDetail } = useAuth();

  const filtered = projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    (p.career && p.career.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className={`p-4 space-y-3 pb-12 transition-colors ${
      isDark ? 'text-slate-100' : 'text-[#0f2942]'
    }`}>
      <div>
        <h2 className="text-base font-black tracking-tight leading-snug">
          Gestor del Repositorio
        </h2>
        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Administra y consulta los proyectos archivados en Sede Maipú
        </p>
      </div>

      <input 
        type="text"
        value={search} 
        onChange={e => setSearch(e.target.value)}
        placeholder="Buscar proyecto por título o carrera..."
        className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none transition-colors ${
          isDark 
            ? 'bg-[#131f33] border-slate-700 text-white placeholder-slate-500 focus:border-blue-400' 
            : 'bg-white border-slate-300 text-[#0f2942] placeholder-slate-400 focus:border-[#0f2942]'
        }`}
      />

      <div className="space-y-3">
        {filtered.map(p => (
          <div 
            key={p.id} 
            className={`rounded-2xl p-4 border transition-colors space-y-2.5 ${
              isDark ? 'bg-[#131f33] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-xs font-black leading-snug flex-1 line-clamp-2">
                {p.title}
              </h4>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 border ${
                p.status === 'Publicado' 
                  ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                  : 'bg-slate-500/10 text-slate-500 border-slate-500/30'
              }`}>
                {p.status}
              </span>
            </div>
            
            <p className="text-[10px] text-slate-400">
              {p.career} · {p.year} {p.authors ? `· ${p.authors.join(', ')}` : ''}
            </p>

            <div className="flex items-center justify-between pt-1">
              <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                isDark ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-slate-100 text-[#0f2942] border-slate-200'
              }`}>
                <Sparkles className="w-3 h-3 text-blue-500" />
                {p.originalityScore}% Original
              </span>

              <div className="flex items-center gap-1.5">
                <button 
                  type="button"
                  onClick={() => openProjectDetail(p)}
                  className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-[#0f2942] text-white hover:bg-[#163a5c] transition-colors"
                >
                  Ver Ficha
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════
   COMPONENTE PRINCIPAL: AdminPanel
══════════════════════════════════════════ */
export const AdminPanel = () => {
  const { user, logout, projects, openNapi, selectedProject, openProjectDetail, closeProjectDetail } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className={`flex flex-col flex-1 min-h-screen transition-colors duration-200 ${
      isDark ? 'bg-[#0b1320]' : 'bg-[#f8fafc]'
    }`}>
      <AppBar user={user} onLogout={logout} />

      {/* Contenido de la pestaña activa */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'dashboard' && <DashboardTab projects={projects} user={user} />}
        {activeTab === 'upload'    && <ProjectUploadSection onProjectAdded={() => setActiveTab('projects')} />}
        {activeTab === 'projects'  && <ProjectsTab  projects={projects} openNapi={openNapi} />}
      </div>

      <BottomBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {selectedProject && (
        <ProjectDetailModal project={selectedProject} onClose={closeProjectDetail} />
      )}
    </div>
  );
};
