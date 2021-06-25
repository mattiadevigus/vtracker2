import { Component } from 'react';

class Loader extends Component {

    componentDidMount = () => {
        document.getElementById("noserver").style.display = "none";
        setTimeout(() => {
            document.getElementById("noserver").style.display = "block"
        }, 10000)
    }

    render = () => {
        return (
            <section id="loader">
                <div>
                    <div className="row">
                        <i className="fas fa-circle-notch fa-spin fa-5x loader-spin"></i>
                    </div>
                    <div className="row">
                        <div id="noserver" className="w3-animate-opacity">
                            <button onClick={function () {
                                window.location.reload();
                            }} className="btn"><h5>Reload</h5></button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Loader;