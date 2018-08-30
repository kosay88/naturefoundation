import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';
import Post from './Post';

export class MapContainer extends Component {
  constructor(props){
    super(props);
    this.state={
      name:"",
      size:null,
      markers:[],
      isloggedin:true,
    };

    this.getArea();
    axios
    .get("http://localhost:8000/api/isloggedin")
    .then(res => {
      if(!res.data){
        return this.setState({isloggedin: false})
      }
    })
    this.getArea = this.getArea.bind(this);
  }
  getArea() {
    axios
    .get("http://localhost:8000/api/showarea")
    .then(markers => this.setState({markers: markers.data}));
  }

  render() {
    var markers = this.state.markers
    var icon = this.state.icon
    return (
      <div className="map">

      <Map google={this.props.google}

      initialCenter={{
         lat: 9.826291,
         lng: -83.2259
       }}

      style={{ width: 50+'%', margin: 0, padding: 0 }}
       zoom={11}>

       {this.state.isloggedin == true ? markers.map((req, key) => {
         return (<Marker position={req}/>)
       }) :null}

      </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCZtsUY6MQ1y6cwNTymqaDaeRl-Knfg834")
})(MapContainer)
