import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { ThemeToggleCircle } from '../common/ThemeToggleCircle';
import napiLogo from '../../assets/napi-logo.png';
import {
  GraduationCap,
  UserCheck,
  ArrowRight,
  Lock,
  Mail,
  User,
  ShieldCheck,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';

/**
 * Pantalla de inicio de la App NAPI conectada al backend real en Render / Supabase.
 * Inspirada fielmente en la paleta oficial de la web de NAPI (Azul Marino INACAP #0F2942, Blanco y Gris pizarra).
 */
export const LoginScreen = () => {
  const { login } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [tab, setTab]           = useState('student'); // 'student' | 'teacher'
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd]   = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const isStudent = tab === 'student';

  const handleTabChange = (nextTab) => {
    setTab(nextTab);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Por favor ingresa tu correo institucional y contraseña.');
      return;
    }

    setLoading(true);
    try {
      await login({
        email: email.trim(),
        password: password.trim(),
        name: name.trim() || undefined,
        expectedRole: isStudent ? 'student' : 'teacher'
      });
    } catch (err) {
      setError(err.message || 'No se pudo iniciar sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col flex-1 overflow-y-auto transition-colors duration-200 ${
      isDark ? 'bg-[#0b1320] text-slate-100' : 'bg-[#f8fafc] text-[#0f2942]'
    }`}>

      {/* ── Hero Header con Paleta Oficial NAPI ── */}
      <div className={`px-6 pt-7 pb-7 text-center relative overflow-hidden shrink-0 border-b ${
        isDark 
          ? 'bg-gradient-to-b from-[#0a192f] to-[#0f1d33] border-slate-800 text-white' 
          : 'bg-gradient-to-b from-[#0f2942] to-[#163a5c] border-slate-200 text-white shadow-sm'
      }`}>
        {/* Circulito de cambio Blanco/Negro en la esquina superior derecha, limpio y accesible */}
        <div className="absolute top-3.5 right-3.5 z-20">
          <ThemeToggleCircle size="sm" />
        </div>

        <div className="relative z-10 space-y-2.5">
          {/* Logo Oficial de NAPI */}
          <div className="inline-flex items-center justify-center p-2.5 rounded-2xl bg-white shadow-lg mx-auto border border-slate-200">
            <img 
              src={napiLogo} 
              alt="Logo Oficial NAPI" 
              className="w-20 h-14 object-contain filter drop-shadow-sm select-none"
            />
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center justify-center gap-1">
              <span>N.A.P.I</span>
            </h1>
            <p className="text-[11px] text-blue-200 font-semibold tracking-wider uppercase mt-0.5">
              Repositorio Institucional & Asistente IA
            </p>
            <p className="text-[10px] text-slate-300 mt-0.5 font-medium">
              Gestión y Validación Académica de Tesis
            </p>
          </div>
        </div>
      </div>

      {/* ── Selector de Rol (Estudiante | Docente) con Estilo de Píldoras NAPI ── */}
      <div className="px-5 -mt-3.5 relative z-10 shrink-0">
        <div className={`flex p-1 rounded-xl shadow-sm border transition-colors ${
          isDark 
            ? 'bg-[#162032] border-slate-700/80 shadow-black/40' 
            : 'bg-white border-slate-200 shadow-slate-200/60'
        }`}>
          <button
            type="button"
            onClick={() => handleTabChange('student')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
              isStudent
                ? 'bg-[#0f2942] text-white shadow-sm ring-1 ring-[#0f2942]'
                : isDark
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-[#0f2942]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            Estudiante
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('teacher')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
              !isStudent
                ? 'bg-[#0f2942] text-white shadow-sm ring-1 ring-[#0f2942]'
                : isDark
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-[#0f2942]'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            Docente
          </button>
        </div>
      </div>

      {/* ── Formulario Principal ── */}
      <div className="flex-1 px-5 pt-4 pb-8 space-y-4">
        <form 
          onSubmit={handleSubmit} 
          className={`rounded-2xl p-4 border shadow-sm space-y-3.5 transition-colors ${
            isDark 
              ? 'bg-[#131f33] border-slate-800' 
              : 'bg-white border-slate-200'
          }`}
        >
          {error && (
            <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-[11px] font-semibold flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
              isDark ? 'text-slate-300' : 'text-[#0f2942]'
            }`}>
              Nombre Completo (Opcional)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={isStudent ? 'Flavio Escobar Mendoza' : 'Prof. Marcela Rojas'}
                className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs transition-colors border outline-none ${
                  isDark
                    ? 'bg-[#0b1320] border-slate-700 text-white placeholder-slate-500 focus:border-blue-400'
                    : 'bg-slate-50/70 border-slate-200 text-[#0f2942] placeholder-slate-400 focus:border-[#0f2942] focus:bg-white'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
              isDark ? 'text-slate-300' : 'text-[#0f2942]'
            }`}>
              Correo Institucional
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={e => { setEmail(e.target.value); if (error) setError(''); }}
                placeholder={isStudent ? 'flavio.escobar@inacapmail.cl' : 'docente.maipu@inacap.cl'}
                className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs transition-colors border outline-none ${
                  isDark
                    ? 'bg-[#0b1320] border-slate-700 text-white placeholder-slate-500 focus:border-blue-400'
                    : 'bg-slate-50/70 border-slate-200 text-[#0f2942] placeholder-slate-400 focus:border-[#0f2942] focus:bg-white'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
              isDark ? 'text-slate-300' : 'text-[#0f2942]'
            }`}>
              Contraseña
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPwd ? 'text' : 'password'}
                required
                value={password}
                onChange={e => { setPassword(e.target.value); if (error) setError(''); }}
                placeholder="••••••••"
                className={`w-full pl-9 pr-10 py-2.5 rounded-xl text-xs transition-colors border outline-none ${
                  isDark
                    ? 'bg-[#0b1320] border-slate-700 text-white placeholder-slate-500 focus:border-blue-400'
                    : 'bg-slate-50/70 border-slate-200 text-[#0f2942] placeholder-slate-400 focus:border-[#0f2942] focus:bg-white'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPwd ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase text-white bg-[#0f2942] hover:bg-[#163a5c] disabled:opacity-60 shadow-md transition-all flex items-center justify-center gap-2 mt-2 active:scale-[0.99]"
          >
            {loading ? 'Verificando en Supabase...' : `Ingresar como ${isStudent ? 'Estudiante' : 'Docente'}`}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Footer de seguridad institucional */}
        <p className={`text-center text-[10px] flex items-center justify-center gap-1.5 pt-2 ${
          isDark ? 'text-slate-500' : 'text-slate-400'
        }`}>
          <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
          INACAP Sede Maipú · Conexión Institucional Segura · 2026
        </p>
      </div>

    </div>
  );
};
