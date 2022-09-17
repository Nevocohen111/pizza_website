import React, { useState, useContext} from "react";
import AuthContext from "../context/AuthProvider";
import { useEffect } from "react";
import axios from "../api/axios";
import PizzaCard from "./PizzaCard";
import { useNavigate} from "react-router-dom";

export default function Login(props) {
    const { setAuth } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [error, setError] = useState("");
    const [errorFlag, setErrorFlag] = useState(false);
    const navigate = useNavigate();
    

    const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\s*([^;]*).*$)|^.*$/, '$1');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8080/login/add',
                JSON.stringify({ name, email, pwd }),
                {
                    headers: { 'Content-Type': 'application/json', 'X-XSRF-TOKEN': csrfToken },
                    withCredentials: true,
                    mode: 'cors',
                    credentials: 'include',
                    body: JSON.stringify({ "name": `${name}`, "email": `${email}`, "pwd": `${pwd}` })
                });
            const roles = response.data.role.roleId;
            const accessToken = response.data.accessToken;
            setAuth({ name, email, roles, accessToken });
            navigate(`/login=true`);
            props.setMatches(response.data);
            props.setEntered(false);
        }
        catch (err) {
            setErrorFlag(true)
            if (err?.response?.status === 400) {
                console.log(err.response.data);
                setError("Credentials do not match");
            } else if (err?.response?.status === 401) {
                setError("Unauthorized");
            }else if(err?.response?.data?.message?.includes("is null")) {
                console.log(err.response.data.message);
                    setError("You didn't verify your email yet")
                }
             else {
                setError("Check username and password");
            }

        }
    }




    useEffect(() => {
        setError("");
        document.body.classList.remove("textBG");
    }, [name, email, pwd])





    return (
        <>  <PizzaCard>
            <div className="flex flex-col items-center justify-center">
            <h2 className="text-center ui header mb-8" style={{fontFamily:'Bookman, URW Bookman L, serif',marginLeft:'5px',fontWeight:'200'}}>Login</h2>
                <div className="ui input focus mb-3 ml-2">
                    <input value={name} onChange={(e) => setName(e.target.value)}  type="text" placeholder="Name" required />
                </div>
                <div className="ui input focus mb-3 ml-2">
                    <input value={email} onChange={(e) => setEmail(e.target.value)}  type="text" placeholder="Email" className="border border-gray-500 p-2 rounded-lg" required></input>
                </div>
                <div className="ui input focus mb-8 ml-2">
                    <input value={pwd} onChange={(e) => setPwd(e.target.value)}  type="password" placeholder="Password" className="border border-gray-500 p-2 rounded-lg" required></input>
                </div>
                <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">Login</button>
                <br></br>
                {props.registered && errorFlag === false ? <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-center">{props.registered}</div> : null}
                {props.loginAccess && errorFlag === false ? <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-center">{props.loginAccess}</div> : null}
                {props.loginResetSuccess && errorFlag === false ? <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-center">{props.loginResetSuccess}</div> : null}

            </div>
            {error ? <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center" >{error}</p> : null}
        </PizzaCard>
        </>
    )
}