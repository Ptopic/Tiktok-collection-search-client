'use client';
import useScrapeCollection from '@api/scraper/hooks/useScrapeCollection';
import { FormProvider, useForm } from 'react-hook-form';
import { ScrapePlaylistFormData, scrapePlaylistSchema } from './formSchema';

import LoadingBar from '@components/LoadingBar';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const HomePage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const { mutate: scrapeCollection } = useScrapeCollection({
    onSuccess: (data) => {
      router.push(`/collection/${data.collectionId}`);
    },
  });

  const methods = useForm<ScrapePlaylistFormData>({
    mode: 'onChange',
    resolver: yupResolver(scrapePlaylistSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = methods;

  const handleScrapeCollection = (values: ScrapePlaylistFormData) => {
    scrapeCollection(values);
    setIsLoading(true);
  };

  useEffect(() => {
    const socket = io('ws://localhost:3002');

    socket.on('scraping-progress', (data: { progress: number }) => {
      setProgress(data.progress);
    });

    return () => {
      socket.disconnect();
    };
  }, [isLoading]);

  return (
    <FormProvider {...methods}>
      <form
        className='m-auto max-w-[600px] rounded'
        onSubmit={handleSubmit(handleScrapeCollection)}
      >
        <div className='flex h-screen flex-col items-center justify-center gap-2'>
          <h1 className='text-4xl font-bold'>Tiktok web scraper</h1>
          {!isLoading ? (
            <>
              <div className='flex w-full max-w-md flex-col gap-2'>
                <input
                  type='text'
                  {...register('email')}
                  value={'test@test.com'}
                  placeholder='Enter your email'
                  className='border-gray-300 w-full max-w-md rounded-md border p-2'
                />
                {errors.email && (
                  <p className='text-red-500'>{errors.email.message}</p>
                )}
              </div>
              <div className='flex w-full max-w-md items-center justify-center gap-2'>
                <div className='flex w-full flex-col gap-2'>
                  <input
                    type='text'
                    {...register('playlistUrl')}
                    placeholder='Enter a tiktok url'
                    className='border-gray-300 w-full rounded-md border p-2'
                  />
                  {errors.playlistUrl && (
                    <p className='text-red-500'>{errors.playlistUrl.message}</p>
                  )}
                </div>
                <button
                  className='bg-blue-500 text-black border-black rounded-md border p-2'
                  type='submit'
                >
                  Scrape
                </button>
              </div>
            </>
          ) : (
            <div className='w-[90%]'>
              <LoadingBar progress={progress} />
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default HomePage;
