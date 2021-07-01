import { Component } from 'react';

class Loader extends Component {
    render = () => {
        return (
            <section id="loader">
                <div className="row">
                    <i className="fas fa-circle-notch fa-spin fa-5x loader-spin"></i>
                </div>
            </section>
        )
    }
}

export default Loader;