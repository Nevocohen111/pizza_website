import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import AuthContext from "../context/AuthProvider";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyOrders() {
    const [userData, setUserData] = useState([]);
    const { auth } = useContext(AuthContext);
    const name = auth?.name;
    const navigate = useNavigate();

    useEffect(() => {
        if (userData?.length > 0)
            window.localStorage.setItem('OrdersList', JSON.stringify(userData));
        getMyMenu();
    }, [userData])

    useEffect(() => {
        setUserData(JSON.parse(window.localStorage.getItem('OrdersList')));
        document.body.classList.remove("textBG");

    }, [])




    const getMyMenu = async () => {
        const response = await axios.get(`http://localhost:8080/user/get?authName=${name}`,
            JSON.stringify({ name }),
            {
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                withCredentials: true,
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify({ "name": `${name}` }),
            });
        setUserData(response.data);
    }

    const handleDeleteById = async (id) => {
        const requestOptions = {
            method: 'DELETE',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "id": `${id}` })
        };
        await fetch('http://localhost:8080/user/delete', requestOptions)

    }


    return (
        <>
            {auth?.name !== undefined ?
               <div className="ui center aligned icon header" style={{position:'relative',top:'-5rem',left:'-0.2rem'}} >
               <i className="circular envelope open  icon" style={{backgroundColor:'#E97451'}}></i>
               </div>
                : null}

            {userData?.length > 0 ?
                <div>
                    {userData.map((item, index) => (
                        <div className="container ml-48 slide-in-left" style={{position:"relative",top:'-5rem'}} key={index}>
                        <div className="flex flex-col items-center justify-center mt-10 " >
                            <div className="ui padded text container segment mt-10" style={{ opacity: "0.8",backgroundColor:'#E97451' }}>
                                <div className="text-center ui header" style={{ fontFamily: "serif" }}>{item.pizzaName}</div>
                                <img src="https://img.pizza/100/100" alt='Changing random Pizza api image' style={{ borderRadius: '50%' }} className="mb-8 ml-72" />
                                <div className="ui tiny padded text segment" style={{ backgroundColor: '#F5F5DC' }}>
                                    <p className="ui header text-center">Name: {item.authName}</p>
                                    <hr></hr>
                                    <p className="ui header text-center">Price: {item.size === "Small" ? item.price - 3 : item.size === "Medium" ? item.price : item.size === "Large" ? (item.price * 1) + 3 : item.price}$</p>
                                    <hr></hr>
                                    <p className="ui header text-center">Size: {item.size}</p>
                                    <hr></hr>
                                    <p className="ui header text-center">Address: {item.address}</p>
                                    <hr></hr>
                                    <p className="ui header text-center mb-3">Email: {item.email}</p>
                                    <hr></hr>
                                    <p className="ui header text-center mb-3">Phone: {item.phone}</p>
                                </div>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDeleteById(item.id)}>Abort Order</button>

                            </div>
                        </div>
                        </div>
                    ))}
                </div>
                :
                <div>
                    <div className="ui placeholder segment container">
                        <div className="ui icon header">
                            <i className="shopping cart icon"></i>
                            <p>Your Pizza cart is Empty..</p>
                        </div>
                        <div className="inline">
                            <button onClick={() => navigate("/menu")} className="ui primary button">Go back to Menu!</button>
                        </div>
                    </div>
                </div>
            }


        </>
    )
}