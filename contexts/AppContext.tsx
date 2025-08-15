/**
 * @file AppContext.tsx
 * @description Define el proveedor de contexto global `AppProvider` y el hook `useApp`.
 * Este contexto gestiona el estado compartido a través de toda la aplicación, incluyendo:
 * - El idioma actual para la internacionalización (i18n).
 * - La función `t` para obtener las traducciones.
 * - El estado de scroll para efectos dinámicos en la UI (ej. en el Header).
 */
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { translations, TranslationKeys } from '../lib/translations.ts';

// Define los tipos de datos para el contexto.
type Language = 'es' | 'en';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys) => string;
  isScrolled: boolean;
  setIsScrolled: (isScrolled: boolean) => void;
}

// Crea el contexto de React.
const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * Componente proveedor que envuelve la aplicación y provee el estado global.
 * @param {object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componentes hijos que tendrán acceso al contexto.
 */
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estado para el idioma actual. Por defecto es 'es'.
  const [language, setLanguageState] = useState<Language>('es');
  // Estado para saber si el usuario ha hecho scroll.
  const [isScrolled, setIsScrolled] = useState(false);

  // Efecto que se ejecuta una sola vez al montar el componente para cargar
  // el idioma guardado en localStorage.
  useEffect(() => {
    const storedLang = localStorage.getItem('language') as Language | null;
    if (storedLang) {
      setLanguageState(storedLang);
    }
  }, []);

  /**
   * Actualiza el estado del idioma y lo guarda en localStorage para persistencia.
   * @param lang El nuevo idioma a establecer ('es' o 'en').
   */
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  /**
   * Función de traducción memorizada.
   * Devuelve la cadena de texto correspondiente a la clave y el idioma actual.
   * Se memoriza con `useMemo` para evitar que se recalcule en cada renderizado.
   * @param key La clave de la traducción.
   * @returns La cadena traducida o la clave si no se encuentra la traducción.
   */
  const t = useMemo((): ((key: TranslationKeys) => string) => (key: TranslationKeys): string => {
    return translations[language][key] || key;
  }, [language]);

  // Objeto de valor que se pasará al proveedor de contexto.
  const value = {
    language,
    setLanguage,
    t,
    isScrolled,
    setIsScrolled
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * Hook personalizado para consumir el AppContext de forma segura.
 * Proporciona una forma sencilla para que los componentes accedan al estado global.
 * @throws {Error} Si se usa fuera de un `AppProvider`.
 * @returns El valor del contexto de la aplicación.
 */
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};