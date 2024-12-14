export interface IVideo {
  id: string;
  videoUrl: string;
  thumbnailUrl: string;
  createdAt: string;
  hashtags: string[];
}

interface ICollectionResponse {
  name: string;
  total: number;
  videos: IVideo[];
}
