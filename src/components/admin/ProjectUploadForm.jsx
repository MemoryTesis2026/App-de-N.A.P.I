import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CAREERS, YEARS, POPULAR_TAGS } from '../../data/careers';
import { analyzeThesisSimilarity } from '../../data/napiKnowledge';
import confetti from 'canvas-confetti';
import { 
  UploadCloud, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Plus, 
  X, 
  AlertCircle, 
  Bot,
  Layers,
  Save,
  Tag
} from 'lucide-react';

export const ProjectUploadForm = ({ onSuccess }) => {
  const { addProject, projects, openNapi } = useAuth();

  const [title, setTitle] = useState('');
  const [career, setCareer] = useState(CAREERS[1]?.name || 'Ingeniería en Informática');
  const [year, setYear] = useState('2026');
  const [authors, setAuthors] = useState('');
  const [advisor, setAdvisor] = useState('Prof. Rodrigo Valenzuela');
  const [summary, setSummary] = useState('');
  const [methodology, setMethodology] = useState('');
  const [conclusions, setConclusions] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [stackTags, setStackTags] = useState(['React', 'Node.js', 'PostgreSQL']);
  
  // Simulación de archivo PDF
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Análisis preventivo NAPI en vivo
  const [napiValidation, setNapiValidation] = useState(null);
  const [isValidatingWithNapi, setIsValidatingWithNapi] = useState(false);

  const handleAddTag = (tagToAdd) => {
    const trimmed = tagToAdd.trim();
    if (trimmed && !stackTags.includes(trimmed)) {
      setStackTags([...stackTags, trimmed]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setStackTags(stackTags.filter(t => t !== tagToRemove));
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      simulateFileUpload(e.target.files[0]);
    }
  };

  const simulateFileUpload = (selectedFile) => {
    setFile({
      name: selectedFile.name,
      size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
      pages: Math.floor(Math.random() * 50) + 60
    });
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 25;
      });
    }, 150);
  };

  const handleRunNapiCheck = () => {
    if (!title.trim()) {
      alert('Ingresa el título de la tesis para evaluar similitud con NAPI');
      return;
    }
    setIsValidatingWithNapi(true);
    setTimeout(() => {
      const result = analyzeThesisSimilarity(title, summary, stackTags.join(' '), projects);
      setNapiValidation(result);
      setIsValidatingWithNapi(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !authors.trim() || !summary.trim()) {
      alert('Por favor completa los campos obligatorios: Título, Autores y Resumen.');
      return;
    }

    setIsSubmitting(true);

    // Calcular score con NAPI si no se evaluó
    const finalNapi = napiValidation || analyzeThesisSimilarity(title, summary, stackTags.join(' '), projects);

    setTimeout(() => {
      const newProject = {
        title,
        career,
        year,
        authors: authors.split(',').map(a => a.trim()).filter(Boolean),
        advisor,
        summary,
        methodology: methodology || 'Metodología estructurada de investigación aplicada y prototipado.',
        conclusions: conclusions || 'Resultados validados satisfactoriamente según objetivos propuestos.',
        stack: stackTags.length > 0 ? stackTags : ['Tecnología Aplicada'],
        originalityScore: finalNapi.originalityScore,
        status: 'Publicado',
        fileSize: file ? file.size : '7.5 MB',
        pages: file ? file.pages : 85
      };

      addProject(newProject);
      setIsSubmitting(false);

      // Lanzar confeti visual
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Fallback
      }

      if (onSuccess) onSuccess();
    }, 600);
  };

  return (
    <div className="bg-brand-surface rounded-3xl p-6 sm:p-10 border border-brand-border shadow-soft max-w-4xl mx-auto space-y-8">
      
      {/* Encabezado del Formulario */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-brand-blue mb-1">
            <Layers className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Módulo de Carga Institucional</span>
          </div>
          <h2 className="text-2xl font-black text-brand-primary">
            Cargar Nuevo Proyecto de Título
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Los proyectos registrados quedarán disponibles en el catálogo seguro de Sede Maipú.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRunNapiCheck}
          disabled={isValidatingWithNapi || !title}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan/20 to-blue-100 border border-brand-cyan/40 text-brand-primary hover:bg-brand-cyan/30 text-xs font-bold transition-all flex items-center gap-2 self-start sm:self-auto shrink-0 shadow-sm"
        >
          <Bot className="w-4 h-4 text-brand-cyan" />
          <span>{isValidatingWithNapi ? 'Analizando con IA...' : 'Pre-test de Similitud NAPI'}</span>
        </button>
      </div>

      {/* Alerta de Validación de NAPI si se ejecutó */}
      {napiValidation && (
        <div className="p-4 rounded-2xl bg-slate-900 text-white border border-brand-cyan/50 space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-brand-cyan">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Reporte Preliminar NAPI</span>
            </div>
            <span 
              className="text-xs font-black px-2.5 py-0.5 rounded-full"
              style={{ backgroundColor: `${napiValidation.badgeColor}30`, color: napiValidation.badgeColor }}
            >
              {napiValidation.originalityScore}% Originalidad
            </span>
          </div>
          <p className="text-xs text-slate-300 font-medium">
            {napiValidation.level}
          </p>
          <div className="text-xs text-slate-400 border-t border-slate-800 pt-2 flex items-start gap-2">
            <Bot className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
            <span>{napiValidation.tips[0]}</span>
          </div>
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Fila 1: Título de la Tesis */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Título Oficial de la Tesis / Proyecto *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Sistema Inteligente de Clasificación de Residuos Electrónicos con Visión Artificial..."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white transition-colors"
          />
        </div>

        {/* Fila 2: Carrera y Año */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Carrera (Sede Maipú) *
            </label>
            <select
              value={career}
              onChange={(e) => setCareer(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-brand-blue focus:bg-white transition-colors"
            >
              {CAREERS.filter(c => c.id !== 'all').map(c => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Año de Titulación *
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-brand-blue focus:bg-white transition-colors"
            >
              {YEARS.filter(y => y !== 'Todos').map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Fila 3: Autores y Profesor Guía */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Autores (Separados por coma) *
            </label>
            <input
              type="text"
              required
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
              placeholder="Ej: Lucas Osorio, Matías Silva, Bastián Alarcón"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Profesor Guía *
            </label>
            <input
              type="text"
              required
              value={advisor}
              onChange={(e) => setAdvisor(e.target.value)}
              placeholder="Ej: Prof. Rodrigo Valenzuela"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Fila 4: Resumen Ejecutivo */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Resumen Ejecutivo (Abstract) *
          </label>
          <textarea
            required
            rows={4}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Describe el problema abordado, la solución desarrollada, el alcance técnico y los resultados obtenidos en Sede Maipú..."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white transition-colors"
          />
        </div>

        {/* Fila 5: Metodología y Conclusiones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Metodología Aplicada
            </label>
            <textarea
              rows={2}
              value={methodology}
              onChange={(e) => setMethodology(e.target.value)}
              placeholder="Ej: Scrum en 4 sprints, pruebas en banco de trabajo..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Conclusiones Principales
            </label>
            <textarea
              rows={2}
              value={conclusions}
              onChange={(e) => setConclusions(e.target.value)}
              placeholder="Ej: Reducción del 30% en consumo eléctrico, 95% precisión..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white"
            />
          </div>
        </div>

        {/* Fila 6: Stack Tecnológico / Tags */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Stack Tecnológico & Herramientas Clave
          </label>
          
          <div className="flex flex-wrap gap-2 mb-2">
            {stackTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-blue-light text-brand-blue font-semibold text-xs rounded-lg border border-blue-200"
              >
                <Tag className="w-3 h-3" />
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-red-500 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag(tagInput);
                }
              }}
              placeholder="Escribe una tecnología (ej: Python, Docker, Flutter) y presiona Enter o Añadir..."
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:bg-white"
            />
            <button
              type="button"
              onClick={() => handleAddTag(tagInput)}
              className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>Añadir</span>
            </button>
          </div>

          {/* Sugerencias Rápidas de Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] text-slate-400 font-medium">Sugerencias:</span>
            {POPULAR_TAGS.slice(0, 8).map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => handleAddTag(tag)}
                className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
              >
                +{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Fila 7: Subida de PDF Simulado (Drag & Drop) */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Documento de Tesis Completo (Formato PDF)
          </label>

          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
              isDragging 
                ? 'border-brand-blue bg-blue-50/60 scale-[1.01]' 
                : 'border-slate-300 hover:border-slate-400 bg-slate-50/50'
            }`}
          >
            {file ? (
              <div className="flex items-center justify-between max-w-md mx-auto bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 truncate max-w-[200px]">{file.name}</p>
                    <p className="text-[11px] text-slate-400">{file.size} • {file.pages} páginas estimadas</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Listo
                  </span>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="p-1 text-slate-400 hover:text-red-500 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center mx-auto">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">
                    Arrastra el archivo PDF de la memoria aquí o{' '}
                    <label className="text-brand-blue hover:underline cursor-pointer">
                      selecciona desde tu equipo
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Memoria final de titulación aprobada (Máx 50MB)
                  </p>
                </div>
              </div>
            )}

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-3 max-w-xs mx-auto">
                <div 
                  className="bg-brand-blue h-full transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Botones de Acción Final */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-slate-200">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-brand-blue hover:bg-brand-blue-hover shadow-glow-blue transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>Registrando en el Repositorio...</span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Guardar y Publicar en NAPI</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

