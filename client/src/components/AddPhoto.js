import React, { Component } from "react";
import axios from "axios";


class AddPhoto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
             imgUrl: null
      },
      message: null,
      error: ""
    };
  }

  formHandler = e => {
    var formData = this.state.data;
   
    formData[e.target.name] = e.target.value;
    this.setState({
      data: formData
    });
  };
  imageHandler = event => {
    var formData = this.state.data;
    formData[event.target.name] = event.target.files[0];
    this.setState({ data: formData });
  };
  submitHandler = e => {
    console.log(this.state.data);
    e.preventDefault();
    let formInfo = new FormData();
   
    formInfo.append("imgUrl", this.state.data.imgUrl);
    axios
      .post("http://localhost:8000/api/admin/upload", formInfo)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            data: {
              
                imgUrl: null
            },
            message: "Photo was added successfully.",
            error: ""
          });
        }
      })
      .catch(err => {
        this.setState({ error: "Failure uploaded!" });
      });
  };
  render() {
    return (
      <div className="admininfo">
        <br />
      <div className="imgadmin">
        <p> {this.state.error}</p>
        <p className="text-danger">
          {this.state.message && this.state.message}
        </p>
        <form className="form" onSubmit={this.submitHandler} enctype="multipart/form-data">
        <h3>Add Photo</h3>
          
         
          <br />
          <input
            className="email"
            type="file"
            name="imgUrl"
            onChange={this.imageHandler}
            // id="price"
          />
          {" "}
          <br />
          <hr />
          <button className="btn btn-primary" type="submit">
            Add
          </button>
        <br/>
        <button
          onClick={() => {
            this.props.history.goBack();
          }}
          className="btn btn-info"
          >
          Go Back
        </button>
          </form>
      </div>
      </div>
    );
  }
}

export default AddPhoto;

