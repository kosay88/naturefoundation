import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      name:"",
      email:"",
      password:"",
      password_con:"",
      userdata: null,
      success: false
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
    .post('http://localhost:8000/api/Register',this.state)
    .then(result=>{
      if(result.data.errors){
        return this.setState(result.data);
      }
      return this.setState({userdata: result.data, errors: null, success:true});
    });
  }

  render() {
    return(
      <div className="register">
      {this.state.success && <p>You are successfully registerated!</p>}
        <form onSubmit={this.submitHandler}>
          <input
            type="text"
            placeholder="name"
            onChange={this.changeHandler}
            name="name"
            id="name"
          />{" "}
          {this.state.errors &&
            this.state.errors.name && (
              <p>{this.state.errors.name.msg}</p>
            )}
          <br/>
          <input
            type="email"
            placeholder="email"
            onChange={this.changeHandler}
            name="email"
            id="emailreg"
          />{" "}
          {this.state.errors &&
            this.state.errors.email && (
              <p>{this.state.errors.email.msg}</p>
            )}
          <br/>
          <input
            type="password"
            placeholder="password"
            onChange={this.changeHandler}
            name="password"
            id="passwordreg"
          />{" "}
          {this.state.errors &&
            this.state.errors.password && (
              <p>{this.state.errors.password.msg}</p>
            )}
          <br/>
          <input
            type="password"
            placeholder="password_con"
            onChange={this.changeHandler}
            name="password_con"
            id="password_con"
          />{" "}
          {this.state.errors &&
            this.state.errors.password_con && (
              <p>{this.state.errors.password_con.msg}</p>
            )}
          <br/>
          <button type="Submit">Register</button>
        </form>
      </div>
    );
  }
}
export default Register;
