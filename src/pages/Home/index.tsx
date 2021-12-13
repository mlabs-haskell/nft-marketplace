import { useContext, useEffect } from 'react';
import { NftContext } from 'context/NftContext';
import Auction from 'components/UI/organisms/Home/Auction';
import Explore from 'components/UI/organisms/Home/Explore';
import Header from 'components/UI/organisms/Home/Header';
import ExploreHeader from 'components/UI/molecules/ExploreHeader';

const Home = () => {
  const { artists, images, nfts, common, filteredArtist } = useContext(NftContext);

  useEffect(() => {
    if (nfts.list.length === 0) common.fetchAll();
  }, []);

  return (
    <div>
      <Header artists={filteredArtist.length === 0 ? artists.list : filteredArtist} />
      {nfts.onAuctionCount > 0 && <Auction />}
      <Explore
        images={images.list}
        getImageByNftId={images.getByNftId}
        nfts={nfts.list}
      />
    </div>
  );
};

export default Home;
