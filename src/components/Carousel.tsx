"use client";
import { IconArrowNarrowRight, IconPlayerPlay, IconPlayerPause } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect, useCallback } from "react";

interface SlideData {
  title: string;
  button: string;
  src: string;
  backgroundColor: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const { button, title, src, backgroundColor } = slide;

  return (
    <div className="[perspective:1000px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[50vmin] h-[50vmin] mx-[3vmin] z-10 rounded-lg shadow-lg overflow-hidden"
        onClick={() => handleSlideClick(index)}
        style={{
          transform:
            current !== index
              ? "scale(0.95)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden transition-all duration-150 ease-out">
          <img 
            src={src || `/images/default-slide-${index % 4 + 1}.jpg`} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
            style={{
              transform: current === index ? "scale(1.05)" : "scale(1)",
            }}
          />
          {/* Light mode: lighter overlay for readability */}
          <div className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
            style={{
              background: current === index
                ? "linear-gradient(to top, rgba(0,0,0,0.7) 60%, rgba(255,255,255,0.15) 100%)"
                : "linear-gradient(to top, rgba(0,0,0,0.5) 60%, rgba(255,255,255,0.10) 100%)",
              opacity: 1
            }}
          />
        </div>
        <article
          className={`relative p-6 transition-opacity duration-1000 ease-in-out ${
            current === index ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <h2 className="text-lg md:text-2xl lg:text-4xl font-semibold text-white drop-shadow-md">
            {title}
          </h2>
          <div className="flex justify-center">
            <button className="mt-6 px-6 py-2 bg-white text-black rounded-full hover:shadow-lg transition duration-200 hover:bg-amber-500 hover:text-white">
              {button}
            </button>
          </div>
        </article>
      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={`w-10 h-10 flex items-center  justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
    </button>
  );
};

interface CarouselProps {
  slides: SlideData[];
  autoplayInterval?: number;
  defaultAutoplay?: boolean;
}

export function Carousel({ slides, autoplayInterval = 3000, defaultAutoplay = true }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(defaultAutoplay);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const handlePreviousClick = useCallback(() => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  }, [current, slides.length]);

  const handleNextClick = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const toggleAutoplay = () => {
    setAutoplay(prev => !prev);
  };

  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        handleNextClick();
      }, autoplayInterval);
    }
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, handleNextClick, autoplayInterval]);

  useEffect(() => {
    if (autoplayRef.current && !autoplay) {
      clearInterval(autoplayRef.current);
    }
  }, [current, autoplay]);

  const id = useId();

  return (
    <div
      className="relative w-[60vmin] h-[50vmin] mx-auto overflow-hidden px-4 sm:px-6"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <div className="absolute bottom-[-2.5rem] left-0 right-0 flex justify-between items-center space-x-2">
        <button
          className="w-6 h-6 flex items-center justify-center rounded-full bg-white/90 dark:bg-black/80 shadow-sm hover:scale-110 transition backdrop-blur-sm border border-gray-200 dark:border-gray-800 mr-2"
          title={autoplay ? "Pause autoplay" : "Start autoplay"}
          onClick={toggleAutoplay}
        >
          {autoplay ? (
            <IconPlayerPause size={14} className="text-neutral-600 dark:text-neutral-200" />
          ) : (
            <IconPlayerPlay size={14} className="text-neutral-600 dark:text-neutral-200" />
          )}
        </button>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`h-2 rounded-full transition-all ${
              current === i 
                ? "bg-amber-500 w-4" 
                : "bg-gray-300 dark:bg-gray-600 w-2"
            }`}
            onClick={() => handleSlideClick(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
      <ul
        className="absolute flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
          left: 0
        }}
      >
        {slides &&
          slides.map((slide, index) => (
            <Slide
              key={index}
              slide={slide}
              index={index}
              current={current}
              handleSlideClick={handleSlideClick}
            />
          ))}
      </ul>
    </div>
  );
}

const exampleSlides: SlideData[] = [
  {
    title: "Slide 1",
    button: "Learn More",
    src: "",
    backgroundColor: "#FF5733",
  },
  {
    title: "Slide 2",
    button: "Discover",
    src: "",
    backgroundColor: "#33FF57",
  },
  {
    title: "Slide 3",
    button: "Explore",
    src: "",
    backgroundColor: "#3357FF",
  },
  {
    title: "Slide 4",
    button: "Join Now",
    src: "",
    backgroundColor: "#F3FF33",
  },
];

export function App() {
  return <Carousel slides={exampleSlides} />;
}

export default Carousel;