import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from 'components/Util/ScrollToTop';
import Footer from './components/Layout/Footer';
import NavBar from './components/Layout/Nav';
import Routes from './routes/routes';
import './assets/libs/swiper.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <NavBar />
      <Routes />
      <Footer />
    </Router>
  );
}

export default App;
