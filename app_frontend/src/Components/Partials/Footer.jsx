import { Component } from 'react';

class Footer extends Component {
    render = () => {
        return (
            <footer>
                <div className="container">
                    <h5>Created by Mattia Devigus</h5>
                    <div className="col">
                        <a target="_blank" rel="noreferrer" href="https://it.reactjs.org/">
                            <i className="fa-2x fab fa-react"></i>
                        </a>
                        <a target="_blank" rel="noreferrer" href="https://nodejs.org/it/">
                            <i className="fa-2x fab fa-node"></i>
                        </a>
                        <a target="_blank" rel="noreferrer" href="https://www.chartjs.org/">
                            <i className="fa-2x fas fa-chart-area"></i>
                        </a>
                        <a target="_blank" rel="noreferrer" href="https://www.npmjs.com/package/better-sqlite3">
                            <i className="fa-2x fas fa-database"></i>
                        </a>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;