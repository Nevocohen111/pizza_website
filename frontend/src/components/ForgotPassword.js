import React,{useEffect} from "react";
import axios from "axios";
import "../App.css";


export default function ForgotPassword() {
    const [email, setEmail] = React.useState("");
    const [success, setSuccess] = React.useState("");
    const [error, setError] = React.useState("");

    useEffect (() => {
        document.body.classList.remove("textBG");
    }, [])



    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const response = await axios.post("http://localhost:8080/forgot/find", { email });
        if(!response.data.message.includes("Email not found")){
            setSuccess("A link has been sent to your email");
            setError("");
        }else {
            setError(response.data.message);
            setSuccess("");
        }

        }catch(err){
            setError(err.response.data.message);
        }
    }
    



    return(
        <div className="flex flex-col items-center justify-center mt-48" >
        <div className="ui very padded text segment menuHeader" style={{ opacity: "0.8",backgroundColor:'#E97451',width:'20vw' }} >
            <div className="text-center text-2xl mb-8">
            <h2 className="text-center ui header" style={{fontFamily:'Bookman, URW Bookman L, serif',marginLeft:'5px',fontWeight:'200',marginTop:'-20px'}}>Forgot Password</h2>
                <div className="description" >
                    <p className="ui text"  style={{fontSize:"1.02rem",fontFamily:'cursive',fontWeight:'700',color:'black',marginRight:'2.7rem',marginTop:"3rem"}} >Just enter your email address below<br></br> and we'll send you a link to reset your password!</p>
                    </div>
            </div>
            <div className="ui input focus mb-8">
            <input type="text" value={email} style={{width:'11vw',marginTop:'5rem'}} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            </div>
            <div className="description text-center">
            <button className="ui positive button" onClick={handleSubmit}>Submit</button>
            </div>
            <br></br>
            {success ? <p className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-center">{success}</p> : null}
            {error ? <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center ">{error}</p> : null}
        </div>
        </div>
    )
}