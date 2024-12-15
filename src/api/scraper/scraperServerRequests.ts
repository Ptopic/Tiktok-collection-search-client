import { withAuthenticatedServerRequest } from '@api/requestBuilder/server/withServerRequest';
import {
  getCollectionById,
  getCollectionHashtags,
  getCollectionVideos,
  getMyCollections,
  scrapeCollection,
} from './requests';

const scraperServerRequests = {
  getMyCollections: withAuthenticatedServerRequest(getMyCollections),
  getCollectionHashtags: withAuthenticatedServerRequest(getCollectionHashtags),
  getCollectionVideos: withAuthenticatedServerRequest(getCollectionVideos),
  scrapeCollection: withAuthenticatedServerRequest(scrapeCollection),
  getCollectionById: withAuthenticatedServerRequest(getCollectionById),
};

export default scraperServerRequests;
