import { Component } from 'react';
import Base from '../../Modules/Base';
import Navbar from '../Partials/Navbar';
import Loader from '../Partials/Loader';
import axios from 'axios';

class ServerLeaderboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            times: [],
            totalDrivers: 0,
            bestTime: "",
            bestSessions: [],
            trackInfo: ""
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);

        let id = (window.location.href).split("/");
        let server = id[4];
        let track = id[5];

        console.log(`http://${Base.getIp()}:${Base.getPort()}/serverLeaderboard/${server}/${track}`)

        document.getElementById("normalPage").style.display = "none";
        axios.post(`http://${Base.getIp()}:${Base.getPort()}/serverLeaderboard/${server}/${track}`)
            .then((res) => {
                console.log(res);
                this.setState({ times: res.data[0], bestTime: res.data[1] });
                setTimeout(() => {
                    document.getElementById("loader").style.display = "none";
                    document.getElementById("normalPage").style.display = "block";
                }, 1000);
            })
    }

    render = () => {
        return (
            <div>
                <div id="loader">
                    <Loader />
                </div>
                <div id="normalPage">
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
                                        <th>Car</th>
                                        <th className="only-desktop">S1</th>
                                        <th className="only-desktop">S2</th>
                                        <th className="only-desktop">S3</th>
                                        <th>Time</th>
                                        <th className="only-desktop">Gap</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.times.map((time, i) => {
                                            return (
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{time.tim_driverName}</td>
                                                    <td>{time.tim_carModel}</td>
                                                    <td className="only-desktop">{((time.tim_sectorOne === this.state.bestSessions.bestSectorOne ? <span className="bestEle">{time.tim_sectorOne}</span> : time.tim_sectorOne))}</td>
                                                    <td className="only-desktop">{(time.tim_sectorTwo === this.state.bestSessions.bestSectorTwo ? <span className="bestEle">{time.tim_sectorTwo}</span> : time.tim_sectorTwo)}</td>
                                                    <td className="only-desktop">{(time.tim_sectorTree === this.state.bestSessions.bestSectorTree ? <span className="bestEle">{time.tim_sectorTree}</span> : time.tim_sectorTree)}</td>
                                                    <td>{(time.tim_totalTime === this.state.bestDriverTime ? <span className="personalBestEle"> {Base.getFullTime((time.tim_totalTime * 1000))}</span> : Base.getFullTime((time.tim_totalTime * 1000)))}</td>
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
                </div>
            </div>
        )
    }
}

export default ServerLeaderboard;