/**
 * @file Header.tsx
 * @description Componente de la cabecera de navegación principal.
 * Incluye el logo, los enlaces de navegación y un menú responsive para dispositivos móviles.
 * La cabecera se vuelve translúcida y con sombra al hacer scroll.
 * Implementa una función de desplazamiento suave (smooth scroll) al hacer clic en los enlaces.
 */
import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../contexts/AppContext.tsx';

const Header: React.FC = () => {
  // Hook de contexto para acceder a traducciones y estado global.
  const { t, isScrolled, setIsScrolled } = useApp();
  // Estado para controlar la visibilidad del menú en dispositivos móviles.
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Memoriza los enlaces de navegación para evitar recálculos innecesarios.
  const navLinks = useMemo(() => [
    { href: '#home', label: t('nav_home') },
    { href: '#about', label: t('nav_about') },
    { href: '#tours', label: t('nav_tours') },
    { href: '#gallery', label: t('nav_gallery') },
    { href: '#contact', label: t('nav_contact') },
  ], [t]);

  // Efecto para detectar el scroll y actualizar el estado `isScrolled`.
  // Esto permite cambiar el estilo de la cabecera dinámicamente.
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    // Limpieza: elimina el listener al desmontar el componente.
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setIsScrolled]);

  /**
   * Cierra el menú móvil al hacer clic en un enlace.
   */
  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 shadow-md backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="#home" onClick={handleLinkClick} className={`text-2xl font-bold transition-colors cursor-pointer ${isScrolled ? 'text-cyan-800' : 'text-white'}`}>
            {t('header_title')}
          </a>
          
          {/* Navegación para pantallas grandes */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={`text-lg font-medium transition-colors hover:text-cyan-600 cursor-pointer ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
                {link.label}
              </a>
            ))}
          </nav>

          {/* Botón del menú móvil (hamburguesa) */}
          <div className="md:hidden flex items-center space-x-2">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`focus:outline-none ${isScrolled ? 'text-cyan-800' : 'text-white'}`} aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Contenido del menú desplegable móvil */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-xl">
            <nav className="flex flex-col items-center space-y-4 p-4">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={handleLinkClick} className="text-lg font-medium text-gray-700 transition-colors hover:text-cyan-600 cursor-pointer">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;