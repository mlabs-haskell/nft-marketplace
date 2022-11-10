import { useContext, useEffect } from 'react';
import { NftContext } from 'context/NftContext';
import { useUIContext } from 'context/UIContext';
import { useWalletContext } from 'context/WalletContext';
import Auction from 'components/UI/organisms/Home/Auction';
import Explore from 'components/UI/organisms/Home/Explore';
import Header from 'components/UI/organisms/Home/Header';

const Home = () => {
  const { artists, nfts, nftImages, common, search } = useContext(NftContext);
  const wallet = useWalletContext();
  const { home } = useUIContext();

  useEffect(() => {
    search.setText('');
    if (nfts.list.length === 0) common.fetchAll();
  }, []);

  const getOwnedNftImages = () => {
    if (!wallet.connected?.pkh) return [];

    return nftImages.getByOwner(wallet.connected.pkh);
  };

  // There is currently no difference between what's in a user's collection
  // and what they have on sale (all NFTs in the marketplace are on sale).
  // This should be improved or combined into a single filter.
  const filteredNftImages =
    home.filterState === 'COLLECTION' || home.filterState === 'SALES'
      ? getOwnedNftImages()
      : nftImages.list;

  return (
    <div>
      <Header artists={artists.listRandomized} />
      {nfts.getLiveAuctionList().length > 0 && <Auction />}
      <Explore
        nftImages={filteredNftImages}
        nftsFetchStatus={nfts.fetchStatus}
        showFilterButtons
      />
    </div>
  );
};

export default Home;
