import React from 'react';
import {useState} from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ScrollToTop from 'react-router-scroll-top';
 import Login from "./components/Login";
 import Signup from "./components/Signup";
 import Message from "./components/Message";
import WelcomePage from "./components/WelcomePage";

function App() {

const [on, seton] = useState(true);
const handleClick=()=>{
  return seton(!on)
}

let welcomePage; 

if(on){
   welcomePage = < WelcomePage handleClick={handleClick}/>;
}

  return (
   
    <div>

      <Router>
      {welcomePage}
        <ScrollToTop> 
        <Switch>
         <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/message/:id" component={Message} /> 
        </Switch>
        </ScrollToTop>
        </Router>  
      
    </div>
    
  );
}

export default App;
