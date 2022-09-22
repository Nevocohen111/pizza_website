import React from "react";
import "../App.css";


export default function PizzaCard(props) {
    return(
        <div className="flex flex-col items-center justify-center w-full h-full space-y-4 mb-5 p-40 slide-in-left">
        <div className="ui card pizzaCard"  style={{backgroundColor:'#E97451',borderRadius:'7px',outlineStyle:'solid',outlineColor:'#E97451'}}>
        <div className="content">
            <div className="header"></div>
            <div className="description">
                {props?.children} 
            </div>
        </div>
    </div>
    </div>
    )
}