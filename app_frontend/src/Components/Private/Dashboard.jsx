import { Component } from 'react';
import Navbar from '../Partials/Navbar';
import Footer from '../Partials/Footer';
import { Link } from 'react-router-dom';
import Loader from '../Partials/Loader';
import Admin from './Modals/Admin';
import Server from './Modals/Server';
import Credentials from './Modals/ResetDB';
import Base from '../../Modules/Base';

class Dashboard extends Component {

    componentDidMount = () => {
        document.getElementById("normalPage").style.display = "none";

        Base.checkLogin();

        setTimeout(() => {
            document.getElementById("loader").style.display = "none";
            document.getElementById("normalPage").style.display = "block";
        }, 1000);
    }

    render = () => {
        return (
            <div>
                <div id="loader">
                    <Loader />
                </div>
                <div id="normalPage">
                    <Navbar />
                    <section id="dashboardSection" className="animate__animated animate__fadeIn">
                        <div id="sessionTitle">
                            <h1>PRIVATE AREA (WIP)</h1>
                        </div>
                        <div className="row w-100">
                            <div className="col-12 col-md-4">
                                <Link type="button" data-bs-toggle="modal" data-bs-target="#admin">
                                    <i className="fas fa-users-cog fa-8x"></i>
                                    <h5>Admin Settings</h5>
                                    <div className="showOnHover">
                                        <span>Set the user profile to your liking</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-12 col-md-4">
                                <Link data-bs-toggle="modal" data-bs-target="#server">
                                    <i className="fas fa-cogs fa-8x"></i>
                                    <h5>Server Settings</h5>
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
                    <Admin />
                    <Server />
                    <Credentials />
                </div >
            </div>
        )
    }
}

export default Dashboard;