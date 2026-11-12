import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Contrast } from 'lucide-react';

/**
 * Circulito de cambio de color Blanco/Negro (Modo Claro / Modo Oscuro)
 * Diseñado para ser visible, discreto y sin interferir con la navegación de la app.
 */
export const ThemeToggleCircle = ({ className = '', size = 'md' }) => {
  const { theme, toggleTheme, openAccessibilityModal } = useTheme();
  const isDark = theme === 'dark';

  const sizeClasses = size === 'sm' 
    ? 'w-7 h-7 text-xs' 
    : size === 'lg' 
      ? 'w-10 h-10 text-sm' 
      : 'w-8 h-8 text-xs';

  return (
    <div className={`relative inline-flex items-center gap-1 ${className}`}>
      <button
        type="button"
        onClick={toggleTheme}
        onContextMenu={(e) => {
          e.preventDefault();
          openAccessibilityModal();
        }}
        title={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'} (Clic secundario para accesibilidad)`}
        aria-label="Alternar modo claro u oscuro"
        className={`${sizeClasses} rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 shadow-sm border ${
          isDark 
            ? 'bg-[#162032] border-slate-700 text-amber-300 hover:bg-slate-800 hover:border-slate-600' 
            : 'bg-white border-[#cbd5e1] text-[#0f2942] hover:bg-slate-50 hover:border-[#0f2942]'
        }`}
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-300 animate-in spin-in-180 duration-200" />
        ) : (
          /* Icono de medio círculo estilo contraste como en la web oficial */
          <div className="w-4 h-4 rounded-full border-[1.5px] border-[#0f2942] overflow-hidden flex">
            <span className="w-1/2 h-full bg-[#0f2942]" />
            <span className="w-1/2 h-full bg-transparent" />
          </div>
        )}
      </button>

      {/* Botoncito discreto auxiliar para abrir el modal completo si se desea */}
      <button
        type="button"
        onClick={openAccessibilityModal}
        title="Opciones de Color y Accesibilidad"
        className={`w-4 h-4 rounded-full flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity ${
          isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-[#0f2942]'
        }`}
      >
        <span className="text-[9px] font-black leading-none">⚙</span>
      </button>
    </div>
  );
};
