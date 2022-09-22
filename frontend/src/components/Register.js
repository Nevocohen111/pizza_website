import React, { useState, useEffect } from "react";
import PizzaCard from "./PizzaCard";
import { useNavigate } from "react-router-dom";



export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);


    const navigate = useNavigate();


    const handleSubmit = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            consumes: 'application/json',
            produces: 'text/plain;charset=UTF-8',
            body: JSON.stringify({ "name": `${name}`, "email": `${email}`, "pwd": `${password}`, "confirmPwd": `${confirmPassword}`, "confirmEmail": `${confirmEmail}` })
        };


        const response = await fetch('http://localhost:8080/register/add', requestOptions)
        const data = await response.json();
        if (!data.message.includes("Welcome to Pizzarela")) {
            setError(data.message);
            setTimeout(() => {
                setIsDisabled(true);
                setError("");
            }, 3000)

            setTimeout(() => {
                setIsDisabled(false);
            }, 5000)
        }
        else {
            setError("");
            navigate(`/registered=true`, { state: { registered: name + ", Please verify your email and log in.", data: data } });
        }


    }


    const checkIfMatches = () => {
        if (password === confirmPassword && email === confirmEmail) {
            handleSubmit();
        }
        if (password !== confirmPassword || email !== confirmEmail) {
            setError("Password and email fields do not match");
            setInterval(() => {
                setError("");
            }, 4200);

            setTimeout(() => {
                setIsDisabled(false);
            }, 5000)

        }

    }

    useEffect(() => {
        document.body.classList.remove("textBG");
    }, [])






    return (
        <>
            <div className="ui center aligned icon header" >
                <i className="circular registered icon" style={{ backgroundColor: '#E97451' }}></i>
            </div>
            <div className="container" style={{marginTop:'-7rem',marginLeft:'12.5rem'}}>
            <PizzaCard>
                <h2 className="text-center ui header" style={{ fontFamily: 'Bookman, URW Bookman L, serif', marginLeft: '5px', fontWeight: '200' }}>Register</h2>
                <div className="flex flex-col items-center justify-center w-full h-full space-y-4 mt-8 ">
                    <div className="ui input focus ml-2">
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" className="border border-gray-500 p-2 rounded-lg  "></input>
                    </div>
                    <div className="ui input focus ml-2">
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" className="border border-gray-500 p-2 rounded-lg"></input>
                    </div>
                    <div className="ui input focus ml-2">
                        <input value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} type="text" placeholder="confirmEmail" className="border border-gray-500 p-2 rounded-lg"></input>
                    </div>
                    <div className="ui input focus ml-2">
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="border border-gray-500 p-2 rounded-lg"></input>
                    </div>
                    <div className="ui input focus ml-2">
                        <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="confirmPassword" className="border border-gray-500 p-2 rounded-lg"></input>
                    </div>
                    <br></br>
                    <button disabled={isDisabled} onClick={checkIfMatches} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ml-3">Lets go!</button>
                    <br></br>
                    {error !== "" ? <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center">{error}</p> : null}
                </div>
            </PizzaCard>
            </div>

        </>

    )

}