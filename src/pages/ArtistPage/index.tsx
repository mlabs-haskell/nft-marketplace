import { useParams } from 'react-router';
import Explore from 'components/UI/organisms/Home/Explore';
import { useNftContext } from 'context/NftContext';
import { useEffect, useState } from 'react';
import { Artist } from 'types/artists';
import { Nft } from 'types/nfts';

interface ArtistParam {
  artistId: string;
}

const ArtistPage = () => {
  const { artistId } = useParams<ArtistParam>();
  const [artist, setArtist] = useState<Artist>();

  // TODO: Move into NftContext
  const [artistNfts, setNfts] = useState<Nft[]>([]);

  const { images, nfts, artists } = useNftContext();

  const getArtist = () => {
    const newArtist = artists.list.find(
      (item) => item.id.toString() === artistId
    );
    setArtist(newArtist);
  };

  const getArtistNfts = () => {
    // TODO: Move into NftContext (and memoize?)
    const newNfts = nfts.list.filter(
      (nft) => nft.metadata.authorPkh === artist?.pubKeyHash
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
        getImageByIpfsHash={images.getByIpfsHash}
        nfts={artistNfts}
        nftsFetchStatus={nfts.fetchStatus}
      />
    </div>
  );
};

export default ArtistPage;
