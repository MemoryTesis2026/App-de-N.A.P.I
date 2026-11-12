import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  Sun, 
  Moon, 
  Eye, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Palette 
} from 'lucide-react';

export const AccessibilityModal = () => {
  const { 
    theme, 
    setTheme, 
    colorBlindness, 
    setColorBlindness, 
    isAccessibilityModalOpen, 
    closeAccessibilityModal 
  } = useTheme();

  const [isOpenVariants, setIsOpenVariants] = useState(true);

  if (!isAccessibilityModalOpen) return null;

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-sm rounded-2xl shadow-2xl border overflow-hidden flex flex-col max-h-[90vh] ${
          isDark 
            ? 'bg-[#0f172a] text-white border-slate-700' 
            : 'bg-white text-[#0f2942] border-[#cbd5e1]'
        }`}
      >
        {/* Encabezado */}
        <div className={`p-4 flex items-center justify-between border-b ${
          isDark ? 'border-slate-800 bg-[#162032]' : 'border-slate-100 bg-[#f8fafc]'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl flex items-center justify-center ${
              isDark ? 'bg-slate-800 text-blue-400' : 'bg-[#0f2942] text-white'
            }`}>
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-black tracking-wider uppercase">
                Color y Accesibilidad
              </h3>
              <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Personaliza el aspecto de N.A.P.I
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeAccessibilityModal}
            className={`p-1.5 rounded-lg transition-colors ${
              isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-200 text-slate-400 hover:text-slate-700'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Contenido scrolleable */}
        <div className="p-4 space-y-4 overflow-y-auto">
          
          {/* SECCIÓN MODO DE COLOR */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] font-black uppercase tracking-wider ${
                isDark ? 'text-slate-300' : 'text-[#0f2942]'
              }`}>
                Modo de Color
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isDark 
                  ? 'bg-slate-800 text-slate-300 border border-slate-700' 
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}>
                {isDark ? 'Oscuro' : 'Claro'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Tarjeta Modo Claro */}
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`p-3 rounded-xl border flex flex-col items-center text-center gap-2 transition-all ${
                  !isDark 
                    ? 'border-[#0f2942] bg-[#f8fafc] ring-2 ring-[#0f2942]/20 shadow-sm' 
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 shadow-sm">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold leading-tight">Modo Claro</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">Luminoso oficial</p>
                </div>
              </button>

              {/* Tarjeta Modo Oscuro */}
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`p-3 rounded-xl border flex flex-col items-center text-center gap-2 transition-all ${
                  isDark 
                    ? 'border-blue-500 bg-[#162032] ring-2 ring-blue-500/20 shadow-sm' 
                    : 'border-slate-200 bg-white hover:border-slate-300 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-blue-400 shadow-sm">
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold leading-tight">Modo Oscuro</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">Alto confort nocturno</p>
                </div>
              </button>
            </div>
          </div>

          <div className={`h-px ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />

          {/* SECCIÓN DALTONISMO */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-blue-500" />
                <span className={`text-[10px] font-black uppercase tracking-wider ${
                  isDark ? 'text-slate-300' : 'text-[#0f2942]'
                }`}>
                  Daltonismo
                </span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                colorBlindness === 'none' 
                  ? (isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500')
                  : 'bg-blue-500 text-white'
              }`}>
                {colorBlindness === 'none' ? 'Desactivado' : colorBlindness}
              </span>
            </div>

            <p className={`text-[11px] mb-3 leading-snug ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Filtros cromáticos adaptados a la percepción visual según el tipo de daltonismo.
            </p>

            {/* Acordeón Configurar Tipo */}
            <div className={`rounded-xl border overflow-hidden ${
              isDark ? 'border-slate-800 bg-[#162032]' : 'border-slate-200 bg-white'
            }`}>
              <button
                type="button"
                onClick={() => setIsOpenVariants(!isOpenVariants)}
                className={`w-full p-2.5 flex items-center justify-between text-xs font-bold ${
                  isDark ? 'text-slate-200 hover:bg-slate-800/50' : 'text-[#0f2942] hover:bg-slate-50'
                }`}
              >
                <span>Configurar Tipo (3 variantes)</span>
                {isOpenVariants ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {isOpenVariants && (
                <div className={`p-2 space-y-1.5 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                  
                  {/* Protanopia */}
                  <button
                    type="button"
                    onClick={() => setColorBlindness('protanopia')}
                    className={`w-full text-left p-2.5 rounded-xl border flex items-start gap-2.5 transition-all ${
                      colorBlindness === 'protanopia'
                        ? (isDark ? 'border-red-500 bg-red-950/30' : 'border-red-500 bg-red-50/50')
                        : (isDark ? 'border-slate-800 hover:border-slate-700' : 'border-slate-200 hover:border-slate-300')
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-red-500 shrink-0 mt-0.5 shadow-sm" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold">Protanopia</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-red-100 text-red-700 border border-red-200">
                          Sin Rojo
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Dificultad o ausencia para distinguir tonos rojos
                      </p>
                    </div>
                  </button>

                  {/* Deuteranopia */}
                  <button
                    type="button"
                    onClick={() => setColorBlindness('deuteranopia')}
                    className={`w-full text-left p-2.5 rounded-xl border flex items-start gap-2.5 transition-all ${
                      colorBlindness === 'deuteranopia'
                        ? (isDark ? 'border-emerald-500 bg-emerald-950/30' : 'border-emerald-500 bg-emerald-50/50')
                        : (isDark ? 'border-slate-800 hover:border-slate-700' : 'border-slate-200 hover:border-slate-300')
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 shrink-0 mt-0.5 shadow-sm" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold">Deuteranopia</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-700 border border-emerald-200">
                          Sin Verde
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Dificultad o ausencia para distinguir tonos verdes
                      </p>
                    </div>
                  </button>

                  {/* Tritanopia */}
                  <button
                    type="button"
                    onClick={() => setColorBlindness('tritanopia')}
                    className={`w-full text-left p-2.5 rounded-xl border flex items-start gap-2.5 transition-all ${
                      colorBlindness === 'tritanopia'
                        ? (isDark ? 'border-blue-500 bg-blue-950/30' : 'border-blue-500 bg-blue-50/50')
                        : (isDark ? 'border-slate-800 hover:border-slate-700' : 'border-slate-200 hover:border-slate-300')
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-blue-500 shrink-0 mt-0.5 shadow-sm" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold">Tritanopia</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-700 border border-blue-200">
                          Sin Azul
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Dificultad o ausencia para distinguir tonos azules
                      </p>
                    </div>
                  </button>

                  {/* Desactivar filtro */}
                  <button
                    type="button"
                    onClick={() => setColorBlindness('none')}
                    className={`w-full py-2 px-3 rounded-xl border border-dashed text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                      colorBlindness === 'none'
                        ? (isDark ? 'border-slate-700 text-slate-400 bg-slate-800/30' : 'border-slate-300 text-slate-500 bg-slate-50')
                        : (isDark ? 'border-blue-400 text-blue-400 hover:bg-slate-800' : 'border-[#0f2942] text-[#0f2942] hover:bg-slate-100')
                    }`}
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Desactivar filtro de daltonismo (Normal)</span>
                  </button>

                </div>
              )}
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className={`p-3 border-t flex justify-end ${isDark ? 'border-slate-800 bg-[#162032]' : 'border-slate-100 bg-[#f8fafc]'}`}>
          <button
            type="button"
            onClick={closeAccessibilityModal}
            className="w-full py-2 rounded-xl bg-[#0f2942] hover:bg-[#163a5c] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            Aceptar y Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
