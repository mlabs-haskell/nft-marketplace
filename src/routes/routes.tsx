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
        <Route exact path="/" component={Home} />
        <Route exact path="/itempage/:nftId">
          <ItemPage type="BUY" />
        </Route>
        <Route exact path="/itempagesell">
          <ItemPage type="SELL" />
        </Route>
        <Route exact path="/help" component={FAQ} />
        <Route exact path="/terms" component={Terms} />
        <Route exact path="/policy" component={Policy} />
        <Route exact path="/artist/:artistId" component={ArtistPage} />
      </Switch>
    </div>
  );
}

export default Routes;
