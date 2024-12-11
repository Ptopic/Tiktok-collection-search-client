export interface IVideo {
  id: string;
  videoUrl: string;
  thumbnailUrl: string;
  createdAt: string;
  hashtags: string[];
}

interface ICollectionResponse {
  total: number;
  videos: IVideo[];
}
