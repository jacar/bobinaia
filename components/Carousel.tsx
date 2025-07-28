import React from 'react';

interface CarouselProps {
  images: string[];
  altPrefix?: string;
}

const Carousel: React.FC<CarouselProps> = ({ images, altPrefix = '' }) => {
  const [current, setCurrent] = React.useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-md">
      <img
        src={images[current]}
        alt={`${altPrefix} ${current + 1}`}
        className="w-full h-64 object-cover object-center transition-all duration-300"
      />
      <button
        onClick={prev}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/70"
        aria-label="Anterior"
      >
        &#8592;
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/70"
        aria-label="Siguiente"
      >
        &#8594;
      </button>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, i) => (
          <span
            key={i}
            className={`inline-block w-2 h-2 rounded-full ${i === current ? 'bg-red-600' : 'bg-white/70'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
