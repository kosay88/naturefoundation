import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post';
import MapContainer from './Map';
import { Link } from 'react-router-dom'

class AreaImg extends Component {

  constructor(props){
console.log(props);
    super(props);
    this.state={
      info:"",
      name:"",
      size:null,
      lat:null,
      lng:null,
      isloggedin:true
    };

    this.getOne()

    axios
    .get("http://localhost:8000/api/isloggedin")
    .then(res => {
      if(!res.data){
        return this.setState({isloggedin: false})
      }
    })
    this.changeHandler = this.changeHandler.bind(this);
    this.getOne = this.getOne.bind(this);
  }

  componentDidMount(){
    axios
    .get("http://localhost:8000/api/showposts")
    .then(posts => this.setState({posts: posts.data}));
  }

  getOne() {
    axios
    .get("http://localhost:8000/api/showOne/" + this.props.match.params.id)
    .then(info => this.setState({info: info.data}));
  }
  changeHandler(e){
    this.setState({ post: e.target.value });
  }

  render() {
    var data = this.state.info;
     return this.state.isloggedin ? (
      <div>
      <div>
      <MapContainer />
      </div>

      <div className="info">
      <Link to={'/mainpage'}>Go Back</Link>
      
      <div className="img">

      {this.props.match.params.id == "5b841c612a8189d530bb1cef" ? 
       <img
       id="img" 
       src="http://www.peakpx.com/wallpaper/662/180/39/brown-wooden-trees-in-rainforest-wallpaper.jpg"
       alt="rainforst"></img>
       : (
         <div></div>
       )
      }
      {this.props.match.params.id == "5b841c252a8189d530bb1cee" ? 
         <img
         id="img" 
         src="https://www.desktopbackground.org/p/2012/03/12/357368_natural-real-rainforest-desktop-wallpaper-autumn-by-free-download_1024x768_h.jpg"
         alt="rainforst"></img> 
       : (
         <div></div>
       )
      }
      {this.props.match.params.id == "5b841a462a8189d530bb1ced" ? 
         <img
         id="img" 
         src="https://www.freeimageslive.co.uk/files/images008/rainforest_jungle.jpg"
         alt="rainforst"></img> 
       : (
         <div></div>
       )
      }

       </div>

        <div className="data">
         <h4>lat:{data.lat} / lng:{data.lng}</h4>
         <br/>
        {this.state.posts &&
          this.state.posts.map((post, i)=> {
            let userName= " ";
            if (this.name !== post.user.name){
              this.name = post.user.name;
              userName = "protector: " + this.name;
            }
            
            return (
              <div key={i}>
                <h4>{userName}</h4>
                </div>
            )
          })}
            <br/>
          <h5>SQUARE METERS:{data.size} m</h5>
          <button
           id="logout"
           onClick={() =>
            axios
            .get("http://localhost:8000/api/logout")
            /*.then(res => this.setState({isloggedin: false}) )} */
            .then(res => (window.location = "/"))} //...or like this
          >log out</button >
          </div>
      </div>
      </div>
    ) : (
      <div className="plslogin">
      <div className="pls">
        <h1>Please login</h1>
      <button
       id="logout"
       onClick={() =>
        axios
        .get("http://localhost:8000/api/logout")
        /*.then(res => this.setState({isloggedin: false}) )} */
        .then(res => (window.location = "/"))} //...or like this
      >Go to the login page</button >
      </div>
      </div>
    );
  }
}
export default AreaImg;
