import React from 'react'
import style from "../css/Logo.module.css";
const Logo = ({
width = "60px",
height= "60px",
ViewBox = "0 0 60 60"
}) => {
  return (
    
      <svg width = {width} height = {height} ViewBox = {ViewBox} version="1.1" xmlns="http://www.w3.org/2000/svg" >
    <circle className={style.outerCircle} cx="30" cy="30" r="25" fill="black" stroke="blue"></circle>
    <circle className={style.innerCircle} cx="30" cy="30" r="22" fill="none" stroke="white"></circle>
    <text className={style.text} x="11" y="33"  fill="white">&lt;KRC /&gt;</text>
  
  
  </svg>

  )
}

export default Logo;