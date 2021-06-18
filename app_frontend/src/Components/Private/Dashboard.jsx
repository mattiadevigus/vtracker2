import { Component } from 'react';
import Navbar from '../Partials/Navbar';
import Footer from '../Partials/Footer';

class Dashboard extends Component {
    render = () => {
        return (
            <div>
                <Navbar />
                <section id="dashboardSection">
                    <div className="container row">
                        <div className="col-4 col-lg-6">
                            <div className="list-group" id="list-tab" role="tablist">
                                <a className="list-group-item list-group-item-action active" id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" aria-controls="list-home">Vtracker</a>
                                <a className="list-group-item list-group-item-action" id="list-profile-list" data-bs-toggle="list" href="#list-profile" role="tab" aria-controls="list-profile">First Start</a>
                                <a className="list-group-item list-group-item-action" id="list-messages-list" data-bs-toggle="list" href="#list-messages" role="tab" aria-controls="list-messages">Beta</a>
                            </div>
                        </div>
                        <div className="col-8 col-lg-6">
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list"><img className="only-desktop" src="/img/helmet.png" alt="vtlogo" /><hr className="only-desktop" /><h5>Welcome user! If you are here, it means that you are the admin of this beautiful server! First of all I want to thank you for choosing this little program. I'm happy! Now, if you continue in the next slides, you should understand how it works, otherwise you can very well ask me. But get busy first, you won't want to interrupt my relaxation XD</h5></div>
                                <div className="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list"><i className="fas fa-users-cog fa-3x"></i><h5>So this is your first start. Okay, have you changed your login credentials yet? No? What are you waiting for? Open your config.json file and edit them to your liking. Don't worry, your username and password are safe: =)</h5> <hr /> <i class="fas fa-list fa-3x"></i><h5>Now it's time to set the ACC Server results folder path. To do this, open the config.json file again and paste the path. Easy isn't it?</h5></div>
                                <div className="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list"><i className="fas fa-info fa-3x"></i><h5>In this first beta release, I want to make sure the basic functions are correct and there are no easily fixed bugs now. So I ask you to
                                    <hr />
                                    <ul>
                                        <li>Ride on the tracks of your choice (Not all of them will have a flag and layout)</li>
                                        <li>Ride in different track conditions on the same track in different sessions</li>
                                        <li>Carry out competition steps in FP</li>
                                        <li>Sessions with multiple cars and drivers</li>
                                        <li>Provide feedback on the webapp and tracking system</li>
                                    </ul>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="dashboardSection">
                    <i className="fa-4x fas fa-sync fa-spin"></i>
                    <h5>INCOMING</h5>
                </section>
                <Footer />
            </div>
        )
    }
}

export default Dashboard;