import { withAuthenticatedServerRequest } from '@api/requestBuilder/server/withServerRequest';
import {
  getCollectionHashtags,
  getCollectionVideos,
  scrapeCollection,
} from './requests';

const scraperServerRequests = {
  getCollectionHashtags: withAuthenticatedServerRequest(getCollectionHashtags),
  getCollectionVideos: withAuthenticatedServerRequest(getCollectionVideos),
  scrapeCollection: withAuthenticatedServerRequest(scrapeCollection),
  getCollectionById: withAuthenticatedServerRequest(getCollectionById),
};

export default scraperServerRequests;
