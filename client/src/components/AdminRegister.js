import React, { Component } from "react";
import axios from "axios";
import AdminNav from './AdminNav';

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const myswal = withReactContent(Swal);

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: "",
                email: "",
                jobTitle: "",
                password: "",
                con_password: ""
            },
            error: {
                name: "",
                email: "",
                jobTitle: "",
                password: "",
                con_password: ""
            },
            admin:{

            },
            success: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(element) {
        var formData = this.state.data;
        formData[element.target.name] = element.target.value;
        this.setState({
            data: formData
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        let _this = this;
        axios
            .post("http://localhost:8000/api/admin/register", this.state.data)
            .then(res => {
                console.log("res", res);
                if (!res.data.errors) {
                    myswal.fire({
                        position: "top-end",
                        type: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                if (res.data.errors) {
                    let mainErrors = res.data.errors;
                    let err_msg = {
                        name: mainErrors.name ? mainErrors.name.msg : "",
                        email: mainErrors.email ? mainErrors.email.msg : "",
                        jobTitle: mainErrors.jobTitle ? mainErrors.jobTitle.msg : "",
                        password: mainErrors.password ? mainErrors.password.msg : "",
                        con_password: mainErrors.con_password
                            ? mainErrors.con_password.msg
                            : ""
                    };
                    _this.setState({
                        error: err_msg,
                        success: ""
                    });
                } else {
                    _this.setState({
                        data: {
                            name: "",
                            email: "",
                            jobTitle: "",
                            password: "",
                            con_password: ""
                        },
                        error: {
                            name: "",
                            email: "",
                            jobTitle: "",
                            password: "",
                            con_password: ""
                        },
                        success: "Thank you for registering"
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                {/* <AdminNav /> */}
                <h1>Admin Toevoegen</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputname">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={this.state.data.name}
                            onChange={this.handleChange}
                            className="form-control"
                            id="exampleInputname"
                            placeholder="Admin name"
                        />
                        <p className="text-danger">{this.state.error.name}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email adres</label>
                        <input
                            type="text"
                            name="email"
                            value={this.state.data.email}
                            onChange={this.handleChange}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-jobTitleribedby="emailHelp"
                            placeholder="Vul email in..."
                        />
                        <p className="text-danger">{this.state.error.email}</p>
                    </div>


                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Passwoord</label>
                        <input
                            type="password"
                            name="password"
                            value={this.state.data.password}
                            onChange={this.handleChange}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Passwoord"
                        />
                        <p className="text-danger">{this.state.error.password}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputConfirmationPassword">
                            Passwoord Bevestigen
            </label>
                        <input
                            type="password"
                            name="con_password"
                            value={this.state.data.con_password}
                            onChange={this.handleChange}
                            className="form-control"
                            id="exampleInputConfirmationPassword"
                            placeholder="Passwoord Bevestigen"
                        />
                        <p className="text-danger">{this.state.error.con_password}</p>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Voeg Admin Toe
          </button>
                </form>
                {this.state.success === "" ? (
                    <p />
                ) : (
                        <p className="text-success">{this.state.success}</p>
                    )}
                <br />
                <br />
            </div>
        );
    }
}

export default Register;
