import React, { Component } from 'react';
import { Jumbotron, Form, FormGroup, Label, Col, Input, Container, Button} from "reactstrap";
import Login from "./Login";
import axios from "axios";
import style from "../css/Form.module.css";

 class Signup extends Component {

  state={
    fullname:"",
    username:"",
    error:"",
    message:"",
    register:false

  }

  handleChange = (e)=>{
    return this.setState({[e.target.name]:e.target.value})
   }

onSubmit = (e)=>{
  e.preventDefault();

  const user ={
    fullname: this.state.fullname,
    username:this.state.username
  };

axios.post("https://react-chatter-app.herokuapp.com/users", user)
.then((res)=>{
   console.log(res.data);
   this.setState({register:true});
   this.setState({message:res.data.msg});
  this.setState({fullname:""});
  this.setState({username:""}); 

})
.catch((err)=>{
if(err.response){
return this.setState({error:err.response.data.msg} );
}
})

}
    render() {
        return (
          <div>
            { !this.state.register ?
            <div className={style.form_container}>
              <div className={style.heading}>
                 <h1>Sign Up</h1>
               </div>
             <Container className={style.container}>
               
              <Jumbotron>
                {
                  this.state.register ? <div className={style.error}> 
                  {this.state.message} 
                </div> : <div className={style.error}>
                  {this.state.error} 
                </div> 
                }
               
                
                <Form onSubmit={this.onSubmit}>
      <FormGroup row>
        <Label for="fullname" sm={2} size="lg">Full Name</Label>
        <Col sm={10}>
          <Input onChange={this.handleChange} type="fullname" name="fullname"  value = {this.state.fullname}placeholder="Full Name" bsSize="lg" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="username" sm={2} size="lg">Username</Label>
        <Col sm={10}>
          <Input onChange={this.handleChange}  type="username" name="username" id="usernameExample" placeholder="Username" value = {this.state.username} bsSize="lg" />
        </Col>
      </FormGroup>
      <div style={{textAlign:"center"}}>
      <Button color="primary">Sign Up</Button>
      </div>      

    </Form>
   </Jumbotron>
  
   </Container>
   
       </div> 
       :
       <Login />
              }
       </div>   
        )
    }
}

export default Signup;