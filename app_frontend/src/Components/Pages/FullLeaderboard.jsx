import { Component } from 'react';
import Navbar from './../Partials/Navbar';
import Footer from './../Partials/Footer';
import axios from 'axios';
import Base from './../../Modules/Base';

class FullLeaderboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            totalDrivers: 0,
            bestTime: "",
            bestSessions: [],
            trackInfo: ""
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);
        let track = window.location.href.split("/");
        axios.get(`http://${Base.getIp()}:${Base.getPort()}/fullLeaderboard/${track[4]}`)
            .then((res) => {
                console.log(res);
                this.setState({ data: res.data[0], bestTime: res.data[1].tim_totalTime, totalDrivers: res.data[2].tim_driverCount, bestSessions: res.data[3], trackInfo: res.data[4] });
            })
    }

    render = () => {
        return (
            <div>
                <Navbar />
                <section id="sessionSection">
                    <div id="sessionTitle">
                        <img id="flagTitle" src={this.state.trackInfo.tra_track} alt="" />
                        <hr />
                        <h1>FULL LEADERBOARD</h1>
                    </div>
                    <div id="sessionContainer">
                        <table id="sessionList">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Full Name</th>
                                    <th className="only-desktop">S1</th>
                                    <th className="only-desktop">S2</th>
                                    <th className="only-desktop">S3</th>
                                    <th>Time</th>
                                    <th>Weather</th>
                                    <th className="only-desktop">Gap</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.data.map((time, i) => {
                                        return (
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{time.tim_driverName}</td>
                                                <td className="only-desktop">{((time.tim_sectorOne === this.state.bestSessions.bestSectorOne ? <span className="bestEle">{time.tim_sectorOne}</span> : time.tim_sectorOne))}</td>
                                                <td className="only-desktop">{(time.tim_sectorTwo === this.state.bestSessions.bestSectorTwo ? <span className="bestEle">{time.tim_sectorTwo}</span> : time.tim_sectorTwo)}</td>
                                                <td className="only-desktop">{(time.tim_sectorTree === this.state.bestSessions.bestSectorTree ? <span className="bestEle">{time.tim_sectorTree}</span> : time.tim_sectorTree)}</td>
                                                <td>{(time.tim_totalTime === this.state.bestDriverTime ? <span className="personalBestEle"> {Base.getFullTime((time.tim_totalTime * 1000))}</span> : Base.getFullTime((time.tim_totalTime * 1000)))}</td>
                                                <td className="only-desktop">{(time.ses_weather <= 0 ? <i className="fas fa-sun"></i> : <i className="fas fa-cloud-rain"></i>)}</td>
                                                <td className="only-desktop">{Base.getGap((this.state.bestTime * 1000), (time.tim_totalTime * 1000))}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <div className="only-desktop" id="tableFooter">
                            <h5>OPTIMAL TIME: <span className="bestEle"> {Base.getFullTime((this.state.bestSessions.bestSectorOne * 1000) + (this.state.bestSessions.bestSectorTwo * 1000) + (this.state.bestSessions.bestSectorTree * 1000))} </span> </h5>
                        </div>
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
                <section id="sessionSection2">
                    <div id="sessionTitle">
                        <i className="fas fa-poll-h"></i>
                        <hr />
                        <h1>DETAILS</h1>
                    </div>
                    <div id="sessionContainer">
                        <div className="row">
                            <div className="col-lg-1"></div>
                            <div className="col-6 col-lg-5">
                                <h1 id="statSession" className="bestEle">{Base.getFullTime((this.state.bestTime * 1000))}</h1>
                                <hr />
                                <h3 id="statSession">BEST TIME SESSION</h3>
                            </div>
                            <div className="col-6 col-lg-5">
                                <h1 id="statSession">{this.state.totalDrivers}</h1>
                                <hr />
                                <h3 id="statSession">TOTAL DRIVERS</h3>
                            </div>
                            <div className="col-lg-1"></div>
                        </div>
                        
                    </div>
                </section>

            </div>
        )
    }
}

export default FullLeaderboard;