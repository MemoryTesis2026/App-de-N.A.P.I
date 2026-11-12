import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import napiLogo from '../../assets/napi-logo.png';
import { X } from 'lucide-react';

/**
 * Botón flotante de NAPI Asistente en la esquina inferior derecha.
 * Tamaño ergonómico y equilibrado (ni muy grande ni muy chico),
 * sin el badge de "IA" por arriba.
 */
export const NapiWidget = () => {
  const { isNapiOpen, openNapi, closeNapi } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="absolute bottom-20 right-4 z-40">
      <button
        type="button"
        onClick={() => (isNapiOpen ? closeNapi() : openNapi())}
        aria-label="Asistente Virtual NAPI"
        title="Consultar a NAPI"
        className={`relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-200 active:scale-95 border ${
          isNapiOpen
            ? 'bg-[#0f2942] border-[#2563eb] text-white shadow-blue-900/40 rotate-90'
            : isDark
              ? 'bg-[#162032] border-slate-700 hover:border-slate-500 shadow-black/60 p-2'
              : 'bg-white border-[#cbd5e1] hover:border-[#0f2942] shadow-slate-300/80 p-2'
        }`}
      >
        {isNapiOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <img 
            src={napiLogo} 
            alt="Asistente NAPI" 
            className="w-full h-full object-contain filter drop-shadow-sm select-none" 
          />
        )}
      </button>
    </div>
  );
};
