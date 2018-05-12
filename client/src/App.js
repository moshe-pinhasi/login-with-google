import React, { Component } from 'react';
import { BrowserRouter as Router, Route , Switch } from 'react-router-dom'

import axios from 'axios';

import './App.css';

const BASE_URL = 'http://localhost:3030'

axios.defaults.baseURL = BASE_URL

window.axios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});


const Dashbord = () => (
  <div>
    Dashbord
    <div><a href="http://localhost:3030/api/logout">logout</a></div>
  </div>
)
const HomePage = () => <div className="btn"><a href="http://localhost:3030/auth/google">login with google</a></div>


class App extends Component {

  login = () => {
    axios
        .get('/auth/google')
        .then(res => {
          console.log(res.data)
        })
    
    // axios.get('/test').then(res => {
    //   console.log(res.data)
    // })
  }

  render() {
    return (
      <div className="app">

        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/dashbord" component={Dashbord}/>
            </Switch>
          </div>
        </Router>

        {/* <div className="btn">
          {<button onClick={this.login}>Login with google</button>}
        </div> */}
        
      </div>
    );
  }
}

export default App;
