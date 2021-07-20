import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Base from './../../../Modules/Base';

class ResetDB extends Component {
    render = () => {
        return (
            <div className="modal animate_animated animate__bounceIn" id="resetDB">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Reset Database</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container text-center">
                                <i className="fas fa-recycle animate__animated animate__backInRight fa-5x center-icon"></i>
                                <h5>Are you sure? All times and sessions will be deleted from the database (To avoid re-reading the same files, also delete the jsons from the results folder)</h5>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={function () {
                                axios.post(`http://${Base.getIp()}:${Base.getPort()}/resetDB`)
                                    .then(res => {
                                        window.location.replace("/dashboard");
                                    })
                            }}>Reset</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResetDB;