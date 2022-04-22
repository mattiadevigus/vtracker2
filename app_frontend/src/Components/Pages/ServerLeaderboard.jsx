import { Component } from 'react';
import Base from '../../Modules/Base';
import Navbar from '../Partials/Navbar';
import Footer from '../Partials/Footer';
import Loader from '../Partials/Loader';
import Chart from './../../Modules/Chart';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ServerLeaderboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            times: [],
            totalDrivers: 0,
            bestTime: "",
            bestSessions: [],
            trackInfo: "",
            usedCars: [],
            bestCarAvg: [],
            avgCars: [],
            aciCount: []
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
                this.setState({ times: res.data[0], bestTime: res.data[1].tim_totalTime, totalDrivers: res.data[2].tim_driverCount, bestSessions: res.data[3], trackInfo: res.data[4], usedCars: res.data[5], bestCarAvg: res.data[6], avgCars: res.data[7], aciCount: res.data[8] });
                setTimeout(() => {
                    document.getElementById("loader").style.display = "none";
                    document.getElementById("normalPage").style.display = "block";
                }, 1000);

                Chart.lineChart("gapFirst", this.state.times);
                Chart.doughnutChart("carUsed", this.state.usedCars);

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
                    <section id="serverSection">
                        <div className="row">
                            <div className="col-md-3 only-desktop">
                                <img id="flagTitle" src={this.state.trackInfo.tra_track} alt="" />
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <h3 id="serverInfo"> {this.state.trackInfo.ses_serverName}</h3>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <h3 id="serverInfo"> {this.state.trackInfo.tra_name}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 only-desktop">
                                <img id="flagTitle" src={this.state.trackInfo.tra_flag} alt="" />
                            </div>
                        </div>
                        <div id="sessionContainer">
                            <table id="sessionList">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Full Name</th>
                                        {/* <th className="only-desktop">Logo</th> */}
                                        <th className="only-desktop">Car</th> 
                                        <th className="only-desktop">S1</th>
                                        <th className="only-desktop">S2</th>
                                        <th className="only-desktop">S3</th>
                                        <th>Time</th>
                                        <th className="only-desktop">Laps</th>
                                        <th>Gap</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.times.map((time, i) => {
                                            let serverName = (window.location.href).split("/")[4];
                                            let track = (window.location.href).split("/")[5];
                                            serverName = serverName.split("#")[0];
                                            track = track.split("#")[0];
                                            let driverLink = "/serverDetail/" + serverName + "/" + track + "/" + time.tim_driverName;
                                            return (
                                                <Link className="linkTable" to={driverLink}>
                                                    <tr>
                                                        <td>{i + 1}</td>
                                                        <td>{time.tim_driverName}</td>
                                                        {/* <td className="only-desktop"><img src={time.car_img} /></td> */}
                                                        <td className="only-desktop">{time.car_name}</td>
                                                        <td className="only-desktop">{((time.tim_sectorOne === this.state.bestSessions.bestSectorOne ? <span className="bestEle">{time.tim_sectorOne}</span> : time.tim_sectorOne))}</td>
                                                        <td className="only-desktop">{(time.tim_sectorTwo === this.state.bestSessions.bestSectorTwo ? <span className="bestEle">{time.tim_sectorTwo}</span> : time.tim_sectorTwo)}</td>
                                                        <td className="only-desktop">{(time.tim_sectorTree === this.state.bestSessions.bestSectorTree ? <span className="bestEle">{time.tim_sectorTree}</span> : time.tim_sectorTree)}</td>
                                                        <td>{(time.tim_totalTime === this.state.bestDriverTime ? <span className="personalBestEle"> {Base.getFullTime((time.tim_totalTime * 1000))}</span> : Base.getFullTime((time.tim_totalTime * 1000)))}</td>
                                                        <td className="only-desktop">{ this.state.aciCount.map(count => {
                                                            if (count.tim_driverName === time.tim_driverName) {
                                                                return count.tim_aciCount < 40 ? <span className="personalBestEle">{count.tim_aciCount}</span> : <span className="baseEle">{count.tim_aciCount}</span>;
                                                            }
                                                        })}/40</td>
                                                        <td>{Base.getGap((this.state.bestTime * 1000), (time.tim_totalTime * 1000))}</td>
                                                    </tr>
                                                </Link>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <div className="only-full-desktop" id="tableFooter">
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
                    <section id="serverSection">
                        <div id="sessionTitle">
                            <div className="row">
                                <div className="col-12">
                                    <h1>DETAILS</h1>
                                </div>
                            </div>
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
{/*                             <br /><br />
                            <div className="row">
                                <div className="col-lg-3"></div>
                                <div className="col-12col-lg-6">
                                    <h1>{this.state.bestCarAvg.car_name}</h1>
                                    <hr />
                                    <h3 id="statSession">BEST CAR</h3>
                                </div>
                                <div className="col-lg-3"></div>
                            </div> */}
                        </div>
                    </section>
                    <section id="chartSection">
                        <div id="sessionTitle">
                            <i className="fas fa-poll-h"></i>
                            <hr />
                            <h1>STATS</h1>
                        </div>
                        <div id="chartContainer">
                            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <canvas id="gapFirst"></canvas>
                                        <hr />
                                        <h5>GAP FROM THE FIRST DRIVER</h5>
                                        <span id="chartDescription">Graphical representation of the gap between the first driver and all of the following</span>
                                    </div>
                                    <div class="carousel-item">
                                        <canvas id="carUsed"></canvas>
                                        <hr />
                                        <h5>USED CARS</h5>
                                        <span id="chartDescription">Graphical representation of the number of cars used grouped by models</span>
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </section>
                    <Footer />
                </div>
            </div >
        )
    }
}

export default ServerLeaderboard;