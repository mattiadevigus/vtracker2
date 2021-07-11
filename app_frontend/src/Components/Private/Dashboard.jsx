import { Component } from 'react';
import Navbar from '../Partials/Navbar';
import Footer from '../Partials/Footer';
import { Link } from 'react-router-dom';
import Loader from '../Partials/Loader';

class Dashboard extends Component {

    componentDidMount = () => {
        document.getElementById("normalPage").style.display = "none";

        if (sessionStorage.getItem("token") === null) {
            window.location.replace("/login");
        }

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
                            <h1>PRIVATE AREA</h1>
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

                    <div className="modal animate_animated animate__bounceIn" id="admin">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5>Admin settings</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <Link onClick={() => {
                                                if (window.confirm("Proceeding with the reset of the db, all the times and sessions previously saved will be deleted. Proceed?")) {
                                                    alert("Deleted");
                                                }
                                            }}><i className="fas fa-recycle"></i> Reset DB</Link>
                                        </div>
                                        <div className="col-12">
                                            <Link onClick={() => {
                                                let admin = window.prompt("Admin:");
                                                let password = window.prompt("Password:");
                                            }}><i className="fas fa-pencil-alt"></i> Change your credentials</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal animate_animated animate__bounceIn" id="server">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5>Servers settings</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <Link onClick={() => {
                                                let path = window.prompt("Path:");
                                            }}><i className="fas fa-pencil-alt"></i> Change the results folder path</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        )
    }
}

export default Dashboard;