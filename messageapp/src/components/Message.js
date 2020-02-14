import React, { Component } from 'react';
import io from "socket.io-client";
import style from "../css/Message.module.css";
import {Container, Button, FormGroup, Col, Input} from "reactstrap";
import { uuid } from 'uuidv4';
import moment from "moment";
const socket = io('https://react-chatter-app.herokuapp.com/');

class Message extends Component {

    state={
        message:"",
        name:this.props.store,
        dataStore:[],
        typingAlert:"",
        date:""
    }

componentDidMount=()=>{
    socket.on("message", (data)=>{
    this.setState({typingAlert:""});
   this.setState({dataStore:[data, ...this.state.dataStore]});
        
    });

    socket.on("typingAlert", (name)=>{
        this.setState({typingAlert:`${name} is typing......`}) 
        
        })
    
}


handleChange=(e)=>{
    
    return this.setState({message:e.target.value})
    
}

handleSubmit=()=>{
    if(!this.state.message){
        alert("Please type in message!")
    }
    else{
    socket.emit("message", {
               message:this.state.message,
                name:this.state.name,
                date: moment(new Date()).format('dddd MMMM Do')
                
         });
        
         this.setState({message:""})
         
}
}


handleKey=()=>{
    socket.emit("typingAlert", this.state.name);
}

    render() {
        
        return (
            
            <div className={style.container}>
                
                <Container>
                
                <div className={style.heading}>
                    <h1>{this.state.name}</h1>
                    
                    </div>
                    
                <div className={style.message_div} > 
                <div className={style.message_container}>
        
        

                   {   this.state.dataStore.map((data)=>{
let currentUser=false;
if(this.state.name===data.name){
    currentUser =true;
}
                    return (
                        currentUser ?
                       ( <div key={uuid()} className={style.outgoing}>
          
                        <div className={style.own_list}>{data.message}</div>
                        <div className={style.extra_list}>&nbsp; {data.date}</div> 
                        </div>
                       )
                       
                       :
                        
                   <div key={uuid()} className={style.incoming}>
                  <div className={style.others_list}>&nbsp;{data.message}</div>
                   <div className={style.extra_list}>&nbsp;{data.name} - &nbsp; {data.date}</div>
                   </div> 
                

                   )}) 
                }
                  
                </div>

                
                <div className={style.typingAlert}>{this.state.typingAlert}</div>
                </div>
                <div className={style.main_div}>
<div className={style.input_div}>
<FormGroup row>
        <Col sm={10}>
          <Input  onChange={this.handleChange}  onKeyPress={this.handleKey} type="message" name="message" id="messageExample" placeholder="Type..." value = {this.state.message} bsSize="lg" />
        </Col>
      </FormGroup>
</div>
<div className={style.button}>
    <Button onClick ={this.handleSubmit}color="primary" type="submit">Send</Button>
</div>
</div>
</Container>

            </div>
        )
    }
}

export default Message;


