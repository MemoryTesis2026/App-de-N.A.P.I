import React from 'react';
import { 
  FileCheck2, 
  School, 
  Sparkles, 
  TrendingUp, 
  Eye, 
  ShieldCheck,
  Award
} from 'lucide-react';

export const KpiMetrics = ({ projects }) => {
  const total = projects.length;
  const published = projects.filter(p => p.status === 'Publicado').length;
  const inReview = projects.filter(p => p.status === 'En Revisión').length;
  const hidden = projects.filter(p => p.status === 'Oculto').length;
  
  const careersSet = new Set(projects.map(p => p.career));
  const totalCareers = careersSet.size;

  const totalViews = projects.reduce((acc, p) => acc + (p.views || 0), 0);
  const avgOriginality = Math.round(
    projects.reduce((acc, p) => acc + (p.originalityScore || 90), 0) / (total || 1)
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      
      {/* KPI 1: Total Proyectos */}
      <div className="bg-brand-surface rounded-2xl p-5 border border-brand-border shadow-soft flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Total Proyectos Indexados
          </span>
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center">
            <FileCheck2 className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-brand-primary">{total}</span>
            <span className="text-xs font-semibold text-emerald-600">({published} activos)</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {inReview} en revisión • {hidden} ocultos
          </p>
        </div>
      </div>

      {/* KPI 2: Carreras Sede Maipú */}
      <div className="bg-brand-surface rounded-2xl p-5 border border-brand-border shadow-soft flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Carreras Participantes
          </span>
          <div className="w-9 h-9 rounded-xl bg-cyan-50 text-brand-cyan flex items-center justify-center">
            <School className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-brand-primary">{totalCareers}</span>
            <span className="text-xs font-semibold text-slate-500">de 14 especialidades</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Cobertura activa en Sede Maipú
          </p>
        </div>
      </div>

      {/* KPI 3: Promedio de Originalidad NAPI */}
      <div className="bg-brand-surface rounded-2xl p-5 border border-brand-border shadow-soft flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Índice de Originalidad IA
          </span>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-600">{avgOriginality}%</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
              Óptimo
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Validado por NAPI Semantic Engine
          </p>
        </div>
      </div>

      {/* KPI 4: Consultas de Estudiantes */}
      <div className="bg-brand-surface rounded-2xl p-5 border border-brand-border shadow-soft flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Consultas Estudiantiles
          </span>
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-brand-primary">{totalViews}</span>
            <span className="text-xs font-semibold text-purple-600">+18% este mes</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Lecturas seguras registradas
          </p>
        </div>
      </div>

    </div>
  );
};
