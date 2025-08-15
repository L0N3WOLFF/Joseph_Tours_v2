/**
 * @file TourModal.tsx
 * @description Componente del modal para mostrar los detalles de un tour.
 * Muestra información completa del paquete, incluyendo qué incluye, qué no,
 * horarios y notas adicionales.
 */
import React, { useEffect } from 'react';
import { useApp } from '../contexts/AppContext.tsx';
import type { Tour } from '../types.ts';

interface TourModalProps {
  tour: Tour | null;
  onClose: () => void;
}

const TourModal: React.FC<TourModalProps> = ({ tour, onClose }) => {
  const { t } = useApp();

  // Efecto para cerrar el modal con la tecla 'Escape'.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!tour) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="modal-title" className="text-2xl md:text-3xl font-bold text-cyan-800 mb-2">{tour.title}</h3>
        <p className="text-gray-600 mb-6">{tour.legend}</p>

        <div className="space-y-6 text-gray-700">
          {/* Sección de Incluye */}
          {tour.details.includes.length > 0 && (
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-cyan-100 pb-2">{t('tour_modal_includes')}</h4>
              <ul className="space-y-2">
                {tour.details.includes.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 mr-3 mt-1 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Sección de No Incluye */}
          {tour.details.not_included.length > 0 && (
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-red-100 pb-2">{t('tour_modal_not_included')}</h4>
              <ul className="space-y-2">
                {tour.details.not_included.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 mr-3 mt-1 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Información Adicional para Estadías */}
          {tour.details.additional_info && tour.details.additional_info.length > 0 && (
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-yellow-100 pb-2">{t('tour_modal_additional_info')}</h4>
              <ul className="space-y-2">
                {tour.details.additional_info.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1 text-yellow-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                     <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}


          {/* Hora de Recogida */}
          {tour.details.pickup && (
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-gray-100 pb-2">{t('tour_modal_pickup')}</h4>
              <p className="flex items-start">
                <svg className="w-5 h-5 mr-3 mt-1 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>{tour.details.pickup}</span>
              </p>
            </div>
          )}
        </div>

        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={t('tour_modal_close')}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default TourModal;