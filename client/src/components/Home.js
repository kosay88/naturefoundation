import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import MapContainer from './Map';

class Home extends Component {
  render() {
    return(
      <div>
        <div>
        <MapContainer />
        </div>
        <div>
          <Login/>
        </div>
      </div>
    );
  }
}
export default Home;
