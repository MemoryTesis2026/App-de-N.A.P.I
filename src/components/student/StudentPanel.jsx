import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { ThemeToggleCircle } from '../common/ThemeToggleCircle';
import { CAREERS, YEARS, POPULAR_TAGS } from '../../data/careers';
import { ProjectDetailModal } from './ProjectDetailModal';
import napiLogo from '../../assets/napi-logo.png';
import {
  Search, 
  SlidersHorizontal, 
  X, 
  Tag, 
  Bot,
  Sparkles, 
  FileText, 
  Eye, 
  GraduationCap,
  ChevronDown, 
  ChevronUp, 
  LogOut
} from 'lucide-react';

/* ─── AppBar del estudiante con Circulito Blanco/Negro ─── */
const StudentAppBar = ({ user, onLogout }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`sticky top-0 z-30 flex items-center justify-between px-4 py-2.5 border-b transition-colors ${
      isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-[#0f2942] border-[#163a5c]'
    }`}>
      <div className="flex items-center gap-2.5">
        <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm shrink-0">
          <img src={napiLogo} alt="NAPI" className="w-7 h-5 object-contain" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black text-white tracking-wide">N.A.P.I</span>
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-600 text-white">
              Estudiante
            </span>
          </div>
          <p className="text-[10px] text-blue-200 truncate max-w-[150px] font-medium">
            {user.name || 'Estudiante INACAP'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {/* Circulito Blanco / Negro en la parte del alumno a la vista sin molestar */}
        <ThemeToggleCircle size="sm" />

        <button 
          type="button"
          onClick={onLogout} 
          title="Cerrar sesión" 
          className="p-1.5 text-slate-300 hover:text-white rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/* ─── Tarjeta de Proyecto ─── */
const ProjectCard = ({ project, onOpen, openNapi, isDark }) => {
  return (
    <div className={`rounded-2xl p-4 border transition-colors space-y-2.5 ${
      isDark 
        ? 'bg-[#131f33] border-slate-800 hover:border-slate-700' 
        : 'bg-white border-slate-200 hover:border-[#0f2942] shadow-sm'
    }`}>
      {/* Badges superiores */}
      <div className="flex items-center justify-between gap-2">
        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border truncate max-w-[190px] ${
          isDark 
            ? 'bg-slate-800 text-blue-300 border-slate-700' 
            : 'bg-slate-100 text-[#0f2942] border-slate-200'
        }`}>
          {project.career}
        </span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
          isDark 
            ? 'bg-slate-800 text-slate-300 border-slate-700' 
            : 'bg-slate-50 text-slate-600 border-slate-200'
        }`}>
          {project.year}
        </span>
      </div>

      {/* Título */}
      <h3 
        onClick={() => onOpen(project)}
        className="text-xs font-black leading-snug line-clamp-2 cursor-pointer hover:text-blue-500 transition-colors"
      >
        {project.title}
      </h3>

      {/* Autores */}
      <p className="text-[11px] text-slate-400 flex items-center gap-1">
        <GraduationCap className="w-3.5 h-3.5 text-blue-500 shrink-0" />
        <span className="truncate">{Array.isArray(project.authors) ? project.authors.join(', ') : project.authors}</span>
      </p>

      {/* Resumen corto */}
      <p className={`text-[11px] line-clamp-2 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
        {project.summary}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1">
        {project.stack && project.stack.slice(0, 4).map(t => (
          <span 
            key={t} 
            className={`text-[9px] font-semibold px-2 py-0.5 rounded-md border ${
              isDark 
                ? 'bg-slate-800 text-slate-300 border-slate-700' 
                : 'bg-slate-100 text-[#0f2942] border-slate-200'
            }`}
          >
            {t}
          </span>
        ))}
        {project.stack && project.stack.length > 4 && (
          <span className="text-[9px] text-slate-400 self-center">+{project.stack.length - 4}</span>
        )}
      </div>

      {/* Footer: píldora de originalidad + acciones compactas */}
      <div className={`flex items-center gap-2 pt-2 border-t ${
        isDark ? 'border-slate-800' : 'border-slate-100'
      }`}>
        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
          isDark 
            ? 'bg-slate-800 text-slate-200 border-slate-700' 
            : 'bg-slate-100 text-[#0f2942] border-slate-200'
        }`}>
          <Sparkles className="w-3 h-3 text-blue-500" />
          {project.originalityScore}% Original
        </span>

        <span className="text-[10px] text-slate-400 flex items-center gap-1 ml-auto">
          <Eye className="w-3 h-3 text-blue-500" />
          {project.views || 0}
        </span>

        <button 
          type="button"
          onClick={() => onOpen(project)}
          className="px-2.5 py-1 bg-[#0f2942] hover:bg-[#163a5c] text-white text-[10px] font-bold rounded-lg flex items-center gap-1 transition-colors shadow-sm"
        >
          <FileText className="w-3 h-3" /> 
          Ver Ficha
        </button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════
   COMPONENTE PRINCIPAL: StudentPanel
══════════════════════════════════════════ */
export const StudentPanel = () => {
  const {
    user, logout, projects, openNapi,
    selectedProject, openProjectDetail, closeProjectDetail
  } = useAuth();

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [search, setSearch]           = useState('');
  const [career, setCareer]           = useState('all');
  const [year, setYear]               = useState('Todos');
  const [tag, setTag]                 = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const publicProjects = projects.filter(p => p.status === 'Publicado');

  const filtered = useMemo(() => publicProjects.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) ||
      (Array.isArray(p.authors) ? p.authors.some(a => a.toLowerCase().includes(q)) : false) ||
      (Array.isArray(p.stack) ? p.stack.some(t => t.toLowerCase().includes(q)) : false);
    const matchCareer = career === 'all' || (p.career && p.career.toLowerCase().includes(
      career === 'inf' ? 'informática' : career === 'ciber' ? 'ciberseguridad' :
      career === 'auto' ? 'automatización' : career === 'elec' ? 'electricidad' :
      career === 'admin' ? 'administración' : career === 'meca' ? 'mecánica' :
      career === 'ap' ? 'analista' : career === 'diseno' ? 'diseño' : career.toLowerCase()
    ));
    const matchYear = year === 'Todos' || p.year === year;
    const matchTag = !tag || (Array.isArray(p.stack) && p.stack.includes(tag));
    return matchSearch && matchCareer && matchYear && matchTag;
  }), [search, career, year, tag, publicProjects]);

  const hasFilters = search || career !== 'all' || year !== 'Todos' || tag;

  return (
    <div className={`flex flex-col flex-1 min-h-screen transition-colors duration-200 ${
      isDark ? 'bg-[#0b1320] text-slate-100' : 'bg-[#f8fafc] text-[#0f2942]'
    }`}>
      <StudentAppBar user={user} onLogout={logout} />

      {/* Barra de Búsqueda y Filtros */}
      <div className={`px-4 py-2.5 space-y-2 sticky top-[48px] z-20 border-b shadow-sm transition-colors ${
        isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            value={search} 
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar tesis, autores, tecnologías..."
            className={`w-full pl-9 pr-8 py-2 rounded-xl text-xs border outline-none transition-colors ${
              isDark 
                ? 'bg-[#131f33] border-slate-700 text-white placeholder-slate-500 focus:border-blue-400' 
                : 'bg-slate-50 border-slate-200 text-[#0f2942] placeholder-slate-400 focus:border-[#0f2942] focus:bg-white'
            }`}
          />
          {search && (
            <button 
              type="button"
              onClick={() => setSearch('')} 
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button 
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              hasFilters 
                ? 'bg-[#0f2942] text-white shadow-sm' 
                : isDark 
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' 
                  : 'bg-slate-100 text-[#0f2942] hover:bg-slate-200'
            }`}
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>Filtros {hasFilters ? '(activos)' : ''}</span>
            {showFilters ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          <span className="text-[11px] font-bold text-slate-400">
            {filtered.length} proyectos
          </span>
        </div>

        {/* Panel Desplegable de Filtros */}
        {showFilters && (
          <div className={`space-y-2.5 pt-2 border-t ${
            isDark ? 'border-slate-800' : 'border-slate-100'
          }`}>
            <div className="grid grid-cols-2 gap-2">
              <select 
                value={career} 
                onChange={e => setCareer(e.target.value)}
                className={`px-2.5 py-1.5 rounded-lg text-xs border outline-none ${
                  isDark 
                    ? 'bg-[#131f33] border-slate-700 text-white' 
                    : 'bg-slate-50 border-slate-200 text-[#0f2942]'
                }`}
              >
                {CAREERS.map(c => <option key={c.id} value={c.id} className={isDark ? 'bg-[#0f172a]' : 'bg-white'}>{c.name}</option>)}
              </select>
              <select 
                value={year} 
                onChange={e => setYear(e.target.value)}
                className={`px-2.5 py-1.5 rounded-lg text-xs border outline-none ${
                  isDark 
                    ? 'bg-[#131f33] border-slate-700 text-white' 
                    : 'bg-slate-50 border-slate-200 text-[#0f2942]'
                }`}
              >
                {YEARS.map(y => <option key={y} value={y} className={isDark ? 'bg-[#0f172a]' : 'bg-white'}>{y === 'Todos' ? 'Todos los Años' : `Año ${y}`}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-wider flex items-center gap-1 text-slate-400">
                <Tag className="w-3 h-3 text-blue-500" /> Tecnologías:
              </p>
              <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                {POPULAR_TAGS.map(t => (
                  <button 
                    key={t} 
                    type="button"
                    onClick={() => setTag(tag === t ? '' : t)}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                      tag === t 
                        ? 'bg-[#0f2942] text-white' 
                        : isDark 
                          ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' 
                          : 'bg-slate-100 text-[#0f2942] hover:bg-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {hasFilters && (
              <button 
                type="button"
                onClick={() => { setSearch(''); setCareer('all'); setYear('Todos'); setTag(''); }}
                className={`w-full py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                  isDark 
                    ? 'border-slate-700 text-slate-400 hover:bg-slate-800' 
                    : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Limpiar todos los filtros
              </button>
            )}
          </div>
        )}
      </div>

      {/* Lista de Proyectos */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-12">
        {filtered.length === 0 ? (
          <div className={`flex flex-col items-center text-center py-10 space-y-3 rounded-2xl border p-5 ${
            isDark ? 'bg-[#131f33] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto border ${
              isDark ? 'bg-slate-800 text-blue-400 border-slate-700' : 'bg-slate-100 text-[#0f2942] border-slate-200'
            }`}>
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="font-black text-xs">Sin resultados de búsqueda</p>
              <p className="text-[11px] text-slate-400 mt-0.5">No hay tesis que coincidan con los filtros aplicados.</p>
            </div>
            <button 
              type="button"
              onClick={() => openNapi(`Dame ideas de tesis sobre: "${search}"`)}
              className="px-4 py-2 bg-[#0f2942] hover:bg-[#163a5c] text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <Bot className="w-3.5 h-3.5" /> Pedir ideas a NAPI
            </button>
          </div>
        ) : (
          <>
            {/* Banner Institucional NAPI */}
            <div 
              onClick={() => openNapi('Hola NAPI, quiero consultar propuestas de tesis para Sede Maipú')}
              className={`rounded-2xl p-3.5 border flex items-center gap-3 cursor-pointer transition-all shadow-sm active:scale-[0.99] ${
                isDark 
                  ? 'bg-gradient-to-r from-[#0a192f] to-[#131f33] border-slate-700 hover:border-blue-400' 
                  : 'bg-gradient-to-r from-[#0f2942] to-[#163a5c] text-white border-[#163a5c] hover:shadow-md'
              }`}
            >
              <div className="w-10 h-8 rounded-xl bg-white p-0.5 flex items-center justify-center shrink-0 border border-slate-200 shadow-sm">
                <img src={napiLogo} alt="NAPI" className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black text-white">¿Tienes una idea de tesis?</p>
                <p className="text-[10px] text-blue-200 truncate font-medium">Analiza similitud institucional con NAPI →</p>
              </div>
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            </div>

            {filtered.map(p => (
              <ProjectCard 
                key={p.id} 
                project={p} 
                onOpen={openProjectDetail} 
                openNapi={openNapi} 
                isDark={isDark}
              />
            ))}
          </>
        )}
      </div>

      {selectedProject && (
        <ProjectDetailModal project={selectedProject} onClose={closeProjectDetail} />
      )}
    </div>
  );
};
