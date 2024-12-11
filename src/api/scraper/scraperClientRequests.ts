import { withClientRequest } from '@api/requestBuilder/withClientRequest';
import {
  getCollectionHashtags,
  getCollectionVideos,
  scrapeCollection,
} from './requests';

const scraperClientRequests = {
  getCollectionHashtags: withClientRequest(getCollectionHashtags),
  getCollectionVideos: withClientRequest(getCollectionVideos),
  scrapeCollection: withClientRequest(scrapeCollection),
};

export default scraperClientRequests;
