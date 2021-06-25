import { Component } from 'react';

class Loader extends Component {
    render = () => {
        return (
            <section id="loader">
                <div>
                    <div className="row">
                        <i class="fas fa-circle-notch fa-spin fa-5x loader-spin"></i>
                    </div>
                </div>
            </section>
        )
    }
}

export default Loader;