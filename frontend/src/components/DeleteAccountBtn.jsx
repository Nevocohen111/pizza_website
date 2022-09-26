import React,{useContext} from "react";
import AuthContext from "../context/AuthProvider";
import { useNavigate } from "react-router";


export default function DeleteAccountBtn() {
    const {auth, setAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleDeleteAccountByAuthName = async () => {
        const requestOptions = {
            method: 'DELETE',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "name": `${auth.name}`})
        };
        window.localStorage.clear();
        await fetch("http://localhost:8080/register/delete", requestOptions)
        setAuth("");
        navigate(`/home&deleted=${auth.name}`, {state : {deleted : auth.name + " has been sadly deleted"}});
    }

    const alertBox = () => {
        if (window.confirm("Deleting your account will be followed by deleting all your orders. Are you sure you want to delete your account?")) {
            handleDeleteAccountByAuthName();
        } else {
            console.log("You pressed Cancel!");
        }
    }
    return (
        <div style={{marginLeft:'1rem'}}>
            <button onClick={alertBox} className="negative ui button">Delete Account</button>
        </div>
    )
}