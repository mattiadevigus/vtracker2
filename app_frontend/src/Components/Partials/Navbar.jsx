import { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render = () => {
        return (
            <nav className="navbar fixed-top">
                <Link to="/">
                    <img className="navbar-brand" src="/img/helmet.png" alt="logo" />
                </Link>
                <div className="navbar-right justify-content-end">
                    <Link to="/dashboard">
                    <h5><i className="fas fa-user-lock"></i> ADMIN AREA </h5>
                    </Link>
                </div>
            </nav>
        )
    }
}

export default Navbar;