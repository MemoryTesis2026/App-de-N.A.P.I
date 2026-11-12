import React from 'react';
import {
  X, FileText, Sparkles, User, ShieldCheck,
  Bot, Lock, CheckCircle2, Tag, Layers
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export const ProjectDetailModal = ({ project, onClose }) => {
  const { openNapi } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!project) return null;

  return (
    <div className={`absolute inset-0 z-50 flex flex-col animate-in slide-in-from-bottom-6 duration-200 transition-colors ${
      isDark ? 'bg-[#0b1320] text-slate-100' : 'bg-[#f8fafc] text-[#0f2942]'
    }`}>

      {/* Header Institucional */}
      <div className={`px-4 pt-9 pb-4 text-white relative shrink-0 border-b ${
        isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-[#0f2942] border-[#163a5c]'
      }`}>
        <button 
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-1.5 text-slate-300 hover:text-white rounded-xl transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-wrap gap-1.5 mb-2">
          <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-white/10 text-white border border-white/20">
            {project.career}
          </span>
          <span className="px-2.5 py-0.5 text-[10px] font-bold text-white bg-blue-600 rounded-full">
            Año {project.year}
          </span>
          <span className="px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 bg-emerald-950/70 border border-emerald-700/50 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Ficha Oficial
          </span>
        </div>

        <h2 className="text-sm font-black text-white leading-snug">{project.title}</h2>
        <p className="text-[11px] text-slate-300 mt-2 flex items-center gap-1">
          <User className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span className="truncate">{Array.isArray(project.authors) ? project.authors.join(', ') : project.authors}</span>
        </p>
        <p className="text-[10px] text-blue-200 pl-4">Guía: {project.advisor || 'Prof. Sede Maipú'}</p>
      </div>

      {/* Contenido con scroll */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        {/* Banner NAPI */}
        <div className={`rounded-2xl p-3.5 border flex items-center justify-between gap-3 shadow-sm ${
          isDark ? 'bg-[#131f33] border-slate-800' : 'bg-[#0f2942] text-white border-[#163a5c]'
        }`}>
          <div>
            <p className="text-[10px] font-bold text-blue-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" /> Índice de Originalidad NAPI
            </p>
            <p className="text-sm font-black text-white mt-0.5">{project.originalityScore}% Original</p>
          </div>
          <button 
            onClick={() => { onClose(); openNapi(`Explícame la innovación de la tesis: "${project.title}"`); }}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 flex items-center gap-1 shrink-0 transition-colors shadow-sm"
          >
            <Bot className="w-3.5 h-3.5" /> Consultar NAPI
          </button>
        </div>

        {/* Resumen */}
        <div className={`rounded-2xl p-4 border transition-colors space-y-1.5 ${
          isDark ? 'bg-[#131f33] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h4 className="text-[10px] font-black uppercase tracking-wider flex items-center gap-1 text-blue-500">
            <FileText className="w-3.5 h-3.5" /> Resumen Ejecutivo
          </h4>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {project.summary}
          </p>
        </div>

        {/* Stack tecnológico */}
        <div className={`rounded-2xl p-4 border transition-colors space-y-1.5 ${
          isDark ? 'bg-[#131f33] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h4 className="text-[10px] font-black uppercase tracking-wider flex items-center gap-1 text-blue-500">
            <Tag className="w-3.5 h-3.5" /> Stack Tecnológico
          </h4>
          <div className="flex flex-wrap gap-1">
            {project.stack && project.stack.map(t => (
              <span 
                key={t} 
                className={`px-2 py-0.5 font-semibold text-[10px] rounded-md border ${
                  isDark ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-slate-100 text-[#0f2942] border-slate-200'
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Aviso protección */}
        <div className={`p-3.5 rounded-2xl border flex items-start gap-2 ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <Lock className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
          <div className="text-[11px] leading-relaxed text-slate-400">
            <strong className="text-slate-200">Lectura Segura:</strong> Proyecto validado e indexado en el repositorio oficial de INACAP Sede Maipú 2026.
          </div>
        </div>
      </div>

      {/* Botón cerrar */}
      <div className={`p-3 border-t shrink-0 ${
        isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <button 
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#0f2942] hover:bg-[#163a5c] text-white font-black text-xs tracking-wider uppercase transition-colors"
        >
          Cerrar Ficha
        </button>
      </div>
    </div>
  );
};
