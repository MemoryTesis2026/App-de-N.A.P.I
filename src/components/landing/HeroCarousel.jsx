import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Sparkles, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Bot, 
  ShieldCheck, 
  Award, 
  Cpu, 
  ArrowRight,
  Database
} from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    tag: 'INACAP Sede Maipú • Repositorio Institucional',
    title: 'El conocimiento y talento de Maipú, centralizado con Inteligencia Artificial',
    subtitle: 'Accede a cientos de proyectos de título, tesis de grado e innovaciones tecnológicas desarrolladas por egresados y docentes de todas las áreas académicas.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&auto=format&fit=crop&q=80',
    primaryCta: 'Explorar Catálogo',
    secondaryCta: 'Consultar NAPI',
    action: 'catalog',
    badgeText: '98% Tasa de Originalidad',
    icon: Database
  },
  {
    id: 2,
    tag: 'Asistente Preventivo NAPI 2.0',
    title: 'Evalúa la originalidad de tu anteproyecto antes de presentarlo',
    subtitle: 'NAPI analiza en segundos la similitud semántica de tu propuesta con el histórico de tesis de Sede Maipú, brindándote recomendaciones de diferenciación.',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=1600&auto=format&fit=crop&q=80',
    primaryCta: 'Probar Análisis con IA',
    secondaryCta: 'Ver Normas de Titulación',
    action: 'napi',
    badgeText: 'Semántica Vectorial en Tiempo Real',
    icon: Bot
  },
  {
    id: 3,
    tag: 'Innovación & Tecnología Aplicada',
    title: 'Laboratorios de vanguardia, robótica, TI y electromovilidad',
    subtitle: 'Desde gemelos digitales y ciberseguridad hasta prototipos IoT industriales: descubre el impacto real de las investigaciones aplicadas en el sector poniente.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&auto=format&fit=crop&q=80',
    primaryCta: 'Ver Proyectos Destacados',
    secondaryCta: 'Acceso Docente',
    action: 'catalog',
    badgeText: '14 Carreras Integradas',
    icon: Cpu
  }
];

export const HeroCarousel = () => {
  const { setActiveView, openNapi, openAuthModal } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const slide = SLIDES[currentSlide];
  const IconComponent = slide.icon;

  return (
    <div 
      className="relative w-full overflow-hidden bg-brand-primary min-h-[580px] lg:min-h-[640px] flex items-center pt-16"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Fondo con imagen y degradado corporativo superpuesto */}
      {SLIDES.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-[8000ms] ease-out transform"
          />
          {/* Overlay gradiente estricto #1E293B */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-primary/85 to-brand-primary/50" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-brand-primary/40 to-brand-primary/90" />
        </div>
      ))}

      {/* Contenido Principal */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 z-10 w-full">
        <div className="max-w-3xl space-y-6">
          
          {/* Badge superior */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-semibold text-brand-cyan backdrop-blur-md shadow-lg animate-in fade-in slide-in-from-bottom-2">
            <IconComponent className="w-4 h-4 text-brand-cyan animate-pulse" />
            <span>{slide.tag}</span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-slate-300 font-normal">{slide.badgeText}</span>
          </div>

          {/* Título Principal */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight sm:leading-tight">
            {slide.title}
          </h1>

          {/* Subtítulo */}
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
            {slide.subtitle}
          </p>

          {/* Botones de Acción */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                if (slide.action === 'napi') {
                  openNapi('Quiero evaluar mi título de tesis');
                } else {
                  setActiveView('student');
                }
              }}
              className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-brand-blue hover:bg-brand-blue-hover shadow-glow-blue transition-all flex items-center gap-2.5 transform hover:-translate-y-0.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>{slide.primaryCta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                if (slide.secondaryCta.includes('Docente')) {
                  openAuthModal('teacher');
                } else if (slide.secondaryCta.includes('Normas')) {
                  openNapi('¿Cuáles son las normas de titulación INACAP?');
                } else {
                  openNapi();
                }
              }}
              className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-200 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-600 hover:border-slate-500 transition-all flex items-center gap-2.5 backdrop-blur-md"
            >
              <Bot className="w-4 h-4 text-brand-cyan" />
              <span>{slide.secondaryCta}</span>
            </button>
          </div>

          {/* Métricas destacadas en banner */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-700/60 max-w-lg">
            <div>
              <p className="text-xl sm:text-2xl font-black text-brand-cyan">500+</p>
              <p className="text-xs text-slate-400 font-medium">Tesis Digitalizadas</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-white">14</p>
              <p className="text-xs text-slate-400 font-medium">Carreras Sede Maipú</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-emerald-400">100%</p>
              <p className="text-xs text-slate-400 font-medium">Originalidad Guiada</p>
            </div>
          </div>

        </div>
      </div>

      {/* Flechas de Navegación del Carrusel */}
      <button
        onClick={prevSlide}
        aria-label="Slide anterior"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-700/50 backdrop-blur-md transition-all hover:scale-110 hidden md:flex items-center justify-center"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Siguiente slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-700/50 backdrop-blur-md transition-all hover:scale-110 hidden md:flex items-center justify-center"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Indicadores de diapositivas (Dots) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Ir al slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full ${
              idx === currentSlide 
                ? 'w-8 h-2.5 bg-brand-cyan shadow-glow-cyan' 
                : 'w-2.5 h-2.5 bg-slate-600 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
