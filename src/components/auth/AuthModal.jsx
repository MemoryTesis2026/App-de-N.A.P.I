import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  X,
  UserCheck,
  GraduationCap,
  Lock,
  Mail,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  KeyRound,
  AlertCircle
} from 'lucide-react';

export const AuthModal = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalTab,
    login,
    loginTeacher,
    loginStudent
  } = useAuth();

  const [activeTab, setActiveTab] = useState(authModalTab || 'teacher');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Sincronizar tab cuando cambia desde afuera
  React.useEffect(() => {
    setActiveTab(authModalTab || 'teacher');
    setError('');
  }, [authModalTab]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Por favor ingresa tu correo institucional y contraseña.');
      return;
    }

    setIsLoading(true);
    try {
      await login({
        email: email.trim(),
        password: password.trim(),
        name: name.trim() || undefined,
        expectedRole: activeTab
      });
    } catch (err) {
      setError(err.message || 'No se pudo iniciar sesión.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = async (role) => {
    setError('');
    setIsLoading(true);
    try {
      if (role === 'teacher') {
        await loginTeacher();
      } else {
        await loginStudent();
      }
    } catch (err) {
      setError(err.message || 'No se pudo iniciar sesión demo con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Contenedor Modal */}
      <div
        className="bg-brand-surface rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-brand-border animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera Modal en #1E293B */}
        <div className="bg-brand-primary p-6 text-white relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-blue to-brand-cyan flex items-center justify-center text-white shadow-glow-cyan">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-lg font-black tracking-tight text-white">
              N<span className="text-brand-cyan">API</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Sede Maipú
            </span>
          </div>

          <h3 className="text-xl font-bold text-white">
            Autenticación Institucional
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Selecciona tu perfil de acceso para ingresar a la plataforma
          </p>

          {/* Selector de Rol / Tabs */}
          <div className="grid grid-cols-2 gap-2 mt-5 p-1 bg-slate-800/80 rounded-xl border border-slate-700">
            <button
              type="button"
              onClick={() => { setActiveTab('teacher'); setError(''); }}
              className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'teacher'
                  ? 'bg-brand-blue text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Docente / Admin</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('student'); setError(''); }}
              className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'student'
                  ? 'bg-brand-blue text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Estudiante</span>
            </button>
          </div>
        </div>

        {/* Cuerpo del Formulario */}
        <div className="p-6 space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Botón de Acceso Rápido Demo */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-brand-blue" />
                Acceso Rápido Demo (Supabase)
              </span>
              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                1-Click
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Ingresa instantáneamente como {activeTab === 'teacher' ? 'Docente Coordinador' : 'Estudiante Egresado'} autenticado en Render.
            </p>
            <button
              type="button"
              onClick={() => handleQuickDemo(activeTab)}
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-brand-primary bg-gradient-to-r from-brand-cyan/20 to-blue-100 hover:from-brand-cyan/30 hover:to-blue-200 border border-brand-cyan/40 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-brand-cyan" />
              <span>Entrar como {activeTab === 'teacher' ? 'Docente Demo' : 'Estudiante Demo'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-xs text-slate-400 font-medium">o ingresa tus credenciales</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Formulario Estándar */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nombre Completo (Opcional)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={activeTab === 'teacher' ? 'Prof. Marcela Rojas' : 'Flavio Escobar Mendoza'}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Correo Institucional INACAP
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
                  placeholder={activeTab === 'teacher' ? 'docente.maipu@inacap.cl' : 'flavio.escobar@inacapmail.cl'}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (error) setError(''); }}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-brand-blue hover:bg-brand-blue-hover shadow-glow-blue transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Validando sesión...</span>
              ) : (
                <>
                  <span>Ingresar como {activeTab === 'teacher' ? 'Docente / Admin' : 'Estudiante'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer de Seguridad */}
          <div className="pt-2 text-center">
            <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Conexión cifrada institucional • INACAP Sede Maipú</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
