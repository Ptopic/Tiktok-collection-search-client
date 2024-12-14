import { withAuthenticatedClientRequest } from '@api/requestBuilder/client/withClientRequest';
import {
  getCollectionById,
  getCollectionHashtags,
  getCollectionVideos,
  scrapeCollection,
} from './requests';

const scraperClientRequests = {
  getCollectionHashtags: withAuthenticatedClientRequest(getCollectionHashtags),
  getCollectionVideos: withAuthenticatedClientRequest(getCollectionVideos),
  scrapeCollection: withAuthenticatedClientRequest(scrapeCollection),
  getCollectionById: withAuthenticatedClientRequest(getCollectionById),
};

export default scraperClientRequests;
