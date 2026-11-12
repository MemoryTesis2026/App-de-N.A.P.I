import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { KpiMetrics } from './KpiMetrics';
import { ProjectUploadForm } from './ProjectUploadForm';
import { ProjectTable } from './ProjectTable';
import { ProjectDetailModal } from '../student/ProjectDetailModal';
import { 
  ShieldCheck, 
  Layers, 
  UploadCloud, 
  BarChart3, 
  FileText, 
  UserCheck, 
  ArrowLeft, 
  Bot, 
  Sparkles,
  BookOpen
} from 'lucide-react';

export const AdminDashboard = () => {
  const { user, projects, setActiveView, openNapi, selectedProject, openProjectDetail, closeProjectDetail } = useAuth();
  const [activeTab, setActiveTab] = useState('manager'); // 'manager' | 'upload' | 'analytics'

  return (
    <div className="min-h-screen bg-brand-bg pt-20 pb-20">
      
      {/* Header Corporativo del Panel en #1E293B */}
      <div className="bg-brand-primary text-white border-b border-slate-700 py-8 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Info del Docente / Coordinador */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt={user.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-cyan shadow-lg"
                />
                <span className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-full border-2 border-brand-primary">
                  <ShieldCheck className="w-3 h-3 text-white" />
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-black text-white tracking-tight">
                    {user.name || 'Prof. Rodrigo Valenzuela'}
                  </h1>
                  <span className="px-2.5 py-0.5 text-xs font-black uppercase tracking-wider bg-brand-blue text-white rounded-full shadow-sm">
                    Administrador
                  </span>
                  <span className="px-2.5 py-0.5 text-xs font-bold text-brand-cyan bg-cyan-950/80 border border-brand-cyan/40 rounded-full">
                    Sede Maipú
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  {user.title || 'Coordinador Área Tecnologías de la Información'} • {user.career || 'INACAP Maipú'}
                </p>
              </div>
            </div>

            {/* Acciones Rápidas */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveView('student')}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-bold transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-brand-cyan" />
                <span>Vista Catálogo Estudiante</span>
              </button>

              <button
                onClick={() => openNapi('Hola NAPI, quiero una auditoría de similitud sobre los últimos proyectos subidos.')}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-brand-primary font-black text-xs shadow-glow-cyan transition-all flex items-center gap-2"
              >
                <Bot className="w-4 h-4" />
                <span>Asistente NAPI</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Contenido Central */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Métricas Rápidas KPIs */}
        <KpiMetrics projects={projects} />

        {/* Barra de Pestañas de Navegación del Panel */}
        <div className="flex border-b border-slate-200 gap-4">
          <button
            onClick={() => setActiveTab('manager')}
            className={`pb-3 text-sm font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'manager'
                ? 'border-brand-blue text-brand-blue'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Gestor de Tesis ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-3 text-sm font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'upload'
                ? 'border-brand-blue text-brand-blue'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Cargar Nueva Tesis</span>
          </button>
        </div>

        {/* Vista según pestaña */}
        {activeTab === 'manager' && (
          <ProjectTable onOpenDetail={openProjectDetail} />
        )}

        {activeTab === 'upload' && (
          <ProjectUploadForm onSuccess={() => setActiveTab('manager')} />
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
