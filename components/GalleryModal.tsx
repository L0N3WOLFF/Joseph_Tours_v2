
/**
 * @file GalleryModal.tsx
 * @description Componente del modal de la galería a pantalla completa.
 * Muestra una imagen ampliada, su leyenda, y botones de navegación (anterior/siguiente) y de cierre.
 * Se puede navegar con las flechas del teclado y cerrar con la tecla 'Escape'.
 * El modal se cierra al hacer clic en el fondo oscuro fuera de la imagen.
 */
import React, { useEffect } from 'react';

// Define la interfaz de las propiedades que espera el componente.
interface GalleryModalProps {
  isOpen: boolean;       // Controla si el modal está visible.
  onClose: () => void;     // Función para cerrar el modal.
  onPrev: () => void;      // Función para mostrar la imagen anterior.
  onNext: () => void;      // Función para mostrar la imagen siguiente.
  imageSrc: string;      // URL de la imagen a mostrar.
  caption: string;       // Leyenda de la imagen.
}

const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
  onPrev,
  onNext,
  imageSrc,
  caption,
}) => {
  // Efecto para gestionar los eventos del teclado (navegación y cierre).
  useEffect(() => {
    // Si el modal no está abierto, no se hace nada.
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();   // Cierra con la tecla Escape.
      if (e.key === 'ArrowLeft') onPrev(); // Va a la imagen anterior con la flecha izquierda.
      if (e.key === 'ArrowRight') onNext();// Va a la imagen siguiente con la flecha derecha.
    };

    // Añade el listener de eventos al montar o cuando `isOpen` cambia a `true`.
    window.addEventListener('keydown', handleKeyDown);

    // Función de limpieza: elimina el listener cuando el componente se desmonta
    // o cuando `isOpen` cambia a `false` para evitar fugas de memoria.
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]); // El efecto se vuelve a ejecutar si alguna de estas dependencias cambia.

  // Si el modal no debe estar abierto, no renderiza nada.
  if (!isOpen) return null;

  return (
    // Contenedor principal del modal. Cubre toda la pantalla y tiene un fondo oscuro.
    // El `onClick` aquí permite cerrar el modal al hacer clic en el fondo.
    // Los atributos ARIA mejoran la accesibilidad para lectores de pantalla.
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      {/* Contenedor del contenido del modal (imagen y controles).
          `onClick` con `e.stopPropagation()` evita que el modal se cierre
          al hacer clic dentro de este contenedor.
      */}
      <div
        className="relative max-w-screen-lg w-[95%] h-auto flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagen mostrada. `object-contain` asegura que la imagen se vea completa sin distorsionarse. */}
        <img
          src={imageSrc}
          alt={caption}
          className="max-h-[85vh] w-auto h-auto object-contain rounded-md shadow-2xl"
        />
        {/* Leyenda de la imagen. Solo se muestra si `caption` no está vacío. */}
        {caption && (
          <p id="modal-title" className="text-white text-center mt-4 text-lg bg-black/30 px-4 py-2 rounded-md">
            {caption}
          </p>
        )}
      </div>

      {/* Botón para cerrar el modal */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/75 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Cerrar modal"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Botón de navegación: Anterior */}
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/75 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Imagen anterior"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Botón de navegación: Siguiente */}
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/75 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Siguiente imagen"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Se define una animación simple de 'fade-in' directamente con una etiqueta <style>.
          Esto es útil para animaciones pequeñas y específicas del componente,
          evitando la necesidad de modificar archivos CSS globales.
      */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default GalleryModal;
