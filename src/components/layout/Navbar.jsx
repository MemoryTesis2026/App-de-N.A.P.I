import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Sparkles, 
  BookOpen, 
  UserCheck, 
  GraduationCap, 
  LogOut, 
  Menu, 
  X, 
  ShieldCheck, 
  Layers, 
  Lightbulb, 
  Bot,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const Navbar = () => {
  const { 
    user, 
    logout, 
    openAuthModal, 
    activeView, 
    setActiveView, 
    openNapi 
  } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    if (activeView !== 'landing') {
      setActiveView('landing');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-brand-primary/95 backdrop-blur-md shadow-lg py-3' : 'bg-brand-primary py-4'
    } border-b border-slate-700/60`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Institucional */}
          <div 
            onClick={() => { setActiveView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-cyan flex items-center justify-center text-white shadow-glow-cyan transition-transform group-hover:scale-105">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-brand-primary rounded-full"></span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white font-sans">
                  N<span className="text-brand-cyan">API</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 rounded-full">
                  Sede Maipú
                </span>
              </div>
              <span className="text-[11px] text-slate-300 font-medium tracking-wide">
                INACAP • Repositorio Inteligente
              </span>
            </div>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => { setActiveView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeView === 'landing' 
                  ? 'text-brand-cyan bg-slate-800/80 font-semibold' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Inicio
            </button>

            <button
              onClick={() => scrollToSection('sobre-nosotros')}
              className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
            >
              Sobre Nosotros
            </button>

            <button
              onClick={() => scrollToSection('como-surgio')}
              className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Lightbulb className="w-4 h-4 text-amber-400" />
              ¿Cómo surgió la idea?
            </button>

            <button
              onClick={() => scrollToSection('conoce-napi')}
              className="px-3.5 py-2 text-sm font-medium text-brand-cyan hover:text-cyan-300 hover:bg-cyan-950/40 rounded-lg transition-colors flex items-center gap-1.5 font-semibold"
            >
              <Bot className="w-4 h-4" />
              Conoce a NAPI
            </button>

            {/* Accesos a Módulos según Rol */}
            {user.role === 'teacher' && (
              <button
                onClick={() => setActiveView('admin')}
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeView === 'admin' 
                    ? 'text-white bg-brand-blue shadow-md font-semibold' 
                    : 'text-blue-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Layers className="w-4 h-4" />
                Panel Docente
              </button>
            )}

            <button
              onClick={() => setActiveView('student')}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                activeView === 'student' 
                  ? 'text-white bg-brand-blue shadow-md font-semibold' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Catálogo de Tesis
            </button>
          </nav>

          {/* Botones de Autenticación / Perfil Usuario */}
          <div className="hidden sm:flex items-center gap-3">
            {user.role === 'guest' ? (
              <>
                <button
                  onClick={() => openAuthModal('teacher')}
                  className="px-3.5 py-2 text-xs md:text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg transition-all flex items-center gap-2 hover:border-slate-500 shadow-sm"
                >
                  <UserCheck className="w-4 h-4 text-brand-cyan" />
                  <span>Docente / Admin</span>
                </button>

                <button
                  onClick={() => openAuthModal('student')}
                  className="px-4 py-2 text-xs md:text-sm font-semibold text-white bg-brand-blue hover:bg-brand-blue-hover rounded-lg shadow-glow-blue transition-all flex items-center gap-2 hover:scale-[1.02]"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Acceso Estudiante</span>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3 bg-slate-800/90 border border-slate-700 px-3 py-1.5 rounded-xl">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-cyan"
                />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-white leading-tight">
                    {user.name.split(' ')[0]} {user.name.split(' ')[1] || ''}
                  </span>
                  <span className="text-[10px] font-semibold text-brand-cyan uppercase tracking-wider">
                    {user.role === 'teacher' ? 'Docente / Admin' : 'Estudiante'}
                  </span>
                </div>

                <button
                  onClick={logout}
                  title="Cerrar Sesión"
                  className="ml-2 p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700/60 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Botón Menú Mobile */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
              aria-label="Abrir Menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Desplegable Mobile */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-brand-primary border-b border-slate-700 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => { setActiveView('landing'); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeView === 'landing' ? 'bg-slate-800 text-brand-cyan font-bold' : 'text-slate-300'
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('sobre-nosotros')}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800"
            >
              Sobre Nosotros
            </button>
            <button
              onClick={() => scrollToSection('como-surgio')}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 flex items-center justify-between"
            >
              <span>¿Cómo surgió la idea?</span>
              <Lightbulb className="w-4 h-4 text-amber-400" />
            </button>
            <button
              onClick={() => scrollToSection('conoce-napi')}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-brand-cyan hover:bg-slate-800 flex items-center justify-between font-semibold"
            >
              <span>Conoce a NAPI</span>
              <Bot className="w-4 h-4" />
            </button>

            <button
              onClick={() => { setActiveView('student'); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                activeView === 'student' ? 'bg-brand-blue text-white font-bold' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>Catálogo de Tesis</span>
              <BookOpen className="w-4 h-4" />
            </button>

            {user.role === 'teacher' && (
              <button
                onClick={() => { setActiveView('admin'); setMobileMenuOpen(false); }}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                  activeView === 'admin' ? 'bg-brand-blue text-white font-bold' : 'text-blue-300 hover:bg-slate-800'
                }`}
              >
                <span>Panel Docente (Admin)</span>
                <Layers className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="pt-3 border-t border-slate-700 space-y-2">
            {user.role === 'guest' ? (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { openAuthModal('teacher'); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 px-3 text-xs font-bold text-center text-slate-200 bg-slate-800 border border-slate-600 rounded-lg flex items-center justify-center gap-1.5"
                >
                  <UserCheck className="w-4 h-4 text-brand-cyan" />
                  <span>Docente / Admin</span>
                </button>
                <button
                  onClick={() => { openAuthModal('student'); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 px-3 text-xs font-bold text-center text-white bg-brand-blue rounded-lg flex items-center justify-center gap-1.5"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Estudiante</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-slate-800/90 p-3 rounded-xl">
                <div className="flex items-center gap-2">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover ring-1 ring-brand-cyan" />
                  <div>
                    <p className="text-xs font-bold text-white">{user.name}</p>
                    <p className="text-[10px] text-brand-cyan">{user.title}</p>
                  </div>
                </div>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="px-2.5 py-1.5 text-xs text-red-400 bg-red-950/40 border border-red-800/40 rounded-lg flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Salir
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

