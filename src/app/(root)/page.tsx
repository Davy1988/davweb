'use client';
import DescriptionSection from '@/components/DescriptionSection';
import AnimateIcons from '@/components/AnimateIcons';
import Chat from '@/components/chat/Chat';
import { useColorValue } from '@/hooks/useColor';
export default function Home() {
  useColorValue({ primary: '#ffffff', secondary: '#ffffff', bg: '#3a41e4' });
  return (
    <main className='item-start my-7 flex min-h-[calc(100%-50px)] flex-row justify-center gap-0 sm:items-center md:items-center md:gap-4 lg:items-center lg:gap-4'>
      <div className='flex-1'>
        <AnimateIcons />
      </div>
      <div className='lg:w-7/12'>
        <DescriptionSection />
      </div>
      <Chat />
    </main>
  );
}
