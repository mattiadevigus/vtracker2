import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Base from './../../../Modules/Base';
import Path from './Path';

class Server extends Component {
    render = () => {
        return (
            <div className="modal animate_animated animate__bounceIn" id="server">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Servers settings</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-12">
                                    <Link data-bs-toggle="modal" data-bs-target="#path"><i className="fas fa-pencil-alt"></i> Change the results folder path</Link>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
                <Path />
            </div>
        )
    }
}

export default Server;