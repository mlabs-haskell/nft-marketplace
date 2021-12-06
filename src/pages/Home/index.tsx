import { useContext, useEffect, useRef, useState } from 'react';
import { NftContext } from 'context/NftContext';
import Auction from 'components/UI/organisms/Home/Auction';
import Explore from 'components/UI/organisms/Home/Explore';
import Header from 'components/UI/organisms/Home/Header';

const Home = () => {
  const {
    images,
    validImages,
    nfts,
    fetchImages,
    fetchNfts,
    validationNftsImages,
  } = useContext(NftContext);

  useEffect(() => {
    const GetImages = async () => {
      try {
        await fetchImages(0, 15);
        await fetchNfts();
      } catch (err) {
        console.log(err);
      }
    };

    GetImages();
  }, []);

  useEffect(() => {
    validationNftsImages();
  }, [nfts]);

  useEffect(() => {
    validationNftsImages();
  }, [images]);

  return (
    <div>
      <Header />
      <Auction />
      <Explore NFTs={validImages} fetchImages={fetchImages} />
    </div>
  );
};

export default Home;
