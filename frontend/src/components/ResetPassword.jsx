import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PizzaCard from "./PizzaCard";

export default function ResetPassword(props) {
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const navigate = useNavigate();



    const updateUser = () => {
        fetch(`http://localhost:8080/forgot/resetPassword?token=${props.token}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-origin": "*"
            },
            mode: 'cors',
            body: JSON.stringify({ password }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "Password updated successfully") {
                    navigate("/loginResetSuccess=true", { state: { loginResetSuccess: "Password updated successfully!" } });
                } else {
                    setError(data.message);
                }
            }
            )

    }






    const checkIfMatches = () => {
        if (password === confirmPassword) {
            updateUser();
        }
        else {
            setError("Passwords do not match");
        }

    }
    useEffect(() => {
        document.body.classList.remove("textBG");
    }, [])



    return (
        <PizzaCard>
            <h2 className="text-center ui header mb-8" style={{ fontFamily: 'Bookman, URW Bookman L, serif', marginLeft: '5px', fontWeight: '200' }}>Reset Password</h2>
            <div className="flex flex-col items-center justify-center w-full h-full space-y-4 mb-5">
                <div className="ui input focus ml-2">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="border border-gray-500 p-2 rounded-lg" required></input>
                </div>
                <div className="ui input focus ml-2">
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" className="border border-gray-500 p-2 rounded-lg" required></input>
                </div>
                <button className="ui primary button" style={{ marginLeft: '6px' }} onClick={checkIfMatches}>Submit</button>
                {error ? <div className="ui error message text-center">{error}</div> : null}
            </div>
        </PizzaCard>
    );
}