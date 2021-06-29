import axios from 'axios';
import { Component } from 'react';
import Navbar from './../Partials/Navbar';
import Base from './../../Modules/Base';
import ChartJS from './../../Modules/Chart';
import { Link } from 'react-router-dom';

class ServerDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            trackInfo: "trackname"
        }
    }

    render = () => {
        return (
            <div>
                <Navbar />
                <section id="sessionDetailSection">
                    <div className="card w3-animate-opacity">
                        <div className="row">
                            <div className="col-12">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-4"></div>
                                        <div className="col-6 col-md-2 serverBodyContent">
                                            <img src="/img/v_icon.png" alt="" />
                                            <h5>{((window.location.href).split("/")[6]).replace("%20", " ")}</h5>
                                        </div>
                                        <div className="col-6 col-md-2">
                                            <img src="/img/flags/italy.png" alt="" />
                                            <h5>{this.state.trackInfo.tra_name}Flag</h5>
                                        </div>
                                        <div className="col-md-4"></div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-12 col-md-12">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12 col-md-4">
                                            <h3>Best Time: 1:29:342</h3>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <h3>Avg time: 1:29:342</h3>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <h3>Total Laps: 39</h3>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 col-md-4">
                                            <h1>S1: </h1>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <h1>S2: </h1>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <h1>S3: </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        )
    }
}

export default ServerDetail;