import React, { useContext } from "react";
import { useEffect, useRef, useState } from "react";
import AuthContext from "../context/AuthProvider";
import Banner from "./Banner";
import { useNavigate } from "react-router-dom";


export default function Home(props) {
    const { showBanner, setShowBanner } = useContext(AuthContext)
    const [loadingBtn, setLoadingBtn] = useState(true);
    const bannerRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.remove("textBG");
        if(showBanner === "f") {
            bannerRef.current = setInterval(() => {
            setShowBanner("true");
            }, 4000);
            return () => clearInterval(bannerRef.current);
        }
        bannerRef.current = setTimeout(() => {
            if(showBanner !== "f")
            setShowBanner("true");
          }, 2000)
          return () => clearTimeout(bannerRef.current);
    }, [])


    return (
        <>
            {showBanner === "true" ? <Banner onClose={() => {setShowBanner("false");setLoadingBtn(false)}} /> : loadingBtn ? <div class="ui active centered inline loader" style={{position:'relative',top:'40rem'}}></div> : null}
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