/**
 * @file Gallery.tsx
 * @description Componente de la galería de imágenes interactiva.
 * Muestra una colección de imágenes en un diseño de mampostería. Al hacer clic
 * en una imagen, se abre un modal de pantalla completa con navegación.
 * La sección es colapsable y está visible por defecto.
 */
import React, { useState, useMemo } from 'react';
import { useApp } from '../contexts/AppContext.tsx';
import GalleryModal from './GalleryModal.tsx';

const Gallery: React.FC = () => {
  const { t } = useApp();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const galleryImages = useMemo(() => [
    { src: 'https://raw.githubusercontent.com/L0N3WOLFF/Testing_Images_Gallery/c062d59f76fe9861020b876bfea7028037318c98/Project-Tours/Galeria_01.jpg', alt: t('gallery_img1_alt'), caption: t('gallery_img1_caption') },
    { src: 'https://raw.githubusercontent.com/L0N3WOLFF/Testing_Images_Gallery/c062d59f76fe9861020b876bfea7028037318c98/Project-Tours/Galeria_02.jpg', alt: t('gallery_img2_alt'), caption: t('gallery_img2_caption') },
    { src: 'https://raw.githubusercontent.com/L0N3WOLFF/Testing_Images_Gallery/c062d59f76fe9861020b876bfea7028037318c98/Project-Tours/Galeria_03.jpg', alt: t('gallery_img3_alt'), caption: t('gallery_img3_caption') },
    { src: 'https://raw.githubusercontent.com/L0N3WOLFF/Testing_Images_Gallery/c062d59f76fe9861020b876bfea7028037318c98/Project-Tours/Galeria_04.jpg', alt: t('gallery_img4_alt'), caption: t('gallery_img4_caption') },
    { src: 'https://raw.githubusercontent.com/L0N3WOLFF/Testing_Images_Gallery/c062d59f76fe9861020b876bfea7028037318c98/Project-Tours/Galeria_18.png', alt: t('gallery_img5_alt'), caption: t('gallery_img5_caption') },
    { src: 'https://raw.githubusercontent.com/L0N3WOLFF/Testing_Images_Gallery/c062d59f76fe9861020b876bfea7028037318c98/Project-Tours/Galeria_19.png', alt: t('gallery_img6_alt'), caption: t('gallery_img6_caption') },
    { src: 'https://raw.githubusercontent.com/L0N3WOLFF/Testing_Images_Gallery/c062d59f76fe9861020b876bfea7028037318c98/Project-Tours/Galeria_20.png', alt: t('gallery_img7_alt'), caption: t('gallery_img7_caption') },
    { src: 'https://raw.githubusercontent.com/L0N3WOLFF/Testing_Images_Gallery/c062d59f76fe9861020b876bfea7028037318c98/Project-Tours/Galeria_25.png', alt: t('gallery_img8_alt'), caption: t('gallery_img8_caption') },
    { src: 'https://raw.githubusercontent.com/L0N3WOLFF/Testing_Images_Gallery/c062d59f76fe9861020b876bfea7028037318c98/Project-Tours/Galeria_26.png', alt: t('gallery_img9_alt'), caption: t('gallery_img9_caption') },
    { src: 'https://raw.githubusercontent.com/L0N3WOLFF/Testing_Images_Gallery/c062d59f76fe9861020b876bfea7028037318c98/Project-Tours/Galeria_27.png', alt: t('gallery_img10_alt'), caption: t('gallery_img10_caption') },
    { src: 'https://raw.githubusercontent.com/L0N3WOLFF/Testing_Images_Gallery/c062d59f76fe9861020b876bfea7028037318c98/Project-Tours/Galeria_38.png', alt: t('gallery_img11_alt'), caption: t('gallery_img11_caption') },
    { src: 'https://raw.githubusercontent.com/L0N3WOLFF/Testing_Images_Gallery/c062d59f76fe9861020b876bfea7028037318c98/Project-Tours/Galeria_66.png', alt: t('gallery_img12_alt'), caption: t('gallery_img12_caption') },
    { src: 'https://raw.githubusercontent.com/L0N3WOLFF/Testing_Images_Gallery/c062d59f76fe9861020b876bfea7028037318c98/Project-Tours/Galeria_71.png', alt: t('gallery_img13_alt'), caption: t('gallery_img13_caption') },
    { src: 'https://raw.githubusercontent.com/L0N3WOLFF/Testing_Images_Gallery/c062d59f76fe9861020b876bfea7028037318c98/Project-Tours/Galeria_79.png', alt: t('gallery_img14_alt'), caption: t('gallery_img14_caption') },
    { src: 'https://raw.githubusercontent.com/L0N3WOLFF/Testing_Images_Gallery/c062d59f76fe9861020b876bfea7028037318c98/Project-Tours/Galeria_92.png', alt: t('gallery_img15_alt'), caption: t('gallery_img15_caption') },
  ], [t]);

  const handleOpenModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handlePrev = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) =>
        prevIndex === 0 ? galleryImages.length - 1 : prevIndex! - 1
      );
    }
  };

  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) =>
        (prevIndex! + 1) % galleryImages.length
      );
    }
  };

  return (
    <>
      <section id="gallery" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <details open>
              <summary className="flex justify-between items-center w-full text-left mb-12">
                <div className='text-center w-full'>
                  <h2 className="text-2xl md:text-3xl font-bold text-cyan-800">{t('gallery_title')}</h2>
                  <p className="text-lg text-gray-600 mt-2">{t('gallery_subtitle')}</p>
                </div>
                <span className="text-cyan-800 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>

              <div className="columns-2 md:columns-3 gap-4">
                {galleryImages.map((image, index) => (
                  <div key={index} className="mb-4 break-inside-avoid" onClick={() => handleOpenModal(index)}>
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-auto rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer" 
                    />
                  </div>
                ))}
              </div>
            </details>
          </div>
        </div>
      </section>

      {selectedImageIndex !== null && (
        <GalleryModal
          isOpen={selectedImageIndex !== null}
          onClose={handleCloseModal}
          imageSrc={galleryImages[selectedImageIndex].src}
          caption={galleryImages[selectedImageIndex].caption}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </>
  );
};

export default Gallery;