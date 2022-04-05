import { useParams } from 'react-router';
import Explore from 'components/UI/organisms/Home/Explore';
import { useNftContext } from 'context/NftContext';
import { useEffect, useState } from 'react';
import { ArtistsType } from 'types/artists';
import { InformationNft } from 'seabug-sdk/src/common';

interface ArtistParam {
  artistId: string;
}

const ArtistPage = () => {
  const { artistId } = useParams<ArtistParam>();
  const [artist, setArtist] = useState<ArtistsType.Artist>();

  // TODO: Move into NftContext
  const [artistNfts, setNfts] = useState<InformationNft[]>([]);

  const { images, nfts, artists, search } = useNftContext();

  const getArtist = () => {
    // TODO: get artist by pubKeyHash
    const newArtist = artists.list.find((item) => item.id === artistId);
    setArtist(newArtist);
  };

  const getArtistNfts = () => {
    // TODO: Move into NftContext (and memoize?)
    const newNfts = nfts.list.filter(
      (items) => items.author.pubKeyHash === artist?.pubKeyHash
    );
    setNfts(newNfts);
  };

  useEffect(() => {
    getArtist();
    getArtistNfts();
  }, [artistId, artist]);

  return (
    <div>
      <h2>{artist?.name}</h2>
      <Explore
        showFilterButtons={false}
        getImageByNftId={images.getByNftId}
        nfts={artistNfts}
      />
    </div>
  );
};

export default ArtistPage;
