/**
 * @file AboutUs.tsx
 * @description Componente de la sección "Sobre Nosotros".
 * Muestra una imagen y un texto descriptivo sobre la empresa, su origen
 * y su filosofía de turismo sostenible.
 * El texto se carga dinámicamente según el idioma seleccionado.
 * El diseño ha sido reestructurado para mejorar el balance y la legibilidad.
 */
import React from 'react';
import { useApp } from '../contexts/AppContext.tsx';

const AboutUs: React.FC = () => {
  const { t } = useApp();

  // Array que define el contenido de las tarjetas de detalles.
  // Esto permite renderizar las tarjetas de forma dinámica y mantener el código limpio.
  const detailItems = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      title: t('about_cert_title'),
      content: <p>{t('about_cert_text')}</p>
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      title: t('about_gunayala_title'),
      content: <p>{t('about_gunayala_text')}</p>
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>,
      title: t('about_culture_title'),
      content: (
        <ul className="list-disc list-inside space-y-2">
          <li>{t('about_culture_li1')}</li>
          <li>{t('about_culture_li2')}</li>
          <li>{t('about_culture_li3')}</li>
          <li>{t('about_culture_li4')}</li>
        </ul>
      )
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.546-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      title: t('about_why_title'),
      content: (
        <ul className="list-disc list-inside space-y-2">
          <li>{t('about_why_li1')}</li>
          <li>{t('about_why_li2')}</li>
          <li>{t('about_why_li3')}</li>
        </ul>
      )
    },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-800">{t('about_title')}</h2>
          <p className="text-lg text-gray-600 mt-2">{t('about_subtitle')}</p>
        </div>

        {/* --- Sección 1: Introducción con imagen y texto --- */}
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16 mb-20">
          <div className="md:w-5/12">
            <img 
              src="https://raw.githubusercontent.com/L0N3WOLFF/bewsenigaparapsabeurpedaidemitlum/main/IMG012-COMARCAGUNAYALA.jpeg" 
              alt={t('about_image_alt')}
              className="rounded-lg shadow-xl w-full object-cover"
              style={{maxHeight: '500px'}}
            />
          </div>
          <div className="md:w-7/12 text-gray-700 text-base md:text-lg space-y-4">
            <p><strong>{t('about_p1_strong')}</strong>{t('about_p1_normal')}</p>
            <p>{t('about_p2')}</p>
            <p>{t('about_p3')}</p>
            <p>{t('about_p4')}</p>
            <p className="font-semibold text-cyan-700 pt-2">{t('about_p5')}</p>
          </div>
        </div>

        {/* --- Sección 2: Cuadrícula de detalles con íconos --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
          {detailItems.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-cyan-600 transition-transform transform hover:-translate-y-2">
              <h4 className="text-xl font-bold text-cyan-800 mb-3 flex items-start gap-3">
                {item.icon}
                <span>{item.title}</span>
              </h4>
              <div className="pl-9 text-base">
                {item.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;