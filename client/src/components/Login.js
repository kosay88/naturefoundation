import React, { Component } from 'react';
import axios from 'axios';
import MapContainer from './Map';

axios.defaults.withCredentials = true;

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      email:"",
      error: null
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler(e){
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  submitHandler(e){
    e.preventDefault();
    axios
    .post('http://localhost:8000/api/login',this.state)
    .then(res=>{
      if (res.data.error) {
        return this.setState({ error: res.data.message });
      }
      if (res.data.errors) {
        return this.setState({ valerrors: res.data.errors });
      }
      return (window.location = "/mainpage");
    });
  }

  render() {
    return(
      <div className="login">
       {this.state.error && <p>{this.state.error}</p>}
      <div className="home">
        <form className="form" onSubmit={this.submitHandler}>
        <h2>Take a look at your piece of rainforest</h2>
        <br/>
        <p>Are you one of our heros and adopted a square meter of costa rica rainforest? Fly to it and explore!</p>
        <br/>
          <input
            type="email"
            placeholder="email"
            onChange={this.changeHandler}
            name="email"
            id="email"
          />
          <br/>
          <input
            type="password"
            placeholder="password"
            onChange={this.changeHandler}
            name="password"
            id="password"
          />
          <br/>
          <button id="blog" type="submit">Login</button>
          <br/>
        <br/>
        <br/>
          <p>ADOPT A SQUARE METER FOR ONLY &euro;2,50</p>
        </form>
      </div>
      </div>
        );
  }
}
export default Login;
