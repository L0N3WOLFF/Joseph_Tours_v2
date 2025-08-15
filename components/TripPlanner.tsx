/**
 * @file TripPlanner.tsx
 * @description Componente para mostrar y filtrar los tours disponibles.
 * Muestra una lista de tours con un resumen y un botón para ver detalles completos en un modal.
 * Permite filtrar los tours por categoría: Todos, Pasadía, Reservas y Estadía.
 */
import React, { useState, useMemo } from 'react';
import { useApp } from '../contexts/AppContext.tsx';
import TourModal from './TourModal.tsx'; 
import type { Tour } from '../types.ts';

const TripPlanner: React.FC = () => {
    const { t } = useApp();
    
    // Define los filtros disponibles. Las claves de traducción deben existir en translations.ts
    const filters = useMemo(() => [
      t('tours_filter_all'), 
      t('tours_filter_daytrip'), 
      t('tours_filter_booking'), 
      t('tours_filter_stay')
    ], [t]);
    
    // Estado para el filtro activo. Por defecto es 'Todos'.
    const [activeFilter, setActiveFilter] = useState(filters[0]);
    // Estado para gestionar el tour seleccionado y la visibilidad del modal.
    const [selectedTour, setSelectedTour] = useState<Tour | null>(null);

    // Memoriza la lista de todos los tours para evitar recrearla en cada renderizado.
    const allTours: Tour[] = useMemo(() => [
        // Pasadías
        {
          id: 'pasadia1',
          category: t('tours_filter_daytrip'),
          image: 'https://raw.githubusercontent.com/L0N3WOLFF/Testing_Images_Gallery/c062d59f76fe9861020b876bfea7028037318c98/Project-Tours/Pasadia_01.png',
          title: t('pasadia1_title'),
          legend: t('pasadia1_legend'),
          details: {
            includes: [t('pasadia1_inc_1'), t('pasadia1_inc_2'), t('pasadia1_inc_3'), t('pasadia1_inc_4'), t('pasadia1_inc_5'), t('pasadia1_inc_6'), t('pasadia1_inc_7'), t('pasadia1_inc_8')],
            not_included: [t('pasadia1_ninc_1'), t('pasadia1_ninc_2')],
            pickup: t('pasadia_pickup'),
          }
        },
        {
          id: 'pasadia2',
          category: t('tours_filter_daytrip'),
          image: 'https://raw.githubusercontent.com/L0N3WOLFF/Testing_Images_Gallery/c062d59f76fe9861020b876bfea7028037318c98/Project-Tours/Pasad%C3%ADa_02.png',
          title: t('pasadia2_title'),
          legend: t('pasadia2_legend'),
          details: {
            includes: [t('pasadia2_inc_1'), t('pasadia2_inc_2'), t('pasadia2_inc_3'), t('pasadia2_inc_4'), t('pasadia2_inc_5'), t('pasadia2_inc_6'), t('pasadia2_inc_7'), t('pasadia2_inc_8'), t('pasadia2_inc_9')],
            not_included: [t('pasadia2_ninc_1')],
            pickup: t('pasadia_pickup'),
          }
        },
        {
          id: 'pasadia3',
          category: t('tours_filter_daytrip'),
          image: 'https://raw.githubusercontent.com/L0N3WOLFF/Testing_Images_Gallery/c062d59f76fe9861020b876bfea7028037318c98/Project-Tours/Pasad%C3%ADa_03.jpg',
          title: t('pasadia3_title'),
          legend: t('pasadia3_legend'),
          details: {
            includes: [t('pasadia3_inc_1'), t('pasadia3_inc_2'), t('pasadia3_inc_3'), t('pasadia3_inc_4'), t('pasadia3_inc_5'), t('pasadia3_inc_6'), t('pasadia3_inc_7'), t('pasadia3_inc_8')],
            not_included: [t('pasadia3_ninc_1')],
            pickup: t('pasadia_pickup'),
          }
        },
        // Reservas
        {
          id: 'reserva1',
          category: t('tours_filter_booking'),
          image: 'https://raw.githubusercontent.com/L0N3WOLFF/Testing_Images_Gallery/c062d59f76fe9861020b876bfea7028037318c98/Project-Tours/Pasad%C3%ADa_04_R.png',
          title: t('reserva1_title'),
          legend: t('reserva1_legend'),
          details: {
            includes: [t('reserva1_inc_1'), t('reserva1_inc_2'), t('reserva1_inc_3'), t('reserva1_inc_4'), t('reserva1_inc_5'), t('reserva1_inc_6'), t('reserva1_inc_7'), t('reserva1_inc_8')],
            not_included: [t('reserva1_ninc_1')],
            pickup: t('pasadia_pickup'),
          }
        },
        {
          id: 'reserva2',
          category: t('tours_filter_booking'),
          image: 'https://raw.githubusercontent.com/L0N3WOLFF/Testing_Images_Gallery/c062d59f76fe9861020b876bfea7028037318c98/Project-Tours/Pasad%C3%ADa_05_R.jpg',
          title: t('reserva2_title'),
          legend: t('reserva2_legend'),
          details: {
            includes: [t('reserva2_inc_1'), t('reserva2_inc_2'), t('reserva2_inc_3'), t('reserva2_inc_4'), t('reserva2_inc_5'), t('reserva2_inc_6'), t('reserva2_inc_7'), t('reserva2_inc_8')],
            not_included: [t('reserva2_ninc_1')],
            pickup: t('pasadia_pickup'),
          }
        },
        // Estadías
        {
          id: 'estadia1',
          category: t('tours_filter_stay'),
          image: 'https://raw.githubusercontent.com/L0N3WOLFF/Testing_Images_Gallery/c062d59f76fe9861020b876bfea7028037318c98/Project-Tours/Estadia_1.jpg',
          title: t('estadia1_title'),
          legend: t('estadia1_legend'),
          details: {
            includes: [t('estadia_inc_1'), t('estadia_inc_2'), t('estadia_inc_3'), t('estadia_inc_4'), t('estadia_inc_5'), t('estadia_inc_6'), t('estadia_inc_7'), t('estadia_inc_8')],
            additional_info: [t('estadia1_add_1'), t('estadia1_add_2')],
            not_included: [],
            pickup: ''
          }
        },
        {
          id: 'estadia2',
          category: t('tours_filter_stay'),
          image: 'https://raw.githubusercontent.com/L0N3WOLFF/Testing_Images_Gallery/c062d59f76fe9861020b876bfea7028037318c98/Project-Tours/Estadia_2.jpg',
          title: t('estadia2_title'),
          legend: t('estadia2_legend'),
          details: {
            includes: [t('estadia_inc_1'), t('estadia_inc_2'), t('estadia_inc_3'), t('estadia_inc_4'), t('estadia_inc_5'), t('estadia_inc_6'), t('estadia_inc_7'), t('estadia_inc_8')],
            additional_info: [t('estadia2_add_1'), t('estadia2_add_2')],
            not_included: [],
            pickup: ''
          }
        }
    ], [t]);

    // Memoriza la lista de tours filtrados. Se recalcula solo si el filtro o la lista de tours cambia.
    const filteredTours = useMemo(() => {
        if (activeFilter === t('tours_filter_all')) {
            return allTours;
        }
        return allTours.filter(tour => tour.category === activeFilter);
    }, [activeFilter, allTours, t]);

    // Abre el modal con la información del tour seleccionado.
    const handleOpenModal = (tour: Tour) => {
        setSelectedTour(tour);
    };

    // Cierra el modal.
    const handleCloseModal = () => {
        setSelectedTour(null);
    };

  return (
    <>
      <section id="tours" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-left mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center">
              <span className="mr-2">🌴</span> {t('tours_title')}
            </h2>
            <p className="text-lg text-gray-600 mt-4">
              {t('tours_subtitle1')}
            </p>
            <p className="text-lg text-gray-600">{t('tours_subtitle2')}</p>
          </div>

          {/* Controles de filtro */}
          <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-3 mb-8">
              {filters.map(filter => (
                <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-6 py-2 rounded-full font-semibold transition-colors text-sm md:text-base ${activeFilter === filter ? 'bg-cyan-700 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    aria-pressed={activeFilter === filter}
                >
                    {filter}
                </button>
              ))}
          </div>

          {/* Cuadrícula de tours */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour) => (
              <div key={tour.id} className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <img src={tour.image} alt={tour.title} className="w-full h-56 object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-cyan-800 mb-2">{tour.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{tour.legend}</p>
                  <div className="flex-grow mb-4">
                    <p className="font-semibold text-gray-700 mb-2">{t('tour_modal_includes')}:</p>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      {tour.details.includes.slice(0, 4).map((item, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="w-4 h-4 mr-2 mt-1 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                          <span>{item}</span>
                        </li>
                      ))}
                      {tour.details.includes.length > 4 && <li className="text-gray-500">...</li>}
                    </ul>
                  </div>
                  <button 
                    onClick={() => handleOpenModal(tour)}
                    className="mt-auto w-full bg-amber-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-amber-900 transition-colors duration-300"
                  >
                    {t('tour_card_view_details')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Renderiza el modal solo si hay un tour seleccionado */}
      {selectedTour && (
        <TourModal tour={selectedTour} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default TripPlanner;