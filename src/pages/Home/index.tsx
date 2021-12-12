import { useContext } from 'react';
import { NftContext } from 'context/NftContext';
import Auction from 'components/UI/organisms/Home/Auction';
import Explore from 'components/UI/organisms/Home/Explore';
import Header from 'components/UI/organisms/Home/Header';

const Home = () => {
  const { images, nfts, artists } = useContext(NftContext);

  return (
    <div>
      <Header artists={artists} />
      <Auction />
      <Explore images={images} NFTs={nfts} />
    </div>
  );
};

export default Home;
