import { Metadata } from 'next';
import WorkSection from '@/components/WorkSection';

export const metadata: Metadata = {
  title: 'Work',
};

export default function Work() {
  return (
    <>
      <WorkSection />
    </>
  );
}
