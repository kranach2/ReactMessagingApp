import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {Button} from "reactstrap";
import style from "../css/Welcome.module.css";

 class WelcomePage extends Component {
    render() {
        return (
            <div className={style.wpage_container}>
                <div className={style.heading}>Chatter</div>
                <div className={style.grid_div}>
                    <div>
                    <Link to = "/signup"><Button  onClick={this.props.handleClick} color="primary">Sign Up</Button></Link>
                </div>
                <div>
                <Link to = "/login"> <Button onClick={this.props.handleClick} color="primary">Login</Button></Link>
                </div>
                </div>
            </div>
        )
    }
}
export default  WelcomePage;