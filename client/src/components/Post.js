import React, { Component } from 'react';
import axios from 'axios';
import MapContainer from './Map';
import AreaImg from './AreaImg';
import { Link } from 'react-router-dom'

class Post extends Component {
  constructor(props) {
    super(props);
    this.state ={
    }
  }

  render() {
    var post = this.props.info;
    var lat = this.props.info.lat
    var lng = this.props.info.lng

    return(
      <div className="area">
      <Link key={post.id} to={`/AreaImg/${post._id}`}>
      <div key={post.id}>
        <h5>
          lat: {lat} &nbsp; lng: {lng} &nbsp;&nbsp; size: {post.size} m
        </h5>
      </div>
      </Link>
      </div>
    );
  }
}
export default Post;
