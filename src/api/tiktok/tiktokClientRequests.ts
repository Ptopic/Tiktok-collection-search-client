import { withClientRequest } from '@api/requestBuilder/withClientRequest';
import { getTikTokOembed } from './requests';

const tiktokClientRequests = {
  getTikTokOembed: withClientRequest(getTikTokOembed),
};

export default tiktokClientRequests;
