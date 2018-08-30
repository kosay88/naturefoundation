import React, { Component } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;



class AdminLogin extends Component {

    constructor(props) {
        super(props);
        this.state={
        data:{
            email:'',
            password:''
        },
        error:null
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    submitHandler= (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/admin/login", this.state.data).then((res)=>{
        if (res.data.err) {
        return  this.setState({err:res.data.message})
        }
        window.location.href="/Admin-panel/DashboardAreas";
        });
    }



    changeHandler(e){
        var formData = this.state.data;
        formData[e.target.name] = e.target.value;
        this.setState({
            data : formData
        })

    }


    render() {
        var changeHandler= this.changeHandler;
        return (
            <div className='loginform'>
            <br />
            <br />
            <br />
            <br />

                {this.state.err && <h3>{this.state.err}</h3> }
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                                <input type="email" value={this.state.data.email} name="email" onChange={changeHandler} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                                <input onChange={changeHandler} value={this.state.data.password} name="password" type="password" className="form-control" id="password" placeholder="Password"/>
                    </div>
                    <button id="blog" type="submit" className="btn btn-primary">Aanmelden</button>
                </form>
            </div>
        )
    }
}

    export default AdminLogin;
