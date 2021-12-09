import { useParams } from 'react-router';
import Explore from 'components/UI/organisms/Home/Explore';
import { useNftContext } from 'context/NftContext';
import { useEffect, useState } from 'react';
import { ArtistsType } from 'types/artists';

interface ArtistParam {
  artist_id: string;
}

const ArtistPage = () => {
  const { artist_id } = useParams<ArtistParam>();
  const [artist, setArtist] = useState<ArtistsType.Artist>();
  const { images, nfts, artists } = useNftContext();

  const getArtist = () => {
    const newArtist = artists.find((item) => item.id === artist_id);
    setArtist(newArtist);
  };

  useEffect(() => {
    getArtist();
  }, [artist_id]);

  return (
    <div>
      <Explore title={artist?.name} images={images} NFTs={nfts} />
    </div>
  );
};

export default ArtistPage;
