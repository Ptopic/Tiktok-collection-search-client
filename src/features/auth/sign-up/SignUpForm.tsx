'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import useSignup from '@api/auth/hooks/useSignup';
import Button from '@components/ui/button';
import { BUTTON_VARIANT } from '@components/ui/button/buttonStyles';
import Input from '@components/ui/input';
import PasswordInput from '@components/ui/input/PasswordInput';
import { setAuthTokens } from '@shared/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const formSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(4, 'Password is required'),
});

const SignUpForm = () => {
  const [serverError, setServerError] = useState('');
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: signUp, isPending } = useSignup({
    onSuccess: async (data) => {
      await setAuthTokens(data);

      router.push('/');
    },
    onError: async (error) => {
      setServerError(error.message);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    signUp({ ...values });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className='flex w-full flex-col items-center justify-center gap-6'
    >
      <div className='flex w-full flex-col items-start justify-center gap-1'>
        <p className='body-small-regular text-gray600'>Create your account.</p>
      </div>

      <div className='flex w-full flex-col gap-4'>
        <Input
          name='email'
          label='E-mail'
          type='email'
          error={form.formState.errors['email']?.message as string}
          register={form.register('email')}
          disabled={isPending}
        />

        <PasswordInput
          name='password'
          label='Password'
          type='password'
          error={form.formState.errors['password']?.message as string}
          register={form.register('password')}
          disabled={isPending}
        />
      </div>

      {serverError && (
        <span className='body-small-regular text-red600'>{serverError}</span>
      )}

      <div className='w-full'>
        <Button className='w-full' type='submit' disabled={isPending}>
          Sign up
        </Button>
      </div>

      <div className='body-small-regular text-gray600 flex w-full flex-row'>
        <p>Already have an account?</p>
        &nbsp;
        <Button
          type='button'
          onClick={() => router.push('/login')}
          variant={BUTTON_VARIANT.LINK}
          disabled={isPending}
          className='!body-small-regular !text-gray600 w-fit underline'
        >
          Log in
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
