import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post';
import MapContainer from './Map';

class Mainpage extends Component {
  constructor(props){
    super(props);
    this.state={
      name:"",
      size:null,
      lat:null,
      lng:null,
      isloggedin:true
    };

    this.getArea();
    axios
    .get("http://localhost:8000/api/isloggedin")
    .then(res => {
      if(!res.data){
        return this.setState({isloggedin: false})
      }
    })
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.getArea = this.getArea.bind(this);
  }

  getArea() {
    axios
    .get("http://localhost:8000/api/showposts")
    .then(posts => this.setState({posts: posts.data}));
  }

  submitHandler(e){
    e.preventDefault();
    axios
    .post("http://localhost:8000/api/addpost", { post: this.state.post })
    .then(res => {
      this.setState({ post: "" });
      this.getArea();
    });
  }

  changeHandler(e){
    this.setState({ post: e.target.value });
  }

  render() {
    return this.state.isloggedin ? (
      <div>
      <div>
      <MapContainer />
      </div>

      <div className="mainpage">
        <div className="areas">

        {this.state.posts && this.state.posts.map(post=> {
          let userName= " ";
          if (this.name !== post.user.name){
            this.name = post.user.name;
            userName = "Hello " + this.name;
          }
          return (
            <div
            key={post._id}>
               <h4>{userName}</h4>
               <div className="area">
                <Post getArea={this.getArea} key={post._id} info={post}/>
               </div>
              </div>
            )
          })}
          <br/>
      <p>This are your pieces of adopted rainforest, Take a look.</p>
      <button
      id="logout"
       onClick={() =>
        axios
        .get("http://localhost:8000/api/logout")
        /*.then(res => this.setState({isloggedin: false}) )} */
        .then(res => (window.location = "/"))} //...or like this
      >log out</button >
      <hr/>
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
export default Mainpage;
