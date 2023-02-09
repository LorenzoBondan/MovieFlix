import { Switch, Route, Router } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Home from 'pages/Home';
import Catalog from 'pages/Catalog';
import MovieDetails from 'pages/MovieDetails';
import history from 'util/history';
import PrivateRoute from 'components/PrivateRoute';

// era BrowserRouter antes de inserir o parâmetro history

const Routes = () => (
  <Router history={history}>
    <Navbar />
    <Switch>
      
      <Route path="/" exact>
        <Home />
      </Route>

      <PrivateRoute path='/movies'>
        <Route path="/movies" exact>
          <Catalog />
        </Route>

        <Route path="/movies/:movieId">
          <MovieDetails />
        </Route>
      </PrivateRoute>

    </Switch>
  </Router>
);

export default Routes;