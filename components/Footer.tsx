/**
 * @file Footer.tsx
 * @description Componente del pie de página.
 * Muestra el aviso de derechos de autor y un pequeño crédito de diseño.
 * Ahora incluye una opción para cambiar el idioma del sitio.
 */
import React from 'react';
import { useApp } from '../contexts/AppContext.tsx';

const Footer: React.FC = () => {
  // Hook para acceder al contexto global (traducciones, idioma actual y función para cambiarlo).
  const { t, language, setLanguage } = useApp();

  /**
   * Gestiona el clic en los enlaces del pie de página para realizar un desplazamiento suave.
   * @param e Evento de clic del ratón.
   */
  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    if (!targetId) return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        const headerElement = document.querySelector('header');
        const headerHeight = headerElement ? headerElement.offsetHeight : 80; // Altura por defecto si no se encuentra la cabecera
        const elementPosition = targetElement.getBoundingClientRect().top;
        const targetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
    }
  };

  return (
    <footer className="bg-gray-800 text-gray-400 py-6">
      <div className="container mx-auto px-6 text-center">
        {/* Selector de idioma */}
        <div className="mb-4">
          <button
            onClick={() => setLanguage('es')}
            disabled={language === 'es'}
            className={`px-2 transition-colors ${language === 'es' ? 'text-white font-bold' : 'text-gray-400 hover:text-white'}`}
            aria-label="Cambiar a Español"
          >
            Español
          </button>
          <span className="text-gray-500 mx-1">|</span>
          <button
            onClick={() => setLanguage('en')}
            disabled={language === 'en'}
            className={`px-2 transition-colors ${language === 'en' ? 'text-white font-bold' : 'text-gray-400 hover:text-white'}`}
            aria-label="Switch to English"
          >
            English
          </button>
        </div>
        {/* Enlace a las políticas */}
        <div className="mb-4">
          <a href="#return-policy" onClick={handleScrollClick} className="hover:text-white transition-colors cursor-pointer">
            {t('footer_policy_link')}
          </a>
        </div>
        {/* Información de copyright y créditos */}
        <p>&copy; {new Date().getFullYear()} {t('footer_copyright')}</p>
        <p className="text-sm mt-1">{t('footer_design_credit')}</p>
      </div>
    </footer>
  );
};

export default Footer;