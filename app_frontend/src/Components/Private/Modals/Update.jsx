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
                            <h5>Beta 4</h5>
                            <div className="container">
                                <ul>
                                    <li>Graphic improvements</li>
                                    <li>Font change</li>
                                    <li>Introduction of the private area algorithm</li>
                                    <li>Introduction of the "What's new" button</li>
                                    <li>Fixed an issue where the car number is displayed on the track leaderboard page and not the model</li>
                                </ul>
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