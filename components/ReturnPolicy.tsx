/**
 * @file ReturnPolicy.tsx
 * @description Componente que muestra las políticas de devolución y cancelación del servicio.
 * Esta sección es colapsable para mejorar la limpieza de la interfaz.
 * Por defecto está cerrada y se puede expandir haciendo clic en el título.
 * El texto se carga dinámicamente según el idioma seleccionado.
 */
import React from 'react';
import { useApp } from '../contexts/AppContext.tsx';

const ReturnPolicy: React.FC = () => {
  const { t } = useApp();

  return (
    <section id="return-policy" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <details>
            <summary className="flex justify-between items-center w-full text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-cyan-800">
                {t('policy_title')}
              </h2>
              <span className="text-cyan-800 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            
            <div className="mt-12 text-gray-700 space-y-8 text-lg">
              <p>
                {t('policy_intro')}
              </p>
              
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-l-4 border-cyan-700 pl-4">
                  1. {t('policy_cancel_title')}
                </h3>
                <ul className="list-disc list-inside space-y-3 pl-4">
                  <li>
                    {t('policy_cancel_rule1')}
                  </li>
                  <li>
                    {t('policy_cancel_rule2')}
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-l-4 border-cyan-700 pl-4">
                  2. {t('policy_norefund_title')}
                </h3>
                <p className="mb-4 pl-4">
                  {t('policy_norefund_intro')}
                </p>
                <ul className="list-disc list-inside space-y-3 pl-4">
                  <li>
                    {t('policy_norefund_li1')}
                  </li>
                  <li>
                    {t('policy_norefund_li2')}
                  </li>
                  <li>
                    {t('policy_norefund_li3')}
                  </li>
                  <li>
                    {t('policy_norefund_li4')}
                  </li>
                  <li>
                    {t('policy_norefund_li5')}
                  </li>
                </ul>
              </div>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
};

export default ReturnPolicy;