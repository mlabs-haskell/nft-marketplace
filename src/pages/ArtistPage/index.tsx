import { useParams } from 'react-router';
import Explore from 'components/UI/organisms/Home/Explore';
import { useNftContext } from 'context/NftContext';
import { useEffect, useState } from 'react';
import { ArtistsType } from 'types/artists';
import { InformationNft } from 'seabug-sdk/src/common';

interface ArtistParam {
  artist_id: string;
}

const ArtistPage = () => {
  const { artist_id } = useParams<ArtistParam>();
  const [artist, setArtist] = useState<ArtistsType.Artist>();
  const [artistNfts, setNfts] = useState<InformationNft[]>([]);
  const { images, nfts, artists } = useNftContext();

  const getArtist = () => {
    const newArtist = artists.find((item) => item.id === artist_id);
    setArtist(newArtist);
  };

  const getArtistNfts = () => {
    const newNfts = nfts.filter(
      (items) => items.owner.pubKeyHash === artist?.pubKeyHash
    );
    setNfts(newNfts);
  };

  useEffect(() => {
    getArtist();
    getArtistNfts();
  }, [artist]);

  return (
    <div>
      <h2>{artist?.name}</h2>
      <Explore images={images} NFTs={artistNfts} />
    </div>
  );
};

export default ArtistPage;
