import React, { Component } from 'react';
import {Link} from "react-router-dom";
import style from "../css/Profile.module.css"
import axios from 'axios';
import {Table, Button} from "reactstrap";

class Profile extends Component {
state={
      users:[],
    status:false,
    name:this.props.store
}

    componentDidMount =()=>{
      axios.get("http://localhost:5000/users")
      .then((res)=>{
          this.setState({users:res.data});
         
      })
     .catch((err)=>{
         if(err.response){
            console.log(err.response.data)
         }
     })
    }
    
    render() {
       
        return (
            <div className={style.profile_container} >
                <div className={style.heading}>
                <h1> <b> {this.state.name}</b></h1>
                </div>
    <div className={style.table}>
    <Table>
      <thead>
        <tr>
          <th>Users</th>
          <th></th>
        </tr>
      </thead>
      {this.state.users.map((user)=>{

      return(
      <tbody key={user._id}>
        <tr>
      <td>{user.username}</td> 
          <td><Link to = {"/message/" + user.username}><Button color="primary">Message</Button></Link></td>
        </tr>
      </tbody>
      )})}
    </Table>
 
    </div>
    
            </div>
          
            
        )
    }
}

export default Profile;


