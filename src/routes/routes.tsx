import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import ItemPage from '../pages/ItemPage';

function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/" children={<Home />} />
        <Route exact path="/itempage" children={<ItemPage />} />
      </Switch>
    </div>
  );
}

export default Routes;
