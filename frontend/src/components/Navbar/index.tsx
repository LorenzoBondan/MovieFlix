import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTokenData, isAuthenticated } from 'util/auth';
import { removeAuthData } from 'util/storage';
import history from 'util/history';
import { AuthContext } from 'AuthContext';
import './styles.css'

function Navbar () {

    const { authContextData, setAuthContextData } = useContext(AuthContext);

    useEffect(() => {
        if(isAuthenticated()){
          setAuthContextData({
            authenticated: true,
            tokenData: getTokenData()
          })
        }
        else{
          setAuthContextData({
            authenticated: false,
          })
        }
      }, [setAuthContextData]);


      const handleLogoutClick = (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // não há a navegação no link
        
        removeAuthData(); //apagar o token do localStorage -> requests.ts
    
        setAuthContextData({
          authenticated: false,
        })
    
        history.replace('/'); // redireciona pra página home
      }

    return(
        <nav className="navbar navbar-expand-md navbar-dark bg-primary main-nav">
            <div className="container-fluid">
                <Link to="/" className="nav-logo-text">
                    <h4>MovieFlix</h4>
                </Link>

                <div className='nav-login-logout'>
                { authContextData.authenticated && (
                    <button className='btn btn-primary' onClick={handleLogoutClick}>SAIR</button>
                )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;