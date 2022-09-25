import React, { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import DeleteAccountBtn from "./DeleteAccountBtn";
import emblem from "../assets/images/webEmblem.png";
import '../App';



export default function Navbar(props) {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

useEffect (() => {
  props.setShow404(false);
  document.body.classList.remove("textBG");
}, [])

  const handleLogout = () => {
    setAuth("");
    window.localStorage.clear();
    
  }




  return (
    <>
      <div className="ui inverted segment">
        <div className="ui inverted secondary pointing menu navbarChangeSize">
          {auth?.name === undefined ?<img src = {emblem}  alt = "emblem" style={{right:"20px",position:"absolute",borderRadius:'50%',height:'4vh',width:'2vw',}}></img> : null}
          {auth?.name !== undefined ? <div className="ui simple dropdown item" style={{right:"20px",position:"absolute"}}>
          <p onClick={() => {navigate("/home")}} className="1xl" style={{fontFamily:"cursive",color:'orange'}}>Welcome in {auth.name} <i style={{color:'orange'}} className="smile icon"></i></p></div> : null}
          <li onClick={() => { navigate("/home") }}  className="w3-bar-item w3-button item">Home</li>
          <li onClick={() => { navigate("/menu") }} className="w3-bar-item w3-button">Menu</li>
          {auth?.name === undefined ? <li onClick={() => { navigate("/register"); }} className="w3-bar-item w3-button">Register</li> : null}
          <li onClick={() => navigate("/gallery")} className="w3-bar-item w3-button">Gallery</li>
          <li onClick={() => navigate("/timer")} className="w3-bar-item w3-button">Timer</li>
          {auth?.name === undefined ? <li onClick={() => { navigate("/forgot-password") }} className="w3-bar-item w3-button">Forgot password</li> : null}
          {auth?.name !== undefined ? <li onClick={() => { navigate(`/myOrders&user=${auth.name}`) }} className="w3-bar-item w3-button">My orders</li> : null}
          {auth?.name === undefined ? <li onClick={() => { navigate("/login") }} className="w3-bar-item w3-button" style={{color:'green',fontWeight:'bold'}}>Login</li> : null}
          {auth?.name !== undefined ? <li onClick={() => { navigate("/logout"); handleLogout() }} className="w3-bar-item w3-button" style={{color:'red',fontWeight:'bold'}}>Logout</li> : null}
          {!props.show404 && auth?.name !== undefined ? <DeleteAccountBtn /> : null}
        </div>
      </div>
    </>
  )
}