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

  const { button, title, backgroundColor } = slide;

  return (
    <div className="[perspective:1000px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[70vmin] h-[70vmin] mx-[6vmin] z-10 rounded-lg shadow-lg"
        onClick={() => handleSlideClick(index)}
        style={{
          backgroundColor,
          transform:
            current !== index
              ? "scale(0.95) "
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-lg overflow-hidden transition-all duration-150 ease-out"
        >
          {current === index && (
            <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />
          )}
        </div>

        <article
          className={`relative p-6 transition-opacity duration-1000 ease-in-out ${
            current === index ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <h2 className="text-lg md:text-2xl lg:text-4xl font-semibold">
            {title}
          </h2>
          <div className="flex justify-center">
            <button className="mt-6 px-6 py-2 bg-white text-black rounded-full hover:shadow-lg transition duration-200">
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
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  }, [current, slides.length]);

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const toggleAutoplay = () => {
    setAutoplay(prev => !prev);
  };

  // Handle autoplay
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

  // Clear autoplay on manual navigation
  useEffect(() => {
    if (autoplayRef.current && !autoplay) {
      clearInterval(autoplayRef.current);
    }
  }, [current, autoplay]);

  const id = useId();

  return (
    <div
      className="relative w-[70vmin] h-[70vmin] mx-auto overflow-visible"
      aria-labelledby={`carousel-heading-${id}`}
    >
      {/* Buttons positioned outside the cards */}
      <button
        className="absolute left-[-2rem] top-1/2 transform -translate-y-1/2 bg-neutral-200 dark:bg-neutral-800 w-10 h-10 flex items-center justify-center rounded-full shadow-md hover:scale-110 transition z-10"
        title="Go to previous slide"
        onClick={handlePreviousClick}
      >
        <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200 rotate-180" />
      </button>

      <button
        className="absolute right-[-3.5rem] top-1/2 transform -translate-y-1/2 bg-neutral-200 dark:bg-neutral-800 w-10 h-10 flex items-center justify-center rounded-full shadow-md hover:scale-110 transition z-10"
        title="Go to next slide"
        onClick={handleNextClick}
      >
        <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
      </button>

      {/* Autoplay control button */}
      <button
        className="hidden top-[-2rem] right-0 bg-neutral-200 dark:bg-neutral-800 w-10 h-10  items-center justify-center rounded-full shadow-md hover:scale-110 transition z-10"
        title={autoplay ? "Pause autoplay" : "Start autoplay"}
        onClick={toggleAutoplay}
      >
        {autoplay ? (
          <IconPlayerPause className="text-neutral-600 dark:text-neutral-200" />
        ) : (
          <IconPlayerPlay className="text-neutral-600 dark:text-neutral-200" />
        )}
      </button>

      <ul
        className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${current * (100 / 4)}%)`,
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
    backgroundColor: "#FF5733", // Red
  },
  {
    title: "Slide 2",
    button: "Discover",
    src: "",
    backgroundColor: "#33FF57", // Green
  },
  {
    title: "Slide 3",
    button: "Explore",
    src: "",
    backgroundColor: "#3357FF", // Blue
  },
  {
    title: "Slide 4",
    button: "Join Now",
    src: "",
    backgroundColor: "#F3FF33", // Yellow
  },
];

// Usage example
export function App() {
  return <Carousel slides={exampleSlides} />;
}

export default Carousel;