import { useMutation } from '@tanstack/react-query';
import { IError } from 'interfaces/error';
import { IScrapeCollectionRequest } from 'interfaces/scraper';
import scraperClientRequests from '../scraperClientRequests';

interface IProps {
  onSuccess?: (data: any) => void;
}

const useScrapeCollection = ({ onSuccess }: IProps) => {
  return useMutation({
    mutationFn: ({ email, playlistUrl }: IScrapeCollectionRequest) =>
      scraperClientRequests.scrapeCollection({
        email,
        playlistUrl,
      }),
    onSuccess: (data: any) => {
      console.log('Toast success');
      onSuccess && onSuccess(data);
    },
    onError: (error: IError) => {
      console.log(error);
      console.log('Toast error');
    },
  });
};

export default useScrapeCollection;
