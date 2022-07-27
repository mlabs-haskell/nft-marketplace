import { useContext, useEffect } from 'react';
import { NftContext } from 'context/NftContext';
import Auction from 'components/UI/organisms/Home/Auction';
import Explore from 'components/UI/organisms/Home/Explore';
import Header from 'components/UI/organisms/Home/Header';

const Home = () => {
  const { artists, nfts, common, search } = useContext(NftContext);

  useEffect(() => {
    search.setText('');
    if (nfts.list.length === 0) common.fetchAll();
  }, []);

  return (
    <div>
      <Header artists={artists.listRandomized} />
      {nfts.getLiveAuctionList().length > 0 && <Auction />}
      <Explore
        showFilterButtons
        nftImages={nfts.withImages}
        nftsFetchStatus={nfts.fetchStatus}
      />
    </div>
  );
};

export default Home;
