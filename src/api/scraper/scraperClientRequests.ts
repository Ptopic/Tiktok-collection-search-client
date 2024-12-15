import { withAuthenticatedClientRequest } from '@api/requestBuilder/client/withClientRequest';
import {
  deleteCollection,
  getCollectionById,
  getCollectionHashtags,
  getCollectionVideos,
  getMyCollections,
  scrapeCollection,
} from './requests';

const scraperClientRequests = {
  getMyCollections: withAuthenticatedClientRequest(getMyCollections),
  getCollectionHashtags: withAuthenticatedClientRequest(getCollectionHashtags),
  getCollectionVideos: withAuthenticatedClientRequest(getCollectionVideos),
  scrapeCollection: withAuthenticatedClientRequest(scrapeCollection),
  getCollectionById: withAuthenticatedClientRequest(getCollectionById),
  deleteCollection: withAuthenticatedClientRequest(deleteCollection),
};

export default scraperClientRequests;
