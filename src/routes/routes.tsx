import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import FAQ from '../pages/FAQ';
import ItemPage from '../pages/ItemPage';
import ItemPageSell from '../pages/ItemPageSell';

function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/itempage" component={ItemPage} />
        <Route exact path="/itempagesell" component={ItemPageSell} />
        <Route exact path="/help" component={FAQ} />
      </Switch>
    </div>
  );
}

export default Routes;
