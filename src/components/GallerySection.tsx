'use client';
import Carousel from '@/components/carousel/Carousel';
import { useColorValue } from '@/hooks/useColor';

export default function GallerySection() {
  useColorValue({ primary: '#ffffff', secondary: '#ffffff', bg: '#3a41e4' });
  const images: { image: string; name?: string; stack?: string }[] = [
    {
      image: '/images/gallery/mma_gym.png',
      name: 'MMA GYM YOEL BOX.',
      stack: 'Stack: Flutter',
    },
    {
      image: '/images/gallery/tarifa.png',
      name: 'TARIFA',
      stack: 'Stack: Angular, Capacitor',
    },
    {
      image: '/images/gallery/colton.png',
      name: 'Colton Club',
      stack: 'Stack: Nuxt, Pinia, MetaMask',
    },
    {
      image: '/images/gallery/Hipal.png',
      name: 'Hipal',
      stack: 'Stack: Flutter, NestJS',
    },
    {
      image: '/images/gallery/ays.png',
      name: 'Araujo y Segovia',
      stack: 'Stack: Angular, FastAPI',
    },
    {
      image: '/images/gallery/pb.png',
      name: 'Kit components',
      stack: 'Stack: Nuxt, Pinia, Vitest',
    },
  ];
  return (
    <>
      <main className='relative flex min-h-full animate-fade-right flex-col justify-start py-5 animate-duration-[1000] animate-ease-linear'>
        <h1 className='text-[1rem] text-[var(--secondary)] sm:text-[1.2rem] md:text-[2rem] lg:text-[2rem]'>
          Gallery
        </h1>
        <Carousel images={images} />
      </main>
    </>
  );
}
