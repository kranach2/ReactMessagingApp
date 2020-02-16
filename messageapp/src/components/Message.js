import React, { Component } from 'react';
import io from "socket.io-client";
import style from "../css/Message.module.css";
import { Button} from "reactstrap";
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
                <div className={style.main}>
                <div className={style.heading}>
                    <h1>{this.state.name}</h1>
                    </div>
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

                    <div className={style.input_div}>
                         <input className={style.input} onChange={this.handleChange}  onKeyPress={this.handleKey} type="text" name="message" placeholder="Type..." value = {this.state.message}/>
                         <Button className={style.button} onClick ={this.handleSubmit}color="primary" type="submit">Send</Button>
</div>
                </div>



            </div>
             
        )
    }
}

export default Message;


