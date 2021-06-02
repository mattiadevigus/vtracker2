import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from './Components/Index/App';
import Session from './Components/Pages/Session';
import SessionDetail from './Components/Pages/SessionDetail';
import Particles from 'react-particles-js';


let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

ReactDOM.render(
  <React.StrictMode>
    <section id="particleJS">
      {/* <Particsles
        params={{
          particles: {
            enable: true,
            move: {
              radius: 10,
              speed: 1
            },
          },
          color: {
            value: "#15151e"
          }
        }} /> */}
      <Router>
        <Switch>
          <Route exact path="/" component={() => <App />} />
          <Route exact path="/session/:id" component={() => <Session />} />
          <Route exact path="/session/:id/:driver" component={() => <SessionDetail />} />
          <App />
        </Switch>
      </Router>
    </section>
  </React.StrictMode>,
  document.getElementById('root')
);
