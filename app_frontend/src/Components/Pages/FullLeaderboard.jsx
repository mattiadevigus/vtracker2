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
            bestTime: 0
        }
    }

    componentDidMount = () => {
        let track = window.location.href.split("/");
        axios.get(`http://${Base.getIp()}:${Base.getPort()}/fullLeaderboard/${track[4]}`)
            .then((res) => {
                this.setState({ data: res.data[0], bestTime: res.data[1].tim_totalTime });
            })
    }

    render = () => {
        return (
            <div>
                <Navbar />
                <section id="sessionSection">
                    <div id="sessionTitle">
                        <i className="fas fa-poll-h"></i>
                        <hr />
                        <h1>FULL LEADERBOARD</h1>
                    </div>
                    <div id="sessionContainer">
                        <table id="sessionList">
                            <thead>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Full Name</th>
                                        <th className="only-desktop">S1</th>
                                        <th className="only-desktop">S2</th>
                                        <th className="only-desktop">S3</th>
                                        <th>Time</th>
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
                                                    <td>{time.tim_sectorOne}</td>
                                                    <td>{time.tim_sectorTwo}</td>
                                                    <td>{time.tim_sectorTree}</td>
                                                    <td>{(time.tim_totalTime === this.state.bestDriverTime ? <span className="personalBestEle"> {Base.getFullTime((time.tim_totalTime * 1000))}</span> : Base.getFullTime((time.tim_totalTime * 1000)))}</td>
                                                    <td className="only-desktop">{Base.getGap((this.state.bestTime * 1000), (time.tim_totalTime * 1000))}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </thead>
                        </table>
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
                </section>

            </div>
        )
    }
}

export default FullLeaderboard;