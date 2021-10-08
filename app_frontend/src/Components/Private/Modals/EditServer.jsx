import { Component } from "react";
import axios from "axios";

class EditServer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            oldPath: this.props.sPath,
            serverPath: ""
        }
    }

    submitHandle = (e) => {
        e.preventDefault();
        axios.post(`http://${Base.getIp()}:${Base.getPort()}/editServer`, this.state)
            .then(res => {
                window.location.replace("/dashboard");
            })
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render = () => {
        return (
            <div className="modal animate_animated animate__bounceIn" id="editServer">
                <div className="modal-dialog modal-dialog-centered text-center">
                    <div id="editSserverModal" className="modal-content">
                        <div className="container">
                            <div className="modal-header">
                                <h5>Edit server</h5>
                                <button className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form method="post" id="formModal" onSubmit={this.submitHandle}>
                                    <i className="fas fa-server fa-2x"></i>
                                    <br />
                                    <span>{this.state.oldPath}</span>
                                    <input type="password" name="serverPath" id="serverPath" placeholder="New path..." value={this.state.serverPath} onChange={this.changeHandler} required />
                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-danger">Submit</button>
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

export default EditServer;