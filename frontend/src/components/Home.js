import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Home(props) {

    const navigate = useNavigate();

    useEffect (() => {
        document.body.classList.remove("textBG");
    }, [])

    return (
        <>        
            <div className="w3-display-middle w3-center">
                {props.deleted ? <div className="w3-panel w3-red w3-display-container">{props.deleted}</div> : null}
                <span className="w3-text-white"   style={{ fontSize: "5.5rem",fontFamily:"Times, serif"}}>Welcome to<br></br>Pizzarela</span>
                <div className="w3-display-center">
                    <button className="massive primary ui button" onClick={() => navigate("/menu")}><strong>Let me see the Menu</strong></button>

                </div>

            </div>
        </>
    )
}