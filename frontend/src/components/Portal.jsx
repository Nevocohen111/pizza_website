import React from "react";
import ReactDOM  from "react-dom";


export default function Portal(props) {
    return ReactDOM.createPortal (
       <div className="ui dimmer show modals visible active" style={{zIndex:'99999'}}>
         <div className="ui raised very padded text container segment">
         <button onClick={props.onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4"  style={{borderRadius:'3px',position:'relative',left:'54.2%',top:'-3.5rem'}}><i class="close icon" style={{color:'black',position:'relative',left:'2px'}}></i></button>
            <h2 style={{textDecoration:'underline',color:'#4169e1',fontWeight:'bolder',position:"relative",bottom:'5rem'}}>Accessibility Statement for Pizzarela</h2>
            <p style={{color:'black',position:'relative',bottom:'2rem',fontSize:'1.3rem'}}>We are committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone, and applying the relevant accessibility standards.</p>
            </div>
         </div>,
        document.querySelector("#accessibility-root")
    )
}