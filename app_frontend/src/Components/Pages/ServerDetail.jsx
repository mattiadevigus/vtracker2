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
            times: []
        }
    }

    componentDidMount = () => {
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
                    <section id="sessionDetailSection">
                        <div className="card w3-animate-opacity">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card-body">
                                        <img src="/img/v_icon.png" alt="" />
                                        <div className="row">
                                            <div className="col-md-3"></div>
                                            <div className="col-6 col-md-3 ">
                                                <h1 id="drivername">{(((window.location.href).split("/")[6]).replace("%20", " ")).split("#")[0]}</h1>
                                                <hr />
                                                <span className="baseEle">Driver Name</span>
                                            </div>
                                            <div className="col-6 col-md-3">
                                                <h1>+ 3.214</h1>
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
                                                <h3>PERSONAL BEST TIME: <span className="bestEle">1:29:342</span></h3>
                                            </div>
                                            <div className="col-12 col-md-4">
                                                <h3>AVG TIME: 1:29:342</h3>
                                            </div>
                                            <div className="col-12 col-md-4">
                                                <h3>TOTAL LAPS: 39</h3>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-12 col-md-4">
                                                <h1>S1: <span className="personalBestEle">25.321</span></h1>
                                            </div>
                                            <div className="col-12 col-md-4">
                                                <h1>S2: <span className="personalBestEle">25.321</span> </h1>
                                            </div>
                                            <div className="col-12 col-md-4">
                                                <h1>S3: <span className="personalBestEle">25.321</span></h1>
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