import { Route, Switch } from 'react-router-dom';
import Policy from 'pages/Policy';
import ArtistPage from 'pages/ArtistPage';
import Home from '../pages/Home';
import FAQ from '../pages/FAQ';
import ItemPage from '../pages/ItemPage';
import ItemPageSell from '../pages/ItemPageSell';
import Terms from '../pages/Terms';

const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/itempage" component={ItemPage} />
      <Route exact path="/itempagesell" component={ItemPageSell} />
      <Route exact path="/help" component={FAQ} />
      <Route exact path="/terms" component={Terms} />
      <Route exact path="/policy" component={Policy} />
      <Route exact path="/artist/:artistId" component={ArtistPage} />
    </Switch>
  </div>
);

export default Routes;
