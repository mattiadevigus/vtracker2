import { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
    render = () => {
        return (
            <footer>
                <div className="container">
                    <div className="footer-cta pt-3 pb-3">
                        <div className="row">
                            <div className="col-xl-4 col-md-4 mb-30">
                                <div className="single-cta">
                                    <i className="fas fa-crown"></i>
                                    <div className="cta-text">
                                        <h4>Author</h4>
                                        <span>Mattia Devigus</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-4 mb-30">
                                <div className="single-cta">
                                    <i className="fas fa-gamepad"></i>
                                    <div className="cta-text">
                                        <h4>Game</h4>
                                        <span>Assetto Corsa Competizione</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-4 mb-30">
                                <div className="single-cta">
                                    <i className="fab fa-paypal"></i>
                                    <div className="cta-text">
                                        <Link to="https://paypal.me/mattiadevigus?locale.x=it_IT">
                                            <h4>Donate me</h4>
                                            <span>I would really appreciate it :)</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;