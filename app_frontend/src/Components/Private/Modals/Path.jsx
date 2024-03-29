import { Component } from 'react';
import axios from 'axios';
import Base from './../../../Modules/Base';

class Path extends Component {

    constructor(props) {
        super(props);

        this.state = {
            path: "",
            reset: false
        }
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitHandle = (e) => {
        e.preventDefault();
        axios.post(`http://${Base.getIp()}:${Base.getPort()}/editPath`, this.state)
            .then(res => {
                window.location.replace("/dashboard");
            })
    }

    render = () => {
        return (
            <div className="modal animate_animated animate__bounceIn" id="path">
                <div className="modal-dialog modal-dialog-centered text-center">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Change Path</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <i className="fas fa-user-lock animate__animated animate__backInRight fa-4x center-icon"></i>
                                <br />
                                <span>The changes will also be available on config.json</span>
                                <br />
                                <span>For Windows: \</span>
                                <br />
                                <span>For Linux: /</span>
                                <form method="post" id="formModal" onSubmit={this.submitHandle}>
                                    <input type="text" name="path" id="path" placeholder="Path..." value={this.state.username} onChange={this.changeHandler} required />
                                    <br />
                                    
                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-danger">Submit</button>
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Path;