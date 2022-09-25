import React from "react";
import { useNavigate } from "react-router";
import "../App.css";


const Advertisement = () => {

    const navigate = useNavigate();

    return (
        <div className="ui banner ad " style={{position:'relative',left:'40.1rem',borderRadius:"5px",height:'10rem',width:'36.4vw'}}>
            <div className="ui container" >
                <div className="ui grid "  > 
                    <div className="sixteen wide column" >
                        <div className="ui segment" style={{backgroundColor:'#E97451'}}>
                            <div className="ui grid">
                                <div className="eight wide column">
                                    <p style={{fontFamily:"serif",fontSize:'1.5rem',fontWeight:'bolder',marginLeft:'18.7rem'}}>Pizzarela</p>
                                </div>
                                <div className="eight wide column">
                                    <div className="ui right floated buttons">
                                        <button className="ui button" onClick={() => navigate("/register")}>Sign Up</button>
                                        <div className="or"></div>
                                        <button className="ui positive button" onClick={() => navigate("/login")}>Sign In</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Advertisement;