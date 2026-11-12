import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Search, 
  Eye, 
  EyeOff, 
  Trash2, 
  Sparkles, 
  Bot, 
  FileText, 
  Filter, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const ProjectTable = ({ onOpenDetail }) => {
  const { 
    projects, 
    toggleProjectStatus, 
    deleteProject, 
    openNapi 
  } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');

  const filteredProjects = projects.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.career.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.authors.some(a => a.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'Todos' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-brand-surface rounded-3xl p-6 sm:p-8 border border-brand-border shadow-soft space-y-6">
      
      {/* Barra Superior de Control de la Tabla */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-brand-primary">
            Gestor de Proyectos de Título
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Administra la visibilidad, revisa el índice de originalidad y gestiona las tesis cargadas.
          </p>
        </div>

        {/* Buscador interno */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por título, autor..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-brand-blue focus:bg-white transition-colors"
            />
          </div>

          {/* Filtros de Estado */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs self-stretch sm:self-auto justify-between">
            {['Todos', 'Publicado', 'En Revisión', 'Oculto'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  statusFilter === status
                    ? 'bg-white text-brand-primary shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabla Responsiva */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600 border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider">
              <th className="py-3.5 px-4 rounded-l-xl">Título de la Tesis & Autores</th>
              <th className="py-3.5 px-4">Carrera & Año</th>
              <th className="py-3.5 px-4">Originalidad IA (NAPI)</th>
              <th className="py-3.5 px-4">Estado</th>
              <th className="py-3.5 px-4 text-right rounded-r-xl">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-normal">
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-400">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  <p className="text-sm font-semibold">No se encontraron proyectos con los filtros seleccionados.</p>
                </td>
              </tr>
            ) : (
              filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50/60 transition-colors group">
                  
                  {/* Columna Título y Autores */}
                  <td className="py-4 px-4 max-w-xs sm:max-w-sm">
                    <div className="space-y-1">
                      <p 
                        onClick={() => onOpenDetail(project)}
                        className="font-bold text-brand-primary hover:text-brand-blue cursor-pointer line-clamp-2 transition-colors text-sm"
                      >
                        {project.title}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {project.authors.join(', ')} • <span className="text-slate-500 font-medium">Guía: {project.advisor}</span>
                      </p>
                    </div>
                  </td>

                  {/* Columna Carrera y Año */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div>
                      <p className="font-semibold text-slate-700">{project.career}</p>
                      <span className="inline-block mt-0.5 px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-600 rounded">
                        Año {project.year}
                      </span>
                    </div>
                  </td>

                  {/* Columna Originalidad NAPI */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full"
                          style={{
                            width: `${project.originalityScore}%`,
                            backgroundColor: project.originalityScore >= 85 ? '#10B981' : project.originalityScore >= 60 ? '#F59E0B' : '#EF4444'
                          }}
                        />
                      </div>
                      <span className="font-bold text-slate-700">
                        {project.originalityScore}%
                      </span>
                    </div>
                  </td>

                  {/* Columna Estado */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    {project.status === 'Publicado' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle className="w-3 h-3" /> Publicado
                      </span>
                    )}
                    {project.status === 'En Revisión' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        <Clock className="w-3 h-3" /> En Revisión
                      </span>
                    )}
                    {project.status === 'Oculto' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                        <EyeOff className="w-3 h-3" /> Oculto
                      </span>
                    )}
                  </td>

                  {/* Acciones */}
                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      
                      {/* Botón Ver Ficha */}
                      <button
                        type="button"
                        onClick={() => onOpenDetail(project)}
                        title="Ver Ficha Segura"
                        className="p-1.5 text-slate-500 hover:text-brand-blue hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Botón Test NAPI */}
                      <button
                        type="button"
                        onClick={() => openNapi(`Analiza a fondo la originalidad y temática de esta tesis registrada: "${project.title}"`)}
                        title="Evaluar con NAPI"
                        className="p-1.5 text-slate-500 hover:text-brand-cyan hover:bg-cyan-50 rounded-lg transition-colors"
                      >
                        <Bot className="w-4 h-4" />
                      </button>

                      {/* Botón Cambiar Visibilidad */}
                      <button
                        type="button"
                        onClick={() => toggleProjectStatus(project.id)}
                        title={project.status === 'Publicado' ? 'Ocultar del catálogo' : 'Publicar en catálogo'}
                        className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        {project.status === 'Publicado' ? <EyeOff className="w-4 h-4 text-amber-500" /> : <Eye className="w-4 h-4 text-emerald-600" />}
                      </button>

                      {/* Botón Eliminar */}
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`¿Estás seguro de eliminar el registro de la tesis "${project.title}"?`)) {
                            deleteProject(project.id);
                          }
                        }}
                        title="Eliminar registro"
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
        <span>Mostrando {filteredProjects.length} de {projects.length} proyectos registrados</span>
        <span>Base de Datos Sede Maipú</span>
      </div>

    </div>
  );
};
