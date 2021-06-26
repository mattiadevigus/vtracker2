import { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './../Partials/Navbar';
import Footer from './../Partials/Footer';
import Loader from '../Partials/Loader';
import Base from '../../Modules/Base';
import axios from 'axios';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            servers: [],
            data: [],
            tracks: []
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);
        document.title = "Vtracker";
        document.getElementById("normalPage").style.display = "none";
        axios.post(`http://${Base.getIp()}:${Base.getPort()}`)
            .then((res) => {
                console.log(res);
                this.setState({ servers: res.data.servers, data: res.data.sessions, tracks: res.data.tracks });
                document.getElementById("loader").style.display = "none";
                document.getElementById("normalPage").style.display = "block";
            });
    }

    render = () => {
        return (
            <div>
                <div id="loader">
                    <Loader />
                </div>
                <div id="normalPage">
                    <Navbar />
                    <section id="homeSection" className="w3-animate-opacity">
                        <div id="homeContainer">
                            <img src="/img/icon.png" alt="" />
                            <hr />
                            <p id="homeDesc">Car session timing system. Powered by Assetto Corsa Competizione Server <br /> Created by <a href="#">Mattia Devigus</a></p>
                            <hr />
                            <h1>BETA 2</h1>
                        </div>
                        <div id="arrowCont">
                            <a href="#2">
                                <div className="arrow">
                                    <span></span>
                                    <span></span>
                                </div>
                            </a>
                            <a name="2"></a>
                        </div>
                    </section>
                    <section id="homeSection2">
                        <div id="homeTitle">
                            <i className="fas fa-clock"></i>
                            <hr />
                            <h1>SERVER LIST</h1>
                        </div>
                        <div id="homeContainer2">
                            <div className="container">
                                <div className="row">
                                    {this.state.servers.map((server, i) => {
                                        return (
                                            <div className="col-12 col-lg-4 serverCol">
                                                <Link id="trackLink" to={"/serverLeaderboard/" + server.ses_serverName + "/" + server.tra_nameCode}>
                                                    <div className="row">
                                                        <div className="col-12 col-md-12">
                                                            <i className="fas fa-server fa-5x"></i>
                                                            <h5>{server.ses_serverName}</h5>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-2"></div>
                                                        <div className="col-6 col-lg-4 colS">
                                                            <img src={server.tra_track} alt="track" />
                                                        </div>
                                                        <div className="col-6 col-lg-4 col-md-4 colS">
                                                            <img src={server.tra_flag} alt="flag" />
                                                        </div>
                                                        <div className="col-lg-2"></div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
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
                    <Footer />
                </div >
            </div>
        )
    }
}

export default App;