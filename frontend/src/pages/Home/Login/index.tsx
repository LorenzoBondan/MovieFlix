import { Link } from 'react-router-dom';
import {ReactComponent as ImgHome} from 'assets/images/home-image.svg';

import './styles.css';


const Login = () => {
  return (
    <div className='home-container'>

    
    <div className="base-card login-card">

      <h1>LOGIN</h1>
      <form>
        <div className="mb-4">
          <input
            type="text"
            className="form-control base-input"
            placeholder="Email"
            name="username"
          />
        </div>
        <div className="mb-2">
          <input
            type="password"
            className="form-control base-input "
            placeholder="Senha"
            name="password"
          />
        </div>

        <button className="btn btn-primary">
            <h6>FAZER LOGIN</h6>
        </button>
        

      </form>
    </div>

    <div className='content-container'>
        <div className='content-container-text'>
            <h1>Avalie Filmes</h1>
            <p>Diga o que você achou do seu filme favorito</p>
        </div>

        <div className='content-container-image'>
            <ImgHome />
        </div>
    </div>

    </div>
  );
};


export default Login;