import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { analyzeThesisSimilarity } from '../../data/napiKnowledge';
import confetti from 'canvas-confetti';
import { 
  UploadCloud, 
  CheckCircle2, 
  X, 
  FileText, 
  Sparkles,
  RefreshCw
} from 'lucide-react';

const ACADEMIC_AREAS = [
  'Informática, Ciberseguridad e Innovación',
  'Mecánica y Electromovilidad',
  'Administración y Negocios',
  'Electricidad y Automatización',
  'Construcción y Minería',
  'Diseño y Comunicación Digital'
];

const MAIPU_CAREERS = [
  'Analista Programador',
  'Ingeniería en Informática',
  'Ingeniería en Ciberseguridad',
  'Ingeniería en Telecomunicaciones y Redes',
  'Ingeniería en Electrónica y Sistemas Inteligentes',
  'Ingeniería en Mantenimiento Industrial',
  'Ingeniería en Administración de Empresas',
  'Ingeniería Eléctrica',
  'Ingeniería en Comercio Exterior',
  'Ingeniería en Maquinaria Pesada y Vehículos Automotrices',
  'Construcción Civil',
  'Ingeniería en Minas'
];

const YEARS = ['2026', '2025', '2024', '2023', '2022', '2021', '2020'];

export const ProjectUploadSection = ({ onProjectAdded }) => {
  const { addProject, projects } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Estados del Formulario (conforme a las capturas oficiales 3 y 4)
  const [projectName, setProjectName] = useState('');
  const [academicArea, setAcademicArea] = useState(ACADEMIC_AREAS[0]);
  const [career, setCareer] = useState('Analista Programador');
  const [year, setYear] = useState('2025');
  const [finalGrade, setFinalGrade] = useState('6,5');
  const [authors, setAuthors] = useState('');
  const [description, setDescription] = useState('');
  const [stackInput, setStackInput] = useState('');
  const [file, setFile] = useState(null);
  const [rawFile, setRawFile] = useState(null);
  const [isCatalogVisible, setIsCatalogVisible] = useState(true);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleClear = () => {
    setProjectName('');
    setAcademicArea(ACADEMIC_AREAS[0]);
    setCareer('Analista Programador');
    setYear('2025');
    setFinalGrade('6,5');
    setAuthors('');
    setDescription('');
    setStackInput('');
    setFile(null);
    setRawFile(null);
    setIsCatalogVisible(true);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.size > 100 * 1024 * 1024) {
        alert('El archivo supera el límite máximo de 100MB.');
        e.target.value = '';
        return;
      }
      setRawFile(selected);
      setFile({
        name: selected.name,
        size: `${(selected.size / (1024 * 1024)).toFixed(1)} MB`
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectName.trim()) {
      alert('Por favor, ingresa el Nombre del Proyecto.');
      return;
    }
    if (!authors.trim()) {
      alert('Por favor, ingresa los Autores / Estudiantes.');
      return;
    }
    if (!description.trim()) {
      alert('Por favor, ingresa la Descripción / Resumen detallado.');
      return;
    }

    setLoading(true);

    try {
      // Procesar stack de tecnologías separadas por coma
      const stackArray = stackInput
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const stackToSave = stackArray.length > 0 
        ? stackArray 
        : ['ESP32', 'Node.js', 'React'];

      // Calcular similitud u originalidad
      const similarityCheck = analyzeThesisSimilarity(
        projectName,
        description,
        stackToSave.join(' '),
        projects
      );

      const newProj = {
        title: projectName.trim(),
        academicArea,
        career,
        year,
        finalGrade: finalGrade.trim() || '6.5',
        authors: authors.split(',').map(a => a.trim()).filter(Boolean),
        advisor: 'Prof. Sede Maipú',
        summary: description.trim(),
        stack: stackToSave,
        originalityScore: similarityCheck.originalityScore || 94,
        status: isCatalogVisible ? 'Publicado' : 'Oculto',
        fileSize: file ? file.size : '5.2 MB',
        pages: 75
      };

      await addProject(newProj, rawFile);
      setLoading(false);
      setSuccessMessage(true);

      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.65 }
        });
      } catch (err) {}

      setTimeout(() => {
        setSuccessMessage(false);
        handleClear();
        if (onProjectAdded) onProjectAdded();
      }, 2500);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className={`p-4 space-y-4 pb-12 transition-colors duration-200 ${
      isDark ? 'text-slate-100' : 'text-[#0f2942]'
    }`}>
      {/* ── Encabezado Principal según Captura 3 ── */}
      <div className="space-y-1">
        <h2 className="text-base font-black tracking-tight leading-snug">
          Registrar Nuevo Proyecto de Título
        </h2>
        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Completa la ficha técnica para indexar el proyecto en N.A.P.I.
        </p>
      </div>

      {successMessage && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>¡Proyecto indexado con éxito en el catálogo institucional!</span>
        </div>
      )}

      {/* ── Formulario Completo ── */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        
        {/* 1. NOMBRE DEL PROYECTO */}
        <div>
          <label className={`block text-[10px] font-black uppercase tracking-wider mb-1 ${
            isDark ? 'text-slate-300' : 'text-[#0f2942]'
          }`}>
            Nombre del Proyecto
          </label>
          <input
            type="text"
            required
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Ej: Sistema IoT de Monitoreo Energético para Planta Maipú"
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none transition-colors ${
              isDark 
                ? 'bg-[#131f33] border-slate-700 text-white placeholder-slate-500 focus:border-blue-400' 
                : 'bg-white border-slate-300 text-[#0f2942] placeholder-slate-400 focus:border-[#0f2942]'
            }`}
          />
        </div>

        {/* 2. ÁREA ACADÉMICA Y CARRERA (Fila 1) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`block text-[10px] font-black uppercase tracking-wider mb-1 ${
              isDark ? 'text-slate-300' : 'text-[#0f2942]'
            }`}>
              Área Académica
            </label>
            <select
              value={academicArea}
              onChange={(e) => setAcademicArea(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl text-xs border outline-none transition-colors ${
                isDark 
                  ? 'bg-[#131f33] border-slate-700 text-white focus:border-blue-400' 
                  : 'bg-white border-slate-300 text-[#0f2942] focus:border-[#0f2942]'
              }`}
            >
              {ACADEMIC_AREAS.map(a => (
                <option key={a} value={a} className={isDark ? 'bg-[#0f172a]' : 'bg-white'}>{a}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-[10px] font-black uppercase tracking-wider mb-1 ${
              isDark ? 'text-slate-300' : 'text-[#0f2942]'
            }`}>
              Carrera (Sede Maipú)
            </label>
            <select
              value={career}
              onChange={(e) => setCareer(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl text-xs border outline-none transition-colors ${
                isDark 
                  ? 'bg-[#131f33] border-slate-700 text-white focus:border-blue-400' 
                  : 'bg-white border-slate-300 text-[#0f2942] focus:border-[#0f2942]'
              }`}
            >
              {MAIPU_CAREERS.map(c => (
                <option key={c} value={c} className={isDark ? 'bg-[#0f172a]' : 'bg-white'}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 3. AÑO Y NOTA FINAL (Fila 2) */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={`block text-[10px] font-black uppercase tracking-wider mb-1 ${
              isDark ? 'text-slate-300' : 'text-[#0f2942]'
            }`}>
              Año
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl text-xs border outline-none transition-colors ${
                isDark 
                  ? 'bg-[#131f33] border-slate-700 text-white focus:border-blue-400' 
                  : 'bg-white border-slate-300 text-[#0f2942] focus:border-[#0f2942]'
              }`}
            >
              {YEARS.map(y => (
                <option key={y} value={y} className={isDark ? 'bg-[#0f172a]' : 'bg-white'}>{y}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-[10px] font-black uppercase tracking-wider mb-1 ${
              isDark ? 'text-slate-300' : 'text-[#0f2942]'
            }`}>
              Nota Final (≥ 6.0)
            </label>
            <input
              type="text"
              value={finalGrade}
              onChange={(e) => setFinalGrade(e.target.value)}
              placeholder="6,5"
              className={`w-full px-3 py-2.5 rounded-xl text-xs border outline-none transition-colors text-center font-bold ${
                isDark 
                  ? 'bg-[#131f33] border-slate-700 text-white focus:border-blue-400' 
                  : 'bg-white border-slate-300 text-[#0f2942] focus:border-[#0f2942]'
              }`}
            />
          </div>
        </div>

        {/* 4. AUTORES / ESTUDIANTES */}
        <div>
          <label className={`block text-[10px] font-black uppercase tracking-wider mb-1 ${
            isDark ? 'text-slate-300' : 'text-[#0f2942]'
          }`}>
            Autores / Estudiantes
          </label>
          <input
            type="text"
            required
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            placeholder="Ej: Diego Álvarez, Valentina Cruz"
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none transition-colors ${
              isDark 
                ? 'bg-[#131f33] border-slate-700 text-white placeholder-slate-500 focus:border-blue-400' 
                : 'bg-white border-slate-300 text-[#0f2942] placeholder-slate-400 focus:border-[#0f2942]'
            }`}
          />
        </div>

        {/* 5. DESCRIPCIÓN / RESUMEN DETALLADO */}
        <div>
          <label className={`block text-[10px] font-black uppercase tracking-wider mb-1 ${
            isDark ? 'text-slate-300' : 'text-[#0f2942]'
          }`}>
            Descripción / Resumen Detallado
          </label>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe objetivos, problemática, solución y resultados del proyecto..."
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none transition-colors leading-relaxed ${
              isDark 
                ? 'bg-[#131f33] border-slate-700 text-white placeholder-slate-500 focus:border-blue-400' 
                : 'bg-white border-slate-300 text-[#0f2942] placeholder-slate-400 focus:border-[#0f2942]'
            }`}
          />
        </div>

        {/* 7. DOCUMENTO ADJUNTO (PDF O WORD .DOCX) según Captura 4 */}
        <div>
          <label className={`block text-[10px] font-black uppercase tracking-wider mb-1 ${
            isDark ? 'text-slate-300' : 'text-[#0f2942]'
          }`}>
            Documento Adjunto (PDF o Word .docx)
          </label>
          
          <label className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
            file
              ? (isDark ? 'border-emerald-500/50 bg-emerald-950/20' : 'border-emerald-500 bg-emerald-50/50')
              : (isDark ? 'border-slate-700 bg-[#131f33]/60 hover:border-slate-500' : 'border-slate-300 bg-white hover:border-[#0f2942] hover:bg-slate-50')
          }`}>
            <UploadCloud className={`w-8 h-8 mb-1.5 ${
              file 
                ? 'text-emerald-500' 
                : (isDark ? 'text-blue-400' : 'text-[#0f2942]')
            }`} />
            
            {file ? (
              <div className="text-center">
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1">
                  <FileText className="w-3.5 h-3.5" />
                  {file.name}
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">{file.size} · Haz clic para cambiarlo</p>
              </div>
            ) : (
              <div className="text-center space-y-0.5">
                <p className="text-xs font-bold">
                  Arrastra aquí o haz clic para adjuntar el informe técnico (PDF / Word)
                </p>
                <p className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Archivos PDF o Word (.docx) hasta 100MB (límite máximo)
                </p>
              </div>
            )}
            
            <input
              type="file"
              accept=".pdf,.docx,.doc"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* 9. BOTONES DE ACCIÓN: LIMPIAR Y GUARDAR E INDEXAR PROYECTO */}
        <div className={`pt-2 flex items-center gap-2.5 border-t ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          {/* Botón Limpiar */}
          <button
            type="button"
            onClick={handleClear}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              isDark 
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Limpiar
          </button>

          {/* Botón Guardar e Indexar Proyecto */}
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#0f2942] hover:bg-[#163a5c] text-white text-xs font-black uppercase tracking-wider shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Indexando...</span>
              </>
            ) : (
              <span>GUARDAR E INDEXAR PROYECTO</span>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};
