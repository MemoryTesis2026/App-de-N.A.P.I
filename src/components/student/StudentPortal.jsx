import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { SearchAndFilter } from './SearchAndFilter';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailModal } from './ProjectDetailModal';
import { 
  BookOpen, 
  GraduationCap, 
  Sparkles, 
  Bot, 
  ShieldCheck, 
  Filter,
  FileQuestion,
  RotateCcw
} from 'lucide-react';

export const StudentPortal = () => {
  const { 
    user, 
    projects, 
    openNapi, 
    selectedProject, 
    openProjectDetail, 
    closeProjectDetail 
  } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCareer, setSelectedCareer] = useState('all');
  const [selectedYear, setSelectedYear] = useState('Todos');
  const [selectedTag, setSelectedTag] = useState('');

  // Filtrar sólo proyectos con estado 'Publicado' para estudiantes (los ocultos no aparecen)
  const publicProjects = projects.filter(p => p.status === 'Publicado');

  const filteredProjects = publicProjects.filter((project) => {
    // Filtro por término de búsqueda
    const matchesSearch = 
      !searchTerm ||
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.authors.some(a => a.toLowerCase().includes(searchTerm.toLowerCase())) ||
      project.stack.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    // Filtro por Carrera
    const matchesCareer = 
      selectedCareer === 'all' || 
      project.career.toLowerCase().includes(
        selectedCareer === 'inf' ? 'informática' :
        selectedCareer === 'ap' ? 'analista' :
        selectedCareer === 'ciber' ? 'ciberseguridad' :
        selectedCareer === 'auto' ? 'automatización' :
        selectedCareer === 'meca' ? 'mecánica' :
        selectedCareer === 'elec' ? 'electricidad' :
        selectedCareer === 'admin' ? 'administración' :
        selectedCareer === 'diseno' ? 'diseño' : selectedCareer
      );

    // Filtro por Año
    const matchesYear = selectedYear === 'Todos' || project.year === selectedYear;

    // Filtro por Tag
    const matchesTag = !selectedTag || project.stack.includes(selectedTag);

    return matchesSearch && matchesCareer && matchesYear && matchesTag;
  });

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCareer('all');
    setSelectedYear('Todos');
    setSelectedTag('');
  };

  return (
    <div className="min-h-screen bg-brand-bg pt-20 pb-20">
      
      {/* Header Corporativo en #1E293B */}
      <div className="bg-brand-primary text-white border-b border-slate-700 py-10 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-brand-cyan">
                <BookOpen className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Catálogo Institucional de Tesis
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 rounded-md">
                  INACAP Sede Maipú
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Repositorio de Proyectos de Título
              </h1>

              <p className="text-sm text-slate-300">
                Explora memorias técnicas, arquitecturas de software, investigaciones de automatización y prototipos de egresados de todas las carreras de nuestra sede.
              </p>
            </div>

            {/* Tarjeta de Asistente NAPI para Alumnos */}
            <div className="bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-brand-cyan/40 backdrop-blur-md space-y-3 shrink-0 max-w-xs shadow-glow-cyan">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-cyan text-brand-primary flex items-center justify-center font-bold">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">¿Tienes una idea de título?</p>
                  <p className="text-[10px] text-slate-400">Verifica similitud con NAPI</p>
                </div>
              </div>

              <button
                onClick={() => openNapi('Hola NAPI, quiero buscar tesis similares a mi idea para no duplicar')}
                className="w-full py-2 px-3 rounded-xl bg-brand-cyan hover:bg-cyan-400 text-brand-primary font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Analizar mi Tema con IA</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Contenedor Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Barra de Búsqueda y Filtros Avanzados */}
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCareer={selectedCareer}
          setSelectedCareer={setSelectedCareer}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          totalResults={filteredProjects.length}
          resetFilters={handleResetFilters}
        />

        {/* Grilla Responsiva de Tarjetas */}
        {filteredProjects.length === 0 ? (
          <div className="bg-brand-surface rounded-3xl p-12 border border-brand-border text-center space-y-4 max-w-lg mx-auto shadow-soft">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center mx-auto">
              <FileQuestion className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-brand-primary">
              No se encontraron proyectos
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              No hay tesis que coincidan con los criterios de búsqueda o filtros seleccionados en Sede Maipú.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablecer Filtros</span>
              </button>
              <button
                onClick={() => openNapi(`Recomiéndame ideas de tesis sobre: "${searchTerm || 'tecnología'}"`)}
                className="px-4 py-2 bg-brand-cyan hover:bg-cyan-400 text-brand-primary text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Pedir Ideas a NAPI</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenDetail={openProjectDetail}
              />
            ))}
          </div>
        )}

      </div>

      {/* Modal de Detalle de Proyecto */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={closeProjectDetail}
        />
      )}

    </div>
  );
};
