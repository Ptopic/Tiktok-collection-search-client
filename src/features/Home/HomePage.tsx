'use client';
import useScrapeCollection from '@api/scraper/hooks/useScrapeCollection';
import { FormProvider, useForm } from 'react-hook-form';
import { ScrapePlaylistFormData, scrapePlaylistSchema } from './formSchema';

import LoadingBar from '@components/LoadingBar';
import Input from '@components/ui/input';
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
    <>
      <FormProvider {...methods}>
        <form
          className='m-auto max-w-[600px] rounded'
          onSubmit={handleSubmit(handleScrapeCollection)}
        >
          <div className='flex h-[calc(100vh-100px)] flex-col items-center justify-center gap-2'>
            <h1 className='text-4xl font-bold'>Tiktok web scraper</h1>
            {!isLoading ? (
              <>
                <div className='flex w-full max-w-md items-center justify-center gap-2'>
                  <div className='flex w-full flex-col gap-2'>
                    <Input
                      type='text'
                      {...register('playlistUrl')}
                      value={'https://vm.tiktok.com/ZNeTjnVGd/'}
                      placeholder='Enter a tiktok url'
                    />
                    {errors.playlistUrl && (
                      <p className='text-red-500'>
                        {errors.playlistUrl.message}
                      </p>
                    )}
                  </div>
                  <button
                    className='bg-blue-500 rounded-md border border-black p-2 text-black'
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
    </>
  );
};

export default HomePage;
