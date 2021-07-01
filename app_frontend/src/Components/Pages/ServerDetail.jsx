import axios from 'axios';
import { Component } from 'react';
import Navbar from './../Partials/Navbar';
import Loader from '../Partials/Loader';
import Base from './../../Modules/Base';
import ChartJS from './../../Modules/Chart';
import { Link } from 'react-router-dom';

class ServerDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            trackInfo: "trackname",
            times: [],
            bestDriverTime: 0,
            bestTime: 0,
            avgSpeed: 0,
            totalLaps: 0
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);

        const serverName = window.location.href.split("/")[4];
        const track = window.location.href.split("/")[5];
        const driverName = window.location.href.split("/")[6];

        document.getElementById("normalPage").style.display = "none";

        axios.post(`http://${Base.getIp()}:${Base.getPort()}/serverDetail/${serverName}/${track}/${driverName}`)
            .then(res => {
                this.setState({ bestDriverTime: res.data[0], bestTime: res.data[1], times: res.data[2], avgSpeed: res.data[3], totalLaps: res.data[4] })
                console.log(res);

                setTimeout(() => {
                    document.getElementById("loader").style.display = "none";
                    document.getElementById("normalPage").style.display = "block";
                }, 1000);
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
                    <section id="sessionDetailSection">
                        <div className="card animate__animated animate__fadeIn">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-3"></div>
                                            <div className="col-6 col-md-3">
                                                <img src="/img/v_icon.png" alt="" />
                                            </div>
                                            <div className="col-6 col-md-3">
                                                <img src={this.state.bestDriverTime.car_img} alt="" />
                                            </div>
                                            <div className="col-md-3"></div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-3"></div>
                                            <div className="col-6 col-md-3 ">
                                                <h1 id="drivername">{(((window.location.href).split("/")[6]).replace("%20", " ")).split("#")[0]}</h1>
                                                <hr />
                                                <span className="baseEle">Driver Name</span>
                                            </div>
                                            <div className="col-6 col-md-3">
                                                <h1>{Base.getGap((this.state.bestDriverTime.tim_totalTime * 1000), (this.state.bestTime.tim_totalTime * 1000))}</h1>
                                                <hr />
                                                <span className="baseEle">Gap to best time</span>
                                            </div>
                                            <div className="col-md-3"></div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-12 col-md-12">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12 col-md-4">
                                                <h3>PERSONAL BEST TIME: <span className="bestEle">{Base.getFullTime(this.state.bestDriverTime.tim_totalTime * 1000)}</span></h3>
                                            </div>
                                            <div className="col-12 col-md-4">
                                                <h3>AVG SPEED: <span className="baseEle">{this.state.avgSpeed}</span> Km/h</h3>
                                            </div>
                                            <div className="col-12 col-md-4">
                                                <h3>TOTAL LAPS: {this.state.totalLaps.tim_driverCount}</h3>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-12 col-md-4">
                                                <h1>S1: {((this.state.bestDriverTime.tim_sectorOne === this.state.bestTime.tim_sectorOne ? <span className="bestEle">{this.state.bestDriverTime.tim_sectorOne}</span> : <span className="personalBestEle">{this.state.bestDriverTime.tim_sectorOne}</span>))}</h1>
                                            </div>
                                            <div className="col-12 col-md-4">
                                                <h1>S2: {((this.state.bestDriverTime.tim_sectorTwo === this.state.bestTime.tim_sectorTwo ? <span className="bestEle">{this.state.bestDriverTime.tim_sectorTwo}</span> : <span className="personalBestEle">{this.state.bestDriverTime.tim_sectorTwo}</span>))}</h1>
                                            </div>
                                            <div className="col-12 col-md-4">
                                                <h1>S3: {((this.state.bestDriverTime.tim_sectorTree === this.state.bestTime.tim_sectorTree ? <span className="bestEle">{this.state.bestDriverTime.tim_sectorTree}</span> : <span className="personalBestEle">{this.state.bestDriverTime.tim_sectorTree}</span>))}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                    <section id="sessionDetailSection">
                        <div id="sessionTitle">
                            <i className="fas fa-poll-h"></i>
                            <hr />
                            <h1>LAPS OF <span className="baseEle">{(((window.location.href).split("/")[6]).replace("%20", " ")).split("#")[0]}</span></h1>
                        </div>
                        <div id="sessionContainer">
                            <table id="sessionList">
                                <thead>
                                    <tr>
                                        <th>Lap</th>
                                        <th>S1</th>
                                        <th>S2</th>
                                        <th>S3</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        this.state.times.map((time, i) => {
                                            return (
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{time.tim_sectorOne}</td>
                                                    <td>{time.tim_sectorTwo}</td>
                                                    <td>{time.tim_sectorTree}</td>
                                                    <td>{(time.tim_totalTime === this.state.bestDriverTime ? <span className="personalBestEle"> {Base.getFullTime((time.tim_totalTime * 1000))}</span> : Base.getFullTime((time.tim_totalTime * 1000)))}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div >
            </div>
        )
    }
}

export default ServerDetail;