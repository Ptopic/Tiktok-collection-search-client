import { IVideo } from 'interfaces/collection';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  videos: IVideo[];
}

const CollectionVideos = ({ videos }: IProps) => {
  return (
    <div className='slider-container'>
      {videos.map((video) => (
        <div className='slider-children'>
          <div
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              height: '100%',
              width: '100%',
            }}
          >
            <Link
              href={video.videoUrl}
              target='_blank'
              className='h-full w-full'
            >
              {video.thumbnailUrl ? (
                <Image
                  src={video.thumbnailUrl}
                  alt={video.id}
                  width={300}
                  height={350}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <p>No image</p>
              )}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollectionVideos;
