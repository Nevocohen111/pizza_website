import React from "react";
import { useEffect } from "react";
import "../App.css";
import MyPizzaImage from "../assets/images/pizzaImage.png";
import { Link } from "react-router-dom";

export default function NotFound(props) {

    useEffect(() => {
        props.setShow404(true);
        document.body.classList.add("textBG");
        document.addEventListener("DOMContentLoaded", function () {
            var body = document.body;
            setInterval(createStar, 100);
            function createStar() {
                var right = Math.random() * 500;
                var top = Math.random() * 500;
                var star = document.createElement("div");
                star.classList.add("star")
                body.appendChild(star);
                setInterval(runStar, 10);
                star.style.top = top + "px";
                function runStar() {
                    if (right >= 500) {
                        star.remove();
                    }
                    right += 3;
                    star.style.right = right + "px";
                }
            }
        })
    }, [])

    return (
        <>
            <div className="flex flex-col items-center justify-center" >
                <div className="text mt-48" style={{ padding: '6rem' }}>
                    <div>ERROR</div>
                    <h1>404</h1>
                    <hr></hr>
                    <div>Page Not Found</div>
                </div>
            </div>
            <div className="astronaut">
                <img src={MyPizzaImage} alt="" className="src" />
            </div>
        </>
    )
}