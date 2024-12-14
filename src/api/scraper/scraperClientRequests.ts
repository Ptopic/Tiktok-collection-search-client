import { withAuthenticatedClientRequest } from '@api/requestBuilder/client/withClientRequest';
import {
  getCollectionHashtags,
  getCollectionVideos,
  scrapeCollection,
} from './requests';

const scraperClientRequests = {
  getCollectionHashtags: withAuthenticatedClientRequest(getCollectionHashtags),
  getCollectionVideos: withAuthenticatedClientRequest(getCollectionVideos),
  scrapeCollection: withAuthenticatedClientRequest(scrapeCollection),
};

export default scraperClientRequests;
