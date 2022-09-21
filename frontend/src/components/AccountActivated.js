import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";


export default function AccountActivated(props) {
  const [error, setError] = useState("");

    useEffect (() => {
        window.localStorage.clear();
        document.body.classList.remove("textBG");
    }, [])

    const navigate = useNavigate();

    const activationPostRequest = () => {
        fetch(`http://localhost:8080/register/activateAccount?access=${props.access}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-origin": "*"
            },
            mode: 'cors',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "Account activated") {
                    navigate("/loginAccess=true",{state: {loginAccess: "Thanks for registering! You can now login."}});
                } else {
                     setError(data?.message);
                }
            })
    }




    return (
    
<div className="flex flex-col items-center justify-center mt-48">
<div className="ui very padded text  segment menuHeader" style={{ opacity: "0.8",backgroundColor:'#E97451'}} >
    <div className="text-center text-2xl mb-8">
    <h2 className="text-center ui header" style={{fontFamily:'Bookman, URW Bookman L, serif',marginLeft:'5px',fontWeight:'200',marginTop:'-20px'}}>Account Activation</h2>
        <div className="description" >
            <p className="ui text text-center"  style={{fontSize:"1.02rem",fontFamily:'cursive',fontWeight:'700',position:'relative',color:'black'}} >Hello, in order to activate your account<br></br> please click on the button below.<br></br> have a wonderful day!</p>
            </div>
    </div>
    <div className="description text-center">
    <button className="ui primary button" onClick={activationPostRequest}>Activate Account</button>
    </div>
     {error !== "" ? <p className="ui error message text-center" style={{ position: 'relative', top: '20px' }}>{error}</p> : null}
</div>
</div>
    )
}