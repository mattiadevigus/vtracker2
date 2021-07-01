import { Component } from 'react';
import Navbar from '../Partials/Navbar';
import Footer from '../Partials/Footer';
import { Link } from 'react-router-dom';

class Dashboard extends Component {

    componentDidMount = () => {
        if (sessionStorage.getItem("token") === null) {
            window.location.replace("/login");
        }
    }

    render = () => {
        return (
            <div>
                <Navbar />
                <section id="dashboardSection" className="animate__animated animate__fadeIn">
                    <div id="sessionTitle">
                        <h1>PRIVATE AREA</h1>
                    </div>
                    <div className="row w-100">
                        <div className="col-12 col-md-4">
                            <Link to="/">
                                <i className="fas fa-users-cog fa-8x"></i>
                                <h5>Admin Settings</h5>
                                <div className="showOnHover">
                                    <span>Set the user profile to your liking</span>
                                </div>
                            </Link>
                        </div>
                        <div className="col-12 col-md-4">
                            <Link to="/">
                                <i className="fas fa-cogs fa-8x"></i>
                                <h5>Server settings</h5>
                                <div className="showOnHover">
                                    <span>Manage, modify and configure your server</span>
                                </div>
                            </Link>
                        </div>
                        <div className="col-12 col-md-4">
                            <Link onClick={function () {
                                sessionStorage.removeItem("token");
                                window.location.replace("/");
                            }}>
                                <i className="fas fa-sign-out-alt fa-8x"></i>
                                <h5>Logout</h5>
                                <div className="showOnHover">
                                    <span>Return in public area</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>
                <Footer />
            </div >
        )
    }
}

export default Dashboard;