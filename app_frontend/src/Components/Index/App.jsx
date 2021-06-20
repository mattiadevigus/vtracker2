import { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './../Partials/Navbar';
import Footer from './../Partials/Footer';
import Base from '../../Modules/Base';
import axios from 'axios';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            tracks: []
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);
        document.title = "Vtracker";

        axios.get(`http://${Base.getIp()}:${Base.getPort()}`)
            .then((res) => {
                console.log(res.data.data);
                this.setState({ data: res.data.data, tracks: res.data.tracks });
            });
    }

    render = () => {
        return (
            <div>
                <Navbar />
                <section id="homeSection" className="w3-animate-opacity">
                    <div id="homeContainer">
                        <img src="/img/icon.png" alt="" />
                        <hr />
                        <p id="homeDesc">Car session timing system. Powered by Assetto Corsa Competizione Server <br /> Created by <a href="#">Mattia Devigus</a></p>
                        <hr />
                        <h1>BETA 1</h1>
                    </div>
                    <div id="arrowCont">
                        <a href="#2">
                            <div className="arrow">
                                <span></span>
                                <span></span>
                            </div>
                        </a>
                    </div>
                </section>
                <a name="2"></a>
                <section id="homeSection2" className="w3-animate-opacity">
                    <div id="homeTitle">
                        <i className="fas fa-clock"></i>
                        <hr />
                        <h1>SESSIONS LIST</h1>
                    </div>
                    <div id="homeContainer2">
                        <table id="sessionList">
                            <thead>
                                <tr>
                                    <th>Server Name</th>
                                    <th>Date</th>
                                    <th>Track</th>
                                    <th className="only-desktop">Weather</th>
                                    <th className="only-desktop">Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.data.map((session, i) => {
                                        return (
                                            <Link className="linkTable" to={`session/${session.ses_id}`}>
                                                <tr>
                                                    <td>{session.ses_serverName}</td>
                                                    <td>{session.ses_creation.split("GMT")[0]}</td>
                                                    <td><img className="only-desktop" src={session.tra_flag} alt="" /> <span className="only-desktop">|</span> <img src={session.tra_track} /></td>
                                                    <td className="only-desktop"> {(session.ses_weather < 0.1 ? <i className="fas fa-sun"></i> : <i className="fas fa-cloud-rain"></i>)} </td>
                                                    <td className="only-desktop">{session.ses_type}</td>
                                                </tr>
                                            </Link>
                                        )
                                    })}
                            </tbody>
                        </table>
                    </div>
                </section>
                <section id="homeSection2">
                    <div id="homeTitle">
                        <i className="fas fa-clock"></i>
                        <hr />
                        <h1>TOTAL RESULTS PER TRACK</h1>
                    </div>
                    <div id="homeContainer2">
                        <div className="container">
                            <div className="row">
                                {this.state.tracks.map((track, i) => {
                                    return (
                                        <div className="col-6 col-lg-4 trackCol">
                                            <Link id="trackLink" to={"/fullLeaderboard/" + track.tra_nameCode}>
                                                <img id="flagCol" src={track.tra_track} alt="track" />
                                                <h5>{track.tra_name}</h5>
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </section>
                <section id="dashboardSection">
                    <i className="fa-4x fas fa-sync fa-spin"></i>
                    <h5>INCOMING</h5>
                </section>
                <Footer />
            </div >
        )
    }
}

export default App;