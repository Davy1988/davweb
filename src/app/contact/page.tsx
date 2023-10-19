import ContactSection from '@/components/ContactSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
};

export default function Contact() {
  return (
    <>
      <ContactSection />
    </>
  );
}
