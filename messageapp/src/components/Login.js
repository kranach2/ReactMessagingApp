import React, { Component } from 'react';
import { Jumbotron, Form, FormGroup, Label, Col, Input, Container, Button} from "reactstrap";
import axios from "axios";
import Message from "./Message";
import style from "../css/Form.module.css";

class Login extends Component {

  state={
    username:"",
    store:"",
    error:"",
    login:false

  }
  handleChange = (e)=>{
    return this.setState({[e.target.name]:e.target.value})
   }


onSubmit = (e)=>{
  e.preventDefault();

  const user ={
    username:this.state.username
  };

axios.post("https://react-chatter-app.herokuapp.com/user-authenticate", user)
.then((res)=>{
   this.setState({store:res.data});
   //console.log(this.state.store);
   this.setState({login:true});
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
              
            {
              
            !this.state.login ?
            
            <div className={style.form_container}>
              <div className={style.heading}>
                 <h1>Login</h1>
               </div>
             <Container className={style.container}>
               
              <Jumbotron>
                
                <div className={style.error}>
                  {this.state.error} 
                </div> 
             
                <Form onSubmit={this.onSubmit}>
      
                <FormGroup row>
        <Label for="username" sm={2} size="lg">Username</Label>
        <Col sm={10}>
          <Input onChange={this.handleChange}  type="username" name="username" id="usernameExample" placeholder="Username" value = {this.state.username} bsSize="lg" />
        </Col>
      </FormGroup>

      <div style={{textAlign:"center"}}>
      <Button color="primary">Login</Button>
      </div>      

    </Form>
   </Jumbotron>

   </Container>
   </div>
   :
    <Message store={this.state.store}/>
    
    }

    </div> 
   
        );
    
}
 }

export default Login;
