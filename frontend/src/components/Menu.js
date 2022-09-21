import React, { useState, useContext } from "react";
import { useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import PizzaCard from "./PizzaCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import pizzaImage1 from "../assets/images/image1.jpg";
import pizzaImage2 from "../assets/images/image2.jpg";
import pizzaImage3 from "../assets/images/image3.jpg";
import pizzaImage4 from "../assets/images/image4.jpg";
import pizzaImage5 from "../assets/images/image5.jpg";
import pizzaImage6 from "../assets/images/image6.jpg";
import pizzaImage7 from "../assets/images/image7.jpg";


export default function Menu() {
    const [menu, setMenu] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [toggle, setToggle] = useState(false);
    const { auth } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [size, setSize] = useState("");
    const navigate = useNavigate();

    const urlList = [pizzaImage1, pizzaImage2, pizzaImage3, pizzaImage4, pizzaImage5, pizzaImage6, pizzaImage7];


    const handleDeleteById = async (id) => {
        const requestOptions = {
            method: 'DELETE',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "id": `${id}` })
        };
        await fetch('http://localhost:8080/menu/delete', requestOptions)
        getMenu();
    }




    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:8080/menu/add',
                JSON.stringify({ name, price, size }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                    mode: 'cors',
                    credentials: 'include',
                    body: JSON.stringify({ "name": `${name}`, "price": `${price}`, "size": `${size}` })
                });
            setName("");
            setSize("");
            setToggle(!toggle)
            setError("");
            setPrice("");
            if (auth.name !== "Admin")
                navigate(`/myOrders&user=${auth.name}`);
            else
                getMenu();

        } catch (err) {
            setError(err.response.data.message);
            setToggle(toggle)
        }
    }

    const isAuth = (auth) => {
        if (auth) {
            if (Object.keys(auth).length !== 0) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }




    const getMenu = async () => {
        const response = await fetch('http://localhost:8080/menu/all')
        const data = await response.json();
        for (let i = 0; i < data.length; i++) {
            data[i].url = urlList[i];
        }
        setMenu(data);
    }

    useEffect(() => {
        document.body.classList.remove("textBG");
        getMenu()
    }, [])

    return (
        <>
        <div className="ui container">
                        <h1 className="ui header text-center" style={{ position: 'relative', bottom: '50px', color: '#f1800e', textDecoration: 'underline' }}>Our Pizzas</h1>
                    </div>
            {!toggle ? menu?.map((item, index) => (
                <div className="flex flex-col items-center justify-center mt-20"  key={index}>
                    <div className="ui  padded text container segment menuHeader" style={{ opacity: "0.8",backgroundColor:'#E97451' }} >
                        <div className="text-center ui header" style={{fontFamily:"serif"}}>{item.name}</div>
                        {item.url ? <img src={item.url} alt={item.name} width="370vw" style={{ borderRadius: '10px',height:'20vw' }} className="mb-8 ml-36" />
                            : <img src={pizzaImage1} alt='Pizza' width="370vw" style={{ borderRadius: '10px',height:'20vw' }} className="mb-8 ml-32" />}
                        <p className="mb-2 text-center menuText" style={{fontFamily:'cursive'}}>Price: {item.price}$</p>
                        <p className="ui text mb-2 text-center menuText" style={{fontFamily:'cursive',position:'relative'}}>Size: {item.size}</p>
                        {!isAuth(auth) ? <p className="ui text mb-2  menuText" style={{color:'yellow',fontWeight:'bolder',position:'relative'}}>Log in to your account in order to make a purchase and win rewards!</p> : null}

                        {isAuth(auth) && auth?.name !== "Admin" ? <button onClick={() => navigate(`/userOrder&user=${auth?.name}`, { state: { itemName: item.name, itemPrice: item.price } })} className="ui primary button menuButton" style={{marginRight:'50rem'}}>Order</button> : null}
                        {auth?.name === "Admin" ? <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-3"  onClick={() => handleDeleteById(item.id)}>Delete</button> : null}
                    </div>

                </div>
            )) :
                <PizzaCard>
                    <h3 className="ui header text-center">Make your pizza!</h3>
                    <div className="space-x-4 mt-8">

                        <input value={name} onChange={(e) => (setName(e.target.value))} type="text" placeholder="Pizza name" style={{ marginLeft: '30px' }} className="text-center mb-4 ml-4 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500  rounded-md sm:text-sm focus:ring-1" />
                        <input value={price} onChange={(e) => (setPrice(e.target.value))} type="text" placeholder="Pizza price" style={{ marginLeft: '30px' }} className="text-center mb-4 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500  rounded-md sm:text-sm focus:ring-1" />
                        <div className="flex flex-col mb-2" style={{ marginLeft: '30px' }}>
                            <select value={size} onChange={(e) => (setSize(e.target.value))} className="mb-2 ml-4 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500  rounded-md sm:text-sm focus:ring-1 text-center" style={{ width: "10.5vw", marginLeft: "1px" }}>
                                <option value="choose size" >Choose Size</option>
                                <option value="Small" onChange={(e) => (setSize(e.target.value))}>Small</option>
                                <option value="Medium" onChange={(e) => (setSize(e.target.value))}>Medium</option>
                                <option value="Large" onChange={(e) => (setSize(e.target.value))}>Large</option>
                            </select>
                        </div>
                        <button className="bg-green-500  hover:bg-green-700 text-white font-bold py-2 px-4  rounded-full mb-8" style={{ marginLeft: "60px" }} onClick={() => { handleSubmit() }}>Add product</button>
                        {error ? <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center" role="alert">{error}</div> : null}
                    </div>

                </PizzaCard>
            }
            <div className="flex flex-col items-center justify-center mt-10">
                {!toggle && auth?.name === "Admin" && menu.length !== 0 ? <button className=" text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full " onClick={() => setToggle(!toggle)} >{toggle ? toggle : !toggle}Hey Admin, add a pizza.</button> : <div></div>}
                {!toggle && isAuth(auth) && menu.length === 0 ?
                    <div>
                        <br></br><br></br><br></br><br></br><br></br><br></br>
                        <div className="ui placeholder segment">
                            <div className="ui icon header">
                                <i className="clipboard list icon"></i>
                                Seems to us your menu is empty!
                            </div>
                            <div className="inline">
                                {auth.name === "Admin" ? <button className=" text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full " onClick={() => setToggle(!toggle)} >{toggle ? toggle : !toggle}Hey Admin, add a pizza.</button> : null}
                            </div>
                        </div>
                    </div>
                    : <div></div>}
            </div>




        </>
    )
}