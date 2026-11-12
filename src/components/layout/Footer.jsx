import React from 'react';
import { Sparkles, MapPin, Mail, Phone, ShieldCheck, Heart, ExternalLink, Bot } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Footer = () => {
  const { openNapi, openAuthModal, setActiveView } = useAuth();

  return (
    <footer className="bg-brand-primary text-slate-400 border-t border-slate-700/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-700/60">
          
          {/* Columna Principal - Logo y Misión */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-cyan flex items-center justify-center text-white shadow-glow-cyan">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white">
                  N<span className="text-brand-cyan">API</span>
                </span>
                <span className="text-xs font-semibold text-slate-300">
                  INACAP Sede Maipú
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Plataforma institucional pionera para la preservación, consulta segura y análisis de similitud con inteligencia artificial preventiva de las tesis y proyectos de título de INACAP Sede Maipú.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs text-brand-cyan">
                <Bot className="w-4 h-4" />
                <span>Impulsado por IA NAPI 2.0</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Acceso Seguro</span>
              </div>
            </div>
          </div>

          {/* Columna 2 - Navegación */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => { setActiveView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-brand-cyan transition-colors"
                >
                  Inicio Institucional
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('student'); }}
                  className="hover:text-brand-cyan transition-colors"
                >
                  Catálogo de Tesis
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openAuthModal('teacher')}
                  className="hover:text-brand-cyan transition-colors"
                >
                  Carga de Proyectos (Docentes)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openNapi('¿Cómo funciona el análisis de similitud?')}
                  className="hover:text-brand-cyan transition-colors flex items-center gap-1"
                >
                  <span>Consultar a NAPI</span>
                  <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 3 - Carreras Sede Maipú */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Áreas Académicas
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Ingeniería en Informática</li>
              <li>Ciberseguridad & Redes</li>
              <li>Automatización & Robótica</li>
              <li>Mecánica & Autotrónica</li>
              <li>Electricidad & Energías</li>
              <li>Administración de Empresas</li>
            </ul>
          </div>

          {/* Columna 4 - Contacto Sede Maipú */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Sede Maipú
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300">Av. Américo Vespucio 974, Maipú, Región Metropolitana</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-cyan shrink-0" />
                <span className="text-xs text-slate-300">+56 2 2580 5000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-cyan shrink-0" />
                <span className="text-xs text-slate-300">titulacion.maipu@inacap.cl</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Barra de Derechos y Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center sm:text-left">
            © 2026 <strong className="text-slate-200">NAPI</strong> - Universidad Tecnológica de Chile INACAP Sede Maipú. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Reglamento de Titulación</span>
            <span>•</span>
            <span>Propiedad Intelectual</span>
            <span>•</span>
            <span className="text-brand-cyan font-medium">Sede Maipú 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

