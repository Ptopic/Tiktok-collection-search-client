import { useMutation } from '@tanstack/react-query';
import { IError } from 'interfaces/error';
import { IScrapeCollectionRequest } from 'interfaces/scraper';
import scraperClientRequests from '../scraperClientRequests';

interface IProps {
  onSuccess?: (data: any) => void;
  onError?: (error: IError) => void;
}

const useScrapeCollection = ({ onSuccess, onError }: IProps) => {
  return useMutation({
    mutationFn: ({ playlistUrl }: IScrapeCollectionRequest) =>
      scraperClientRequests.scrapeCollection({
        playlistUrl,
      }),
    onSuccess: (data: any) => {
      console.log('Toast success');
      onSuccess && onSuccess(data);
    },
    onError: (error: IError) => {
      onError && onError(error);
    },
  });
};

export default useScrapeCollection;
