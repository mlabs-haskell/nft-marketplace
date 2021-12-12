import { useContext, useEffect } from 'react';
import { NftContext } from 'context/NftContext';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Layout/Footer';
import NavBar from './components/Layout/Nav';
import Routes from './routes/routes';
import './assets/libs/swiper.css';

function App() {
  const { fetchImages, fetchNfts, fetchArtists } = useContext(NftContext);

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
    <Router>
      <NavBar />
      <Routes />
      <Footer />
    </Router>
  );
}

export default App;
