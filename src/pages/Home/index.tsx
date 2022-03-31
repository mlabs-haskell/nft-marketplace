import { useContext, useEffect } from 'react';
import { NftContext } from 'context/NftContext';
import Auction from 'components/UI/organisms/Home/Auction';
import Explore from 'components/UI/organisms/Home/Explore';
import Header from 'components/UI/organisms/Home/Header';

const Home = () => {
  const { artists, images, nfts, common } = useContext(NftContext);

  useEffect(() => {
    if (nfts.list.length === 0) common.fetchAll();
  }, []);

  return (
    <div>
      <Header artists={artists.listRandomized} />
      {nfts.getLiveAuctionList().length > 0 && <Auction />}
      <Explore
        showFilterButtons
        getImageByNftId={images.getByNftId}
        nfts={nfts.list}
      />
    </div>
  );
};

export default Home;
