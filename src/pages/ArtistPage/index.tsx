import { useParams } from 'react-router';
import Explore from 'components/UI/organisms/Home/Explore';
import { useNftContext } from 'context/NftContext';

interface ArtistParam {
  artistId: string;
}

const ArtistPage = () => {
  const { artistId } = useParams<ArtistParam>();
  const { nfts, nftImages, artists } = useNftContext();

  const artistIdNum = Number.parseInt(artistId, 10);
  const artist = artists.getById(artistIdNum);
  const artistNftImages = artist
    ? nftImages.getByArtist(artist.pubKeyHash)
    : [];

  return (
    <div>
      <h2>{artist?.name}</h2>
      <Explore
        nftImages={artistNftImages}
        nftsFetchStatus={nfts.fetchStatus}
        showFilterButtons={false}
      />
    </div>
  );
};

export default ArtistPage;
