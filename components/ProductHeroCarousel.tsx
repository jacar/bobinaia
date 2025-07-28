import React, { useState } from 'react';

interface Slide {
  title: string;
  description: string;
  image: string;
}

const slides: Slide[] = [
  {
    title: 'Bobinas de alta potencia',
    description: 'Ideales para sistemas de audio profesional y automotriz. Soportan altas temperaturas y ofrecen máxima eficiencia.',
    image: 'https://www.strongmeropower.com/wp-content/uploads/2023/11/1111-600x600.jpg',
  },
  {
    title: 'Modelos personalizados',
    description: 'Fabricamos bobinas a medida según las especificaciones de tu parlante o proyecto de sonido.',
    image: 'https://www.strongmeropower.com/wp-content/uploads/2023/11/155-600x600.jpg',
  },
  {
    title: 'Calidad garantizada',
    description: 'Materiales premium y procesos certificados para un rendimiento superior y durabilidad.',
    image: 'https://www.strongmeropower.com/wp-content/uploads/2023/11/34-1-600x600.jpg',
  },
];

const ProductHeroCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  return (
    <section
      className="relative w-full max-w-5xl mx-auto my-12 rounded-xl overflow-hidden shadow-lg"
      style={{ minHeight: '320px' }}
    >
      {/* Fondo decorativo */}
      <img
        src="https://www.strongmeropower.com/wp-content/uploads/2023/11/BOBINA-600x600.jpg"
        alt="Fondo bobina"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 p-8">
        {/* Texto a la izquierda */}
        <div className="md:w-1/2 bg-white/90 rounded-lg p-6 shadow text-center md:text-left">
          <h3 className="text-2xl font-bold text-red-700 mb-2">{slides[current].title}</h3>
          <p className="text-slate-800 mb-4">{slides[current].description}</p>
          <button
            onClick={prev}
            className="mr-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            aria-label="Anterior"
          >
            &#8592;
          </button>
          <button
            onClick={next}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            aria-label="Siguiente"
          >
            &#8594;
          </button>
        </div>
        {/* Imagen a la derecha */}
        <div className="md:w-1/2 flex items-center justify-center">
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-64 h-64 object-contain rounded-xl shadow-lg border border-white"
          />
        </div>
      </div>
    </section>
  );
};

export default ProductHeroCarousel;
