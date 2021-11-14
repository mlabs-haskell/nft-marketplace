import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';

function Routes() {
  return (
    <div>
        <Switch>
          <Route exact path="/" children={<Home/>}/>
        </Switch>
    </div>
  );
}

export default Routes;
