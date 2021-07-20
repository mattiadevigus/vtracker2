import { Component } from 'react';
import { Link } from 'react-router-dom';
import ResetDB from './ResetDB';
import Credentials from './Credentials';

class Admin extends Component {
    render = () => {
        return (
            <div className="modal animate_animated animate__bounceIn" id="admin">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Admin settings</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-12">
                                    <Link data-bs-toggle="modal" data-bs-target="#resetDB"><i className="fas fa-recycle"></i> Reset DB</Link>
                                </div>
                                <div className="col-12">
                                    <Link data-bs-toggle="modal" data-bs-target="#credentials"><i className="fas fa-pencil-alt"></i> Change your credentials</Link>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
                <ResetDB />
                <Credentials />
            </div>
        )
    }
}

export default Admin;