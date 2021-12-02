import { useContext, useEffect, useState } from 'react';
import { NftContext } from 'context/auth';
import Auction from 'components/UI/organisms/Home/Auction';
import Explore from 'components/UI/organisms/Home/Explore';
import Header from 'components/UI/organisms/Home/Header';

const Home = () => {
  const { images, fetchImages } = useContext(NftContext);

  useEffect(() => {
    const GetImages = async () => {
      await fetchImages();
    };

    GetImages();
  }, []);

  return (
    <div>
      <Header />
      <Auction />
      <Explore NFTs={images} />
    </div>
  );
};

export default Home;
