import { useParams } from 'react-router';
import Explore from 'components/UI/organisms/Home/Explore';
import { useNftContext } from 'context/NftContext';
import { useEffect, useState } from 'react';
import { ArtistsType } from 'types/artists';
import { NftListing } from 'cardano-transaction-lib-seabug';

interface ArtistParam {
  artistId: string;
}

const ArtistPage = () => {
  const { artistId } = useParams<ArtistParam>();
  const [artist, setArtist] = useState<ArtistsType.Artist>();

  // TODO: Move into NftContext
  const [artistNfts, setNfts] = useState<NftListing[]>([]);

  const { images, nfts, artists, search } = useNftContext();

  const getArtist = () => {
    // TODO: get artist by pubKeyHash
    const newArtist = artists.list.find((item) => item.id === artistId);
    setArtist(newArtist);
  };

  const getArtistNfts = () => {
    // TODO: Move into NftContext (and memoize?)
    const newNfts = nfts.list.filter(
      (nft) => nft.metadata.seabugMetadata.authorPkh === artist?.pubKeyHash
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
