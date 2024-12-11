import { withServerRequest } from '@api/requestBuilder/withServerRequest';
import {
  getCollectionHashtags,
  getCollectionVideos,
  scrapeCollection,
} from './requests';

const scraperServerRequests = {
  getCollectionHashtags: withServerRequest(getCollectionHashtags),
  getCollectionVideos: withServerRequest(getCollectionVideos),
  scrapeCollection: withServerRequest(scrapeCollection),
};

export default scraperServerRequests;
