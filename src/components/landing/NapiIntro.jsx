import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Cpu, 
  ShieldAlert, 
  ShieldCheck, 
  Send, 
  Lightbulb, 
  CheckCircle2, 
  ArrowRight,
  Code2,
  BrainCircuit,
  Sliders
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { analyzeThesisSimilarity } from '../../data/napiKnowledge';

export const NapiIntro = () => {
  const { openNapi, projects } = useAuth();

  // Mini probador interactivo de título
  const [testTitle, setTestTitle] = useState('Sistema de visión artificial para control de calidad en líneas de ensamblaje');
  const [testResult, setTestResult] = useState(() => 
    analyzeThesisSimilarity('Sistema de visión artificial para control de calidad en líneas de ensamblaje', '', '', projects)
  );
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleTest = (e) => {
    e.preventDefault();
    if (!testTitle.trim()) return;
    setIsEvaluating(true);
    setTimeout(() => {
      const res = analyzeThesisSimilarity(testTitle, '', '', projects);
      setTestResult(res);
      setIsEvaluating(false);
    }, 600);
  };

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden border-y border-slate-800" id="conoce-napi">
      
      {/* Luces y Efectos de Fondo Cían Eléctrico */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-cyan/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Encabezado NAPI */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-cyan/15 border border-brand-cyan/40 text-brand-cyan text-xs font-bold uppercase tracking-wider shadow-glow-cyan">
            <Bot className="w-4 h-4 text-brand-cyan" />
            <span>Inteligencia Artificial Preventiva</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            ¿Quién es <span className="text-brand-cyan">N.A.P.I.</span> y cómo fue creado?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            <strong>N.A.P.I.</strong> (<em>Navegador de Archivos de Proyectos Institucionales</em>) es el primer agente de IA desarrollado específicamente por y para la comunidad académica de <strong>INACAP Sede Maipú</strong>.
          </p>
        </div>

        {/* Grilla: Historia y Arquitectura de NAPI */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          {/* Tarjeta de Identidad y Creación */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="bg-slate-800/80 rounded-2xl p-6 sm:p-8 border border-slate-700 backdrop-blur-md space-y-4 shadow-xl">
              <div className="flex items-center gap-3 text-brand-cyan">
                <BrainCircuit className="w-6 h-6" />
                <h3 className="text-xl font-bold text-white">El Origen Tecnológico de NAPI</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                NAPI nació como un proyecto de titulación en el Área de Tecnologías de la Información de Sede Maipú. Los estudiantes diseñaron una arquitectura de <strong>Embeddings Vectoriales</strong> combinada con análisis de distancias semánticas (Cosine Distance) para procesar el lenguaje natural de las memorias de título históricas.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/60 space-y-1">
                  <div className="flex items-center gap-2 text-brand-cyan text-xs font-bold">
                    <Code2 className="w-4 h-4" />
                    <span>Algoritmo Semántico</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    No busca solo palabras exactas; comprende el contexto, algoritmos y tecnologías descritas.
                  </p>
                </div>

                <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-700/60 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Enfoque Preventivo</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Guía y sugiere cambios antes de la entrega formal, protegiendo al alumno de rechazos en comisión.
                  </p>
                </div>
              </div>
            </div>

            {/* Capacidades Clave */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                ¿Qué hace NAPI por los estudiantes y docentes?
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                  <span>Calcula el porcentaje de similitud semántica con tesis previas de Sede Maipú.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                  <span>Genera sugerencias personalizadas para diferenciar y elevar el nivel tecnológico de la propuesta.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                  <span>Responde consultas sobre el formato del Anteproyecto y la reglamentación INACAP.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Probador en Vivo de Similitud */}
          <div className="lg:col-span-6">
            <div className="bg-gradient-to-b from-slate-800 to-slate-850 rounded-3xl p-6 sm:p-8 border-2 border-brand-cyan/40 shadow-glow-cyan relative">
              
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-700">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-cyan/20 border border-brand-cyan text-brand-cyan flex items-center justify-center font-bold">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Simulador en Vivo de NAPI</h4>
                    <p className="text-[11px] text-slate-400">Prueba cómo evalúa una idea de tesis</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-full bg-brand-cyan text-brand-primary">
                  Motor Activo
                </span>
              </div>

              {/* Formulario de prueba */}
              <form onSubmit={handleTest} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Título o Propuesta a Evaluar:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={testTitle}
                      onChange={(e) => setTestTitle(e.target.value)}
                      placeholder="Ej: Sistema IoT para monitoreo de cultivos..."
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-colors pr-10"
                    />
                    <button
                      type="submit"
                      disabled={isEvaluating}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-brand-cyan hover:bg-slate-800 rounded-lg transition-colors"
                      title="Analizar con NAPI"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <p className="text-[11px] text-slate-400">
                    💡 Compara en tiempo real contra los proyectos cargados en Sede Maipú.
                  </p>
                  <button
                    type="submit"
                    disabled={isEvaluating}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-brand-blue hover:bg-brand-blue-hover rounded-lg transition-all flex items-center gap-1.5 shrink-0"
                  >
                    {isEvaluating ? 'Analizando...' : 'Calcular'}
                  </button>
                </div>
              </form>

              {/* Resultado del análisis en vivo */}
              {testResult && (
                <div className="mt-5 p-4 rounded-xl bg-slate-900/90 border border-slate-700 space-y-3 animate-in fade-in">
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300">Diagnóstico de Originalidad:</span>
                    <span 
                      className="text-xs font-black px-2.5 py-0.5 rounded-full"
                      style={{ 
                        backgroundColor: `${testResult.badgeColor}20`, 
                        color: testResult.badgeColor,
                        border: `1px solid ${testResult.badgeColor}40`
                      }}
                    >
                      {testResult.originalityScore}% Original ({testResult.similarityScore}% Similitud)
                    </span>
                  </div>

                  {/* Barra de progreso de originalidad */}
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all duration-700 rounded-full"
                      style={{ 
                        width: `${testResult.originalityScore}%`,
                        backgroundColor: testResult.badgeColor 
                      }}
                    />
                  </div>

                  <p className="text-xs text-slate-300 font-medium">
                    {testResult.level}
                  </p>

                  {/* Consejos breves de NAPI */}
                  <div className="space-y-1.5 pt-1 border-t border-slate-800">
                    <p className="text-[11px] font-bold text-brand-cyan flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Recomendación de NAPI:
                    </p>
                    <p className="text-xs text-slate-400 leading-snug">
                      {testResult.tips[0]}
                    </p>
                  </div>

                </div>
              )}

              {/* Botón para abrir el Chat Completo de NAPI */}
              <button
                onClick={() => openNapi(`Hola NAPI, quiero evaluar a fondo esta propuesta: "${testTitle}"`)}
                className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-brand-cyan to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-brand-primary font-black text-sm shadow-glow-cyan transition-all flex items-center justify-center gap-2 transform hover:scale-[1.02]"
              >
                <Bot className="w-4 h-4" />
                <span>Abrir Asistente Completo NAPI</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
