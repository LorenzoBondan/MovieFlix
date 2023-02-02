import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Home from 'pages/Home';
import Catalog from 'pages/Catalog';
import MovieDetails from 'pages/MovieDetails';

// era BrowserRouter antes de inserir o parâmetro history

const Routes = () => (
  <BrowserRouter> 
    <Navbar />
    <Switch>
      
      <Route path="/" exact>
        <Home />
      </Route>

      <Route path="/movies" exact>
        <Catalog />
      </Route>

      <Route path="/movies/:movieId">
        <MovieDetails />
      </Route>

    </Switch>
  </BrowserRouter>
);

export default Routes;