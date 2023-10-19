'use client';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import InputText from '@/components/InputText';
import Loading from '@/components/Loading';
import { useToast } from '@/components/ui/use-toast';

import {
  contactFormSchema,
  FormContactSchemaType,
} from '@/lib/validations/contact_form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { setColorValue } from '@/hooks/useColor';

export default function ContactSection() {
  setColorValue({ primary: '#ffffff', secondary: '#ffffff', bg: '#3a41e4' });
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmitSuccessful, setSubmitSuccessful] = useState<boolean>(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormContactSchemaType>({
    resolver: zodResolver(contactFormSchema),
  });

  useEffect(() => {
    reset({
      email: '',
      message: '',
    });
  }, [isSubmitSuccessful]);

  const onSubmit: SubmitHandler<FormContactSchemaType> = async (data) => {
    const { email, message } = data;
    try {
      setLoading(() => true);
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({ email: email, message: message }),
      });
      const { message: msg } = await response.json();
      if (!response.ok) {
        throw new Error(msg);
      }
      setLoading(() => false);
      setSubmitSuccessful(true);
      toast({
        title: 'Congratulations',
        description: msg,
      });
    } catch (error: any) {
      setLoading(() => false);
      toast({
        title: 'Info',
        description: error.message,
      });
    }
  };
  return (
    <section className='flex min-h-full flex-col content-center items-center justify-center gap-8 pt-8'>
      <div className='relative z-0 flex animate-fade-right flex-col justify-center animate-duration-[1000] animate-ease-linear'>
        <h1 className='text-[1rem] text-[var(--secondary)] sm:text-[2rem] md:text-[2rem] lg:text-[2rem]'>
          Please contact me, <br /> it will be a pleasure to assist you.
        </h1>
        <form
          className='flex flex-1 flex-col gap-3'
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputText
            label='Email'
            register={register('email')}
            errors={errors.email}
          />
          <InputText
            label='How can help?'
            register={register('message')}
            errors={errors.message}
          />
          {loading ? (
            <div className='py-4'>
              <Loading />
            </div>
          ) : (
            <Button
              text='Send it'
              disabled={isSubmitting}
              onPress={handleSubmit}
            />
          )}
        </form>
        <div className='flex flex-row gap-6 pb-8 pt-8'>
          <a
            className='group flex flex-row content-center justify-center gap-2 text-white underline-offset-2 hover:underline'
            target='_blank'
            href='https://github.com/Davy1988'
          >
            <svg
              className='cursor-pointer text-current group-hover:scale-125'
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='32'
              viewBox='0 0 256 256'
            >
              <path
                fill='currentColor'
                d='M208.31 75.68A59.78 59.78 0 0 0 202.93 28a8 8 0 0 0-6.93-4a59.75 59.75 0 0 0-48 24h-24a59.75 59.75 0 0 0-48-24a8 8 0 0 0-6.93 4a59.78 59.78 0 0 0-5.38 47.68A58.14 58.14 0 0 0 56 104v8a56.06 56.06 0 0 0 48.44 55.47A39.8 39.8 0 0 0 96 192v8H72a24 24 0 0 1-24-24a40 40 0 0 0-40-40a8 8 0 0 0 0 16a24 24 0 0 1 24 24a40 40 0 0 0 40 40h24v16a8 8 0 0 0 16 0v-40a24 24 0 0 1 48 0v40a8 8 0 0 0 16 0v-40a39.8 39.8 0 0 0-8.44-24.53A56.06 56.06 0 0 0 216 112v-8a58.14 58.14 0 0 0-7.69-28.32ZM200 112a40 40 0 0 1-40 40h-48a40 40 0 0 1-40-40v-8a41.74 41.74 0 0 1 6.9-22.48a8 8 0 0 0 1.1-7.69a43.81 43.81 0 0 1 .79-33.58a43.88 43.88 0 0 1 32.32 20.06a8 8 0 0 0 6.71 3.69h32.35a8 8 0 0 0 6.74-3.69a43.87 43.87 0 0 1 32.32-20.06a43.81 43.81 0 0 1 .77 33.58a8.09 8.09 0 0 0 1 7.65a41.72 41.72 0 0 1 7 22.52Z'
              />
            </svg>
            <span className='hidden pt-1 text-current sm:block md:block lg:block'>
              View Github
            </span>
          </a>
          <a
            className='group flex flex-row content-center justify-center gap-2 text-white underline-offset-2 hover:underline'
            target='_blank'
            href='https://www.linkedin.com/in/davy1988/'
          >
            <svg
              className='cursor-pointer text-current group-hover:scale-125'
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='32'
              viewBox='0 0 256 256'
            >
              <path
                fill='currentColor'
                d='M216 24H40a16 16 0 0 0-16 16v176a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V40a16 16 0 0 0-16-16Zm0 192H40V40h176v176ZM96 112v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm88 28v36a8 8 0 0 1-16 0v-36a20 20 0 0 0-40 0v36a8 8 0 0 1-16 0v-64a8 8 0 0 1 15.79-1.78A36 36 0 0 1 184 140Zm-84-56a12 12 0 1 1-12-12a12 12 0 0 1 12 12Z'
              />
            </svg>
            <span className='hidden pt-1 text-current sm:block md:block lg:block'>
              View Linkedin
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
