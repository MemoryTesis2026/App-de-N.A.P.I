import React from 'react';
import { 
  ShieldCheck, 
  Search, 
  Sparkles, 
  Lightbulb, 
  CheckCircle2, 
  FileText, 
  TrendingUp, 
  Layers, 
  Users, 
  School,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AboutSection = () => {
  const { setActiveView, openNapi } = useAuth();

  return (
    <section className="py-20 bg-brand-bg relative overflow-hidden" id="sobre-nosotros">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de Sección: Sobre Nosotros */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold uppercase tracking-wider">
            <School className="w-3.5 h-3.5" />
            <span>INACAP Sede Maipú</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight">
            Preservando el patrimonio académico y la innovación tecnológica de nuestra sede
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            <strong>NAPI</strong> nace como la plataforma oficial para recopilar, salvaguardar y poner en valor cada proyecto de titulación desarrollado en las aulas, talleres y laboratorios de INACAP Maipú.
          </p>
        </div>

        {/* 3 Pilares Fundamentales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          {/* Pilar 1 */}
          <div className="bg-brand-surface rounded-2xl p-8 border border-brand-border shadow-soft hover:shadow-card-hover transition-all duration-300 group">
            <div className="w-14 h-14 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FileText className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-brand-primary mb-3">
              Repositorio Centralizado
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Consolida en un único entorno digital seguro los documentos técnicos, memorias, metodologías y stacks de todas las carreras de la sede.
            </p>
            <ul className="space-y-2 text-xs text-slate-500">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-blue" />
                <span>Indexación estandarizada por carrera y año</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-blue" />
                <span>Acceso controlado y de sólo lectura</span>
              </li>
            </ul>
          </div>

          {/* Pilar 2 */}
          <div className="bg-brand-surface rounded-2xl p-8 border border-brand-border shadow-soft hover:shadow-card-hover transition-all duration-300 group">
            <div className="w-14 h-14 rounded-xl bg-cyan-50 text-brand-cyan flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-brand-primary mb-3">
              Prevención Inteligente (NAPI)
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Integra el asistente preventivo NAPI para calcular la similitud semántica de anteproyectos antes de su defensa, evitando duplicidades de temática.
            </p>
            <ul className="space-y-2 text-xs text-slate-500">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan" />
                <span>Análisis semántico en segundos</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan" />
                <span>Consejos de diferenciación tecnológica</span>
              </li>
            </ul>
          </div>

          {/* Pilar 3 */}
          <div className="bg-brand-surface rounded-2xl p-8 border border-brand-border shadow-soft hover:shadow-card-hover transition-all duration-300 group">
            <div className="w-14 h-14 rounded-xl bg-slate-100 text-brand-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-brand-primary mb-3">
              Protección Intelectual
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Garantiza el reconocimiento de los derechos de autor de alumnos y docentes guía, protegiendo las investigaciones frente a descargas no autorizadas.
            </p>
            <ul className="space-y-2 text-xs text-slate-500">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Visualización segura de resúmenes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Firma institucional INACAP 2026</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Sección: ¿Cómo surgió la idea? */}
        <div id="como-surgio" className="bg-gradient-to-br from-brand-primary to-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl border border-slate-700">
          
          {/* Formas decorativas de fondo */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-1/3 -top-20 w-60 h-60 bg-brand-cyan/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Génesis del Proyecto</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                ¿Cómo surgió la idea de NAPI en Sede Maipú?
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Durante años, cada semestre decenas de estudiantes de diversas carreras de Sede Maipú se enfrentaban a una misma encrucijada: <em>"¿Habrá alguien desarrollado ya este mismo tema de título el año pasado?"</em>.
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Los docentes revisores invertían cientos de horas verificando propuestas en carpetas aisladas para detectar solapamientos temáticos. Así nació la visión de <strong>NAPI</strong>: un repositorio digital vivo que une el almacenamiento seguro y un motor de inteligencia artificial preventiva (NAPI) para transformar la experiencia de titulación en un proceso guiado, transparente y de excelencia.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => setActiveView('student')}
                  className="px-5 py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white text-sm font-bold shadow-glow-blue transition-all flex items-center gap-2"
                >
                  <span>Explorar Proyectos en el Catálogo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => openNapi('¿Cómo NAPI ayuda a que mi tesis sea innovadora?')}
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-brand-cyan border border-slate-600 text-sm font-bold transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Ver Demo de Similitud</span>
                </button>
              </div>
            </div>

            {/* Tarjeta Visual Destacada en la Historia */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/90 rounded-2xl p-6 sm:p-8 border border-slate-700 backdrop-blur-md space-y-5 shadow-xl">
                
                <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                  <div>
                    <p className="text-xs font-bold text-brand-cyan uppercase tracking-wider">Impacto Académico</p>
                    <p className="text-lg font-bold text-white">Sede Maipú en Cifras</p>
                  </div>
                  <div className="p-2 bg-brand-cyan/20 rounded-xl text-brand-cyan">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">0% Tesis Duplicadas</p>
                      <p className="text-xs text-slate-400">Detección preventiva en fase de anteproyecto.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">-75% Tiempo de Revisión Docente</p>
                      <p className="text-xs text-slate-400">Validación instantánea de similitud semántica.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">100% Estandarizado INACAP</p>
                      <p className="text-xs text-slate-400">Metodología y normas institucionales 2026.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

