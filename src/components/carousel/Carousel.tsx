'use client';
import { useEffect, useRef } from 'react';
import style from './styles.module.css';
import CarouselItem from './CarouselItem';
type Props = {
  images: { image: string; name?: string; stack?: string }[];
};

export default function Carousel(props: Props) {
  const active = useRef<number>(0);
  const count = useRef<number>(0);
  const progress = useRef<number>(0);
  const initialX = useRef<number>(0);
  const move = useRef<boolean>(false);
  const slideCarouselRef = useRef<any | null>(null);
  const porcent = useRef<number>(0);

  useEffect(() => {
    if (slideCarouselRef && slideCarouselRef.current && count.current === 0) {
      count.current = slideCarouselRef.current?.children.length;
      porcent.current = 100 / count.current;
      animateCarousel(porcent.current);
    }
  }, [slideCarouselRef]);

  useEffect(() => {
    document.addEventListener('touchstart', function (e) {
      initialX.current = e.touches[0].clientX;
      move.current = false;
    });
    document.addEventListener('touchend', handleTochEnd);
  }, []);

  const handleTochEnd = (e: any) => {
    if (move.current) return;
    var deltaX = e.changedTouches[0].clientX - initialX.current;
    if (deltaX === 0) return;
    if (deltaX < 0) {
      addProgress();
      move.current = true;
    } else {
      minusProgress();
      move.current = true;
    }
  };
  const animateCarousel = (setProg: number) => {
    if (
      slideCarouselRef.current === null ||
      slideCarouselRef.current === undefined
    )
      return;
    const newProgress = Math.max(0, Math.min(setProg, 100));
    const newActive = Math.floor((newProgress / 100) * (count.current - 1));
    progress.current = newProgress;
    active.current = newActive;
    [].forEach.call(slideCarouselRef.current.children, (item, index) =>
      displayItems(item, index, newActive)
    );
  };

  const addProgress = () => {
    if (progress.current < 100) {
      const addProgress = progress.current + porcent.current;
      animateCarousel(addProgress);
    }
  };
  const minusProgress = () => {
    if (progress.current > porcent.current) {
      const addProgress = progress.current - porcent.current;
      animateCarousel(addProgress);
    }
  };

  const getZindex = (array: any[], index: number) =>
    array.map((_, i) =>
      index === i ? array.length : array.length - Math.abs(index - i)
    );

  const displayItems = (item: any, index: number, active: number) => {
    const zIndex = getZindex([...slideCarouselRef.current?.children], active)[
      index
    ];
    item.style.setProperty('--zIndex', zIndex);
    item.style.setProperty('--active', (index - active) / count.current);
  };

  return (
    <>
      <div className={style.section_carousel}>
        <div className={style.carousel}>
          <div className='pointer-events-auto absolute top-52 z-[40] w-full cursor-pointer pl-20 pr-20'>
            <div className='hidden w-full justify-between gap-5 sm:flex md:flex lg:flex'>
              <div
                onClick={minusProgress}
                className='relative h-16 w-16 rounded-full border-[2px] border-white shadow-lg shadow-indigo-400 transition-all delay-150 hover:scale-110'
              >
                <svg
                  className='absolute left-3 top-3 text-center text-4xl font-bold text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  width='32'
                  height='32'
                  viewBox='0 0 256 256'
                >
                  <path
                    fill='currentColor'
                    d='M164.24 203.76a6 6 0 1 1-8.48 8.48l-80-80a6 6 0 0 1 0-8.48l80-80a6 6 0 0 1 8.48 8.48L88.49 128Z'
                  />
                </svg>
              </div>
              <div
                onClick={addProgress}
                className='relative h-16 w-16 rounded-full border-[2px] border-white shadow-lg shadow-indigo-400 transition-all delay-150 hover:scale-110'
              >
                <svg
                  className='absolute left-3 top-3 text-center text-4xl font-bold text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  width='32'
                  height='32'
                  viewBox='0 0 256 256'
                >
                  <path
                    fill='currentColor'
                    d='m178.83 130.83l-80 80a4 4 0 0 1-5.66-5.66L170.34 128L93.17 50.83a4 4 0 0 1 5.66-5.66l80 80a4 4 0 0 1 0 5.66Z'
                  />
                </svg>
              </div>
            </div>
          </div>
          <div id='carousel-parent' ref={slideCarouselRef}>
            {props.images.map((data, index) => (
              <CarouselItem
                key={index}
                image={data.image}
                name={data.name}
                stack={data.stack}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
