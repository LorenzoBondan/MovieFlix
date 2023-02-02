import { Link } from 'react-router-dom';
import './styles.css'

function Navbar () {
    return(
        <nav className="navbar navbar-expand-md navbar-dark bg-primary main-nav">
            <div className="container-fluid">
                <Link to="/" className="nav-logo-text">
                    <h4>MovieFlix</h4>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;