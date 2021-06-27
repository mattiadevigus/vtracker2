import axios from 'axios';
import { Component } from 'react';
import Navbar from './../Partials/Navbar';
import Base from './../../Modules/Base';
import ChartJS from './../../Modules/Chart';
import { Link } from 'react-router-dom';

class ServerDetail extends Component {
    render = () => {
        return (
            <div>
                <Navbar />
                <section id="sessionDetailSection">
                    <i className="fa-4x fas fa-sync fa-spin"></i>
                    <h5>INCOMING</h5>
                    <div className="row">
                        <div id="noserver">
                            <Link to="/"><button className="btn">HOME</button></Link>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default ServerDetail;