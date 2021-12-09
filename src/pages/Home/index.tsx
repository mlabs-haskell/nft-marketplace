import { useContext, useEffect } from 'react';
import { NftContext } from 'context/NftContext';
import Auction from 'components/UI/organisms/Home/Auction';
import Explore from 'components/UI/organisms/Home/Explore';
import Header from 'components/UI/organisms/Home/Header';

const Home = () => {
  const {
    images,
    nfts,
    fetchImages,
    fetchNfts,
    artists,
    fetchArtists,
    filteredArtist,
  } = useContext(NftContext);

  useEffect(() => {
    const getImages = async () => {
      try {
        await fetchImages();
        await fetchNfts();
        await fetchArtists();
      } catch (err) {
        console.log(err);
      }
    };

    getImages();
  }, []);

  return (
    <div>
      <Header
        artists={filteredArtist.length === 0 ? artists : filteredArtist}
      />
      <Auction />
      <Explore images={images} NFTs={nfts} title="Explore" />
    </div>
  );
};

export default Home;
