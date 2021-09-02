import { Component } from 'react';
import axios from 'axios';
import Base from './../../../Modules/Base';

class ManageServer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            arrayPath: [],
        }
    }

    componentDidMount = () => {
        axios.post(`http://${Base.getIp()}:${Base.getPort()}/manageServer`)
            .then(res => {
                this.setState({ arrayPath: res.data });
                console.log(this.state.arrayPath[0])
            })
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render = () => {
        return (
            <div className="modal animate_animated animate__bounceIn" id="manageServer">
                <div className="modal-dialog modal-dialog-centered text-center">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Manage ACC Servers</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>-</th>
                                            <th>Path</th>
                                            <th>-</th>
                                            <th>-</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.arrayPath.map((path, i) => {
                                            return (
                                                <tr>
                                                    <td><i className="fas fa-server"></i></td>
                                                    <td>{path}</td>
                                                    <td><div className="dropdown">
                                                        <button className="btn-small btn-secondary dropdown-toggle" type="button" id="dropDown" data-bs-toggle="dropdown" aria-expanded="false">
                                                            Actions
                                                        </button>
                                                        <ul className="dropdown-menu" aria-labelledby="dropDown">
                                                            <li><a className="dropdown-item" href="#">Edit</a></li>
                                                            <li><a className="dropdown-item" href="#">Delete</a></li>
                                                        </ul>
                                                    </div></td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </table>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        )
    }
}

export default ManageServer;