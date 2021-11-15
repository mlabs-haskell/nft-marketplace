import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Layout/Footer';
import NavBar from './components/Layout/Nav';
import Routes from './routes/routes';

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes />
      <Footer/>
    </Router>
  );
}

export default App;
