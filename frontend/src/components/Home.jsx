import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Home(props) {


    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.remove("textBG");
    }, [])

    return (
        <>
            <div className="w3-center slide-in-left" style={{marginTop:'10rem'}}>
                {props.deleted ? <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3" style={{width:'20rem',marginLeft:'54rem'}}>{props.deleted}</p> : null}
                <span className="w3-text-white" style={{ fontSize: "5.5rem", fontFamily: "Times, serif" }}>Welcome to<br></br>Pizzarela</span>
                <div className="w3-display-center">
                    <button className="massive primary ui button" onClick={() => navigate("/menu")}><strong>Let me see the Menu</strong></button>
                </div>

            </div>
        </>
    )
}