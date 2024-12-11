import CollectionDetailsPage from '@features/Collection/CollectionDetailsPage';

interface IProps {
  params: {
    id: number;
  };
}

const page = ({ params }: IProps) => {
  const collectionId = params.id;
  return <CollectionDetailsPage id={collectionId} />;
};

export default page;
