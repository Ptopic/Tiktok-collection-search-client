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
    onError: (error) => {
      console.log(error);
      setIsLoading(false);
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
            <h1 className='text-center text-4xl font-bold'>
              Tiktok collection viewer
            </h1>
            {!isLoading ? (
              <>
                <div className='lg:px-0lg:max-w-md flex w-full items-center justify-center gap-2 px-4'>
                  <div className='flex w-full flex-col gap-2'>
                    <Input
                      name='playlistUrl'
                      placeholder='https://vm.tiktok.com/123123123/'
                      type='text'
                      error={errors.playlistUrl?.message as string}
                      register={register('playlistUrl')}
                      disabled={isLoading}
                    />
                  </div>
                  <button
                    className='bg-blue-500 rounded-md border border-black p-2 text-black'
                    type='submit'
                  >
                    View
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
