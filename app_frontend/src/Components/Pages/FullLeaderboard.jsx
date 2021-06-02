import { Component } from 'react';
import Navbar from './../Partials/Navbar';
import Footer from './../Partials/Footer';
import axios from 'axios';
import Base from './../../Modules/Base';

class FullLeaderboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount = () => {
        let track = window.location.href.split("/");
        axios.get(`http://${Base.getIp()}:${Base.getPort()}/fullLeaderboard/${track[4]}`)
            .then((res) => {
                console.log(res);
            })
    }

    render = () => {
        return (
            <div>
                <Navbar />
                <section id="fullLeaderBoardSection">
                    <div id="homeContainer">
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
                                        <th>Detail</th>
                                    </tr>
                                </thead>
                            </thead>
                        </table>
                    </div>
                </section>

            </div>
        )
    }
}

export default FullLeaderboard;