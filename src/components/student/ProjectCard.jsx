import React from 'react';
import { 
  FileText, 
  Sparkles, 
  Calendar, 
  User, 
  ShieldCheck, 
  Eye, 
  ArrowRight,
  Bot,
  Lock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ProjectCard = ({ project, onOpenDetail }) => {
  const { openNapi } = useAuth();

  return (
    <div className="bg-white rounded-xl p-4 border border-[#B3CFE5]/60 hover:border-[#4A7FA7] transition-colors flex flex-col justify-between group shadow-sm">
      
      {/* Parte Superior */}
      <div className="space-y-3">
        
        {/* Badges de Carrera y Año */}
        <div className="flex items-center justify-between gap-2">
          <span className="px-2.5 py-0.5 text-[10px] font-semibold bg-[#F6FAFD] text-[#1A3D63] rounded-md border border-[#B3CFE5] truncate max-w-[200px]">
            {project.career}
          </span>
          <span className="px-2 py-0.5 text-[10px] font-semibold text-[#1A3D63] bg-[#F6FAFD] border border-[#B3CFE5]/40 rounded-md shrink-0">
            {project.year}
          </span>
        </div>

        {/* Título del Proyecto */}
        <h3 
          onClick={() => onOpenDetail(project)}
          className="text-sm font-bold text-[#0A1931] group-hover:text-[#4A7FA7] cursor-pointer transition-colors line-clamp-2 leading-snug"
        >
          {project.title}
        </h3>

        {/* Autores y Profesor Guía */}
        <div className="text-xs text-gray-500 space-y-1">
          <p className="flex items-center gap-1.5 font-medium text-[#1A3D63]">
            <User className="w-3.5 h-3.5 text-[#4A7FA7] shrink-0" />
            <span className="truncate">{project.authors.join(', ')}</span>
          </p>
          <p className="text-[11px] text-gray-400 pl-5">
            Guía: {project.advisor}
          </p>
        </div>

        {/* Resumen Corto */}
        <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
          {project.summary}
        </p>

        {/* Tags de Tecnologías */}
        <div className="flex flex-wrap gap-1 pt-0.5">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#F6FAFD] text-[#1A3D63] border border-[#B3CFE5]/50"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 text-gray-400">
              +{project.stack.length - 4}
            </span>
          )}
        </div>

      </div>

      {/* Parte Inferior: Píldora de originalidad y Botón de Ficha */}
      <div className="mt-4 pt-3 border-t border-gray-100 space-y-2.5">
        
        {/* Originalidad NAPI & Vistas */}
        <div className="flex items-center justify-between text-xs">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-[#B3CFE5] bg-[#F6FAFD] text-[10px] font-semibold text-[#0A1931]">
            <Sparkles className="w-3 h-3 text-[#4A7FA7]" />
            <span>{project.originalityScore}% Original</span>
          </div>

          <span className="text-[11px] text-gray-400 flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-[#4A7FA7]" />
            {project.views} lecturas
          </span>
        </div>

        {/* Botón de Ficha Completa */}
        <button
          type="button"
          onClick={() => onOpenDetail(project)}
          className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-white bg-[#1A3D63] hover:bg-[#0A1931] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Ver Ficha Completa</span>
          <ArrowRight className="w-3 h-3 opacity-80" />
        </button>

      </div>

    </div>
  );
};
