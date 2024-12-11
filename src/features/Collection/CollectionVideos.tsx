import { IVideo } from 'interfaces/collection';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  videos: IVideo[];
}

const CollectionVideos = ({ videos }: IProps) => {
  return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4'>
      {videos.map((video) => (
        <div key={video.id}>
          <Link href={video.videoUrl} target='_blank'>
            {video.thumbnailUrl ? (
              <Image
                src={video.thumbnailUrl}
                alt={video.id}
                width={300}
                height={350}
                style={{ width: '300px', height: '300px', objectFit: 'cover' }}
              />
            ) : (
              <p>No image</p>
            )}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CollectionVideos;
