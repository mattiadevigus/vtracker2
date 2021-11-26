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
                            <h5>2.2.1</h5>
                            <div className="container">
                                <ul>
                                    <li>Added BMW's Update Car</li>
                                    <li>Fixed an issue where the Hungarian layout was not displaying correctly</li>
                                    <li>Tracks are now no longer split by year due to the ACC Server update</li>
                                    <li>Removed best car stat in server leaderboard</li>
                                </ul>
                            </div>
                            <h5>2.2</h5>
                            <div className="container">
                                <ul>
                                    <li>Introduced a Multiserver system: Now you can add more ACC servers via the admin area</li>
                                    <li>Re-created the server section in the admin area</li>
                                    <li>Introduced the possibility to modify or delete the ACC servers through the admin area</li>
                                    <li>Fixed an issue where an incorrect best car was displayed (Server Leaderboard)</li>
                                    <li>Changed the layout of the Silverstone circuit with the new one</li>
                                    <li>Fixed an issue where the Zandvoort layout was not displaying correctly</li>
                                    <li>Minimal graphical improvements</li>
                                </ul>
                            </div>
                            <hr />
                            <h5>2.1</h5>
                            <div className="container">
                                <ul>
                                    <li>Fixed an issue where you had to log back in after changing the path in the private area</li>
                                    <li>Fixed a problem with reading files on linux</li>
                                    <li>Fixed an issue where strange characters were shown in the names of drivers</li>
                                    <li>Removed some console messages used for the beta</li>
                                    <li>Added a message to the console for each file read</li>
                                    <li>Recreated a runnable for linux</li>
                                    <li>Minimal graphical improvements</li>
                                </ul>
                            </div>
                            <hr />
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