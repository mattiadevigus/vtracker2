import { Component } from 'react';

class Footer extends Component {
    render = () => {
        return (
            <footer>
                <div className="container">
                    <i className="fa-2x fab fa-react"></i>
                    <i className="fa-2x fab fa-node-js"></i>
                    <i className="fa-2x fas fa-database"></i>
                    <i className="fa-2x fas fa-chart-bar"></i>
                </div>
            </footer>
        )
    }
}

export default Footer;