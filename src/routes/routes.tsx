import { Route, Switch } from 'react-router-dom';
import Terms from 'pages/Terms';
import Policy from 'pages/Policy';
import ArtistPage from 'pages/ArtistPage';
import Home from '../pages/Home';
import FAQ from '../pages/FAQ';
import ItemPage from '../pages/ItemPage';

function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/itempage/:nftId">
          <ItemPage type="BUY" />
        </Route>
        <Route path="/itempagesell">
          <ItemPage type="SELL" />
        </Route>
        <Route path="/help" element={<FAQ />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/artist/:artistId" element={<ArtistPage />} />
      </Switch>
    </div>
  );
}

export default Routes;
