import { Component } from 'react'; 

class Update extends Component {
    render = () => {
        return (
            <div className="modal animate_animated animate__bounceIn" id="update">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>What's new</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h5>2.0</h5>
                            <div className="container">
                                <ul>
                                    <li>First version of the new Vtracker</li>
                                    <li>Tracker optimization in terms of performance</li>
                                    <li>Breakdown of times based on servers, circuits and sessions</li>
                                    <li>New Dynamic Charts</li>
                                    <li>Statistics for each driver</li>
                                    <li>Private area to configure the VT</li>
                                </ul>
                                <span>Other old version are available on <a target="_blank" href="https://www.racedepartment.com/downloads/vtracker.40161/"><u>Race Department</u></a></span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <a href="mailto:mattycarly02@gmail.com"><button type="button" className="btn btn-danger">Bug</button></a>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Update;