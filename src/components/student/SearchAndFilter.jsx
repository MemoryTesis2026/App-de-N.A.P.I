import React from 'react';
import { Search, Filter, X, Tag, Calendar, School, RotateCcw } from 'lucide-react';
import { CAREERS, YEARS, POPULAR_TAGS } from '../../data/careers';

export const SearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  selectedCareer,
  setSelectedCareer,
  selectedYear,
  setSelectedYear,
  selectedTag,
  setSelectedTag,
  totalResults,
  resetFilters
}) => {
  const hasActiveFilters = searchTerm || selectedCareer !== 'all' || selectedYear !== 'Todos' || selectedTag;

  return (
    <div className="bg-brand-surface rounded-3xl p-6 border border-brand-border shadow-soft space-y-5">
      
      {/* Fila Principal: Buscador y Selectores */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Barra de Búsqueda en tiempo real */}
        <div className="md:col-span-6 relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por título de tesis, autor, palabras clave..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filtro por Carrera */}
        <div className="md:col-span-3">
          <div className="relative">
            <School className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedCareer}
              onChange={(e) => setSelectedCareer(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-brand-blue focus:bg-white transition-colors cursor-pointer"
            >
              {CAREERS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filtro por Año */}
        <div className="md:col-span-3">
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-brand-blue focus:bg-white transition-colors cursor-pointer"
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y === 'Todos' ? 'Todos los Años' : `Año ${y}`}
                </option>
              ))}
            </select>
          </div>
        </div>

      </div>

      {/* Chips de Tecnologías Populares */}
      <div className="space-y-2 pt-1 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-brand-cyan" />
            Filtrar por Tecnología o Área:
          </span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-brand-blue hover:underline font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Limpiar filtros
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {POPULAR_TAGS.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(isSelected ? '' : tag)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contador de Resultados Activos */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <span>
          Mostrando <strong className="text-slate-800">{totalResults}</strong> proyectos encontrados
        </span>
        <span className="text-[11px] text-slate-400">
          Visualización protegida • Sede Maipú
        </span>
      </div>

    </div>
  );
};
