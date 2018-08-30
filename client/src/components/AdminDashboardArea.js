import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminNav from './AdminNav';
axios.defaults.withCredentials = true;


class DashboardArea extends Component {
    constructor(props){
        super(props);

        this.state = {
            areas: null,
            loading: true,
            PostClass: null,
            admin:{

            }
        }
    }

    componentDidMount=(e) => {
        axios.get("http://localhost:8000/api/showposts")
        .then((response) => {

            if (response.data.error) {
            this.setState({ loading: false })
            } else {
            this.setState({ areas: response.data, loading: false})
            }
        })
        .catch((error) => {
            console.log(error)
        })


        axios.get('http://localhost:8000/api/admin/isloggedin')
        .then((res) => {
            if (res.data.error) {
                this.setState({ loading: false })
            } else if (res.data.jobTitle === 'Admin' || res.data.jobTitle === 'SuperAdmin') {
                this.setState({ admin: res.data, loading: false })
            } else {
                window.location.href = "/adminlogin"
            }
        });
    }

    render() {
        return this.state.areas ?(
            <div className="admininfo">
                {/* <AdminNav /> */}
                <h1>ALL AREAS INFORMATION</h1>

                <div className="table-responsive-md">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col" colSpan={1}>Size</th>
                                <th scope="col" colSpan={1}>Lat</th>
                                <th scope="col" colSpan={1}>Lng</th>
                                {/* <th scope="col" colSpan={4}>More</th> */}

                            </tr>
                        </thead>
                        <tbody>

                            {this.state.areas && this.state.areas.map(function (area) {
                                console.log(area);
                                return (
                                    <tr key={area._id}>

                                        <td colSpan={1}>{area.size}</td>

                                        <td colSpan={1}>{area.lat}</td>
                                        <td colSpan={3}>{area.lng}</td>

                                        <td><Link className="btn btn-primary" to={`/Addphoto/${area._id}`}>Upload photo</Link></td>
                                        {/* <td><Link className="btn btn-primary" to={`/${area._id}/SingleArticle`}>Bekijk details</Link></td> */}
                                    </tr>
                                )
                            }.bind(this))}
                        </tbody>
                    </table>
                    <br/>
                    <br/>
                <br/>



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
        ):(
            <h1>Loading...</h1>
        ) ;


    }
}
export default DashboardArea;
