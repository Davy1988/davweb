'use client';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import InputText from '@/components/InputText';
import Loading from '@/components/Loading';
import { useToast } from '@/components/ui/use-toast';

import {
  contactFormSchema,
  FormContactSchemaType,
} from '@/lib/validations/ContactForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useColorValue } from '@/hooks/useColor';

export default function ContactSection() {
  useColorValue({ primary: '#ffffff', secondary: '#ffffff', bg: '#3a41e4' });
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
    <section className='flex min-h-full flex-col content-center items-center justify-center pt-0 sm:pt-8'>
      <div className='relative z-0 flex animate-fade-right flex-col justify-center gap-2 animate-duration-[1000] animate-ease-linear'>
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
      </div>
    </section>
  );
}
