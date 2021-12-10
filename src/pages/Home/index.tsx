import { useContext, useEffect } from 'react';
import { NftContext } from 'context/NftContext';
import Auction from 'components/UI/organisms/Home/Auction';
import Explore from 'components/UI/organisms/Home/Explore';
import Header from 'components/UI/organisms/Home/Header';

const Home = () => {
  const {
    images,
    nfts,
    artists,
    fetchImages,
    fetchNfts,
    fetchArtists,
    fetchNft,
  } = useContext(NftContext);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        await fetchImages();
        await fetchNfts();
        await fetchArtists();
      } catch (err) {
        console.log(err);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <Header artists={artists} />
      <Auction />
      <Explore images={images} NFTs={nfts} fetchNft={fetchNft} />
    </div>
  );
};

export default Home;
