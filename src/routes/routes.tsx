import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import FAQ from '../pages/FAQ';
import ItemPage from '../pages/ItemPage';

function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/" children={<Home />} />
        <Route exact path="/itempage" children={<ItemPage/>} />
        <Route exact path="/help" children={<FAQ />} />
      </Switch>
    </div>
  );
}

export default Routes;
