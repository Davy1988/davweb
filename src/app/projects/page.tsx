import { Metadata } from 'next';
import GallerySection from '@/components/ProjectsSection';

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
