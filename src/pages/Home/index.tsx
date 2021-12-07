import Auction from 'components/UI/organisms/Home/Auction';
import Explore from 'components/UI/organisms/Home/Explore';
import Header from 'components/UI/organisms/Home/Header';
import { useEffect } from 'react';
import { useNftContext } from 'context/NftContext';

const Home = () => {
  const { fetchArtists, artists } = useNftContext();

  useEffect(() => {
    fetchArtists();
  }, []);

  return (
    <div>
      <Header artists={artists} />
      <Auction />
      <Explore />
    </div>
  );
};

export default Home;
