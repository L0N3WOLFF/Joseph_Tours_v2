/**
 * @file Hero.tsx
 * @description Componente principal de la sección "Hero" o banner de inicio.
 * Muestra un carrusel de imágenes de fondo a pantalla completa, un título principal,
 * y una descripción inspiradora para invitar a los usuarios a explorar.
 * El contenido de texto ahora es dinámico según el idioma seleccionado.
 */
import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../contexts/AppContext.tsx';

const Hero: React.FC = () => {
  const { t } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Memoriza las imágenes del carrusel para evitar recálculos.
  const images = useMemo(() => [
    { src: 'https://raw.githubusercontent.com/L0N3WOLFF/Testing_Images_Gallery/c062d59f76fe9861020b876bfea7028037318c98/Project-Tours/Banner_Slider_0.jpg', alt: t('hero_slider_alt_1') },
    { src: 'https://raw.githubusercontent.com/L0N3WOLFF/Testing_Images_Gallery/c062d59f76fe9861020b876bfea7028037318c98/Project-Tours/Banner_Slider_1.png', alt: t('hero_slider_alt_2') },
    { src: 'https://raw.githubusercontent.com/L0N3WOLFF/Testing_Images_Gallery/c062d59f76fe9861020b876bfea7028037318c98/Project-Tours/Banner_Slider_2.png', alt: t('hero_slider_alt_3') },
  ], [t]);

  // Efecto para cambiar la imagen automáticamente cada 5 segundos.
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    // Limpieza: detiene el temporizador al desmontar el componente.
    return () => clearInterval(timer);
  }, [images.length]);

  /**
   * Navega a una diapositiva específica al hacer clic en los puntos de navegación.
   * @param slideIndex El índice de la diapositiva a mostrar.
   */
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
      {/* Contenedor del carrusel de imágenes */}
      <div className="absolute top-0 left-0 w-full h-full">
        {images.map((image, index) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            // Precarga de imágenes para una transición más suave.
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>
      
      {/* Capa de superposición oscura para mejorar la legibilidad del texto. */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

      {/* Contenido de texto centrado. */}
      <div className="relative z-20 px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
          {t('hero_title')}
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
          {t('hero_subtitle')}
        </p>
      </div>

      {/* Puntos de navegación del carrusel */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentIndex === index ? 'bg-white' : 'bg-white/50 hover:bg-white'
            }`}
            aria-label={`Ir a la imagen ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;