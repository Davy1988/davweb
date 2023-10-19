import { Metadata } from 'next';
import GallerySection from '@/components/GallerySection';

export const metadata: Metadata = {
  title: 'Gallery',
};

export default function Gallery() {
  return (
    <>
      <GallerySection />
    </>
  );
}
