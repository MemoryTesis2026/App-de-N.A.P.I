import React from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * MobileLayout: en escritorio se ve como un "teléfono" centrado.
 * En celular real ocupa toda la pantalla.
 * Soporta modo claro (blanco) y modo oscuro (negro) con la paleta de NAPI.
 */
export const MobileLayout = ({ children }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="h-full bg-gradient-to-br from-[#0a192f] via-[#0f2942] to-[#0a192f] flex items-center justify-center p-0 sm:p-4">
      <div 
        className={`relative w-full max-w-[430px] h-full flex flex-col shadow-2xl sm:rounded-[32px] overflow-hidden transition-colors duration-200 ${
          isDark 
            ? 'bg-[#0b1320] text-slate-100 sm:border sm:border-slate-800/80 shadow-black/80' 
            : 'bg-[#f8fafc] text-[#0f2942] sm:border sm:border-slate-200 shadow-xl'
        }`}
      >
        {children}
      </div>
    </div>
  );
};
