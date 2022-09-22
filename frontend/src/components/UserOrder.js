import React,{useState,useContext} from "react";
import PizzaCard from "./PizzaCard";
import axios from "axios";
import AuthContext from "../context/AuthProvider";
import { useEffect } from "react";
import { useNavigate} from "react-router-dom";

export default function UserOrder(props) {
    const [pizzaName, setPizzaName] = useState("");
    const [price, setPrice] = useState("");
    const [size, setSize] = useState("");
    const { auth } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");
    const [authName, setAuthName] = useState("");
    const[count, setCount] = useState(0);
    const navigate = useNavigate();
 



    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:8080/user/add',
                JSON.stringify({ email, phone, address, pizzaName, price, size, authName }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                    mode: 'cors',
                    credentials: 'include',
                    body: JSON.stringify({ "email": `${email}`, "phone": `${phone}`, "address": `${address}`, "pizzaName": `${pizzaName}`, "price": `${price}`, "size": `${size}` , "authName": `${auth.name}`})
                });
            navigate(`/myOrders&user=${auth.name}`);
        } catch (err) {
            setError(err.response.data.message);
        }
    }

    useEffect (() => {
        document.body.classList.remove("textBG");
        setAuthName(JSON.parse(window.localStorage.getItem('authName')));
        setEmail(JSON.parse(window.localStorage.getItem('email')));
        setPrice(JSON.parse(window.localStorage.getItem('price')));
        setCount(JSON.parse(window.localStorage.getItem('count')));
        setPizzaName(JSON.parse(window.localStorage.getItem('pizzaName')))

        if(JSON.parse(window.localStorage.getItem('count')) > 2) {
            window.localStorage.removeItem('count');
        }

        if(JSON.parse(window.localStorage.getItem('count')) < 1) {
        const interval = setInterval(() => {
            window.location.reload();
        }, 1000);

        return () => clearInterval(interval);
    }
    },[count])

    useEffect(() => {
        if(auth.name !== undefined) {
        window.localStorage.setItem('authName', JSON.stringify(auth.name));
        window.localStorage.setItem('email', JSON.stringify(auth.email));
        window.localStorage.setItem('price', JSON.stringify(props.itemPrice));
        window.localStorage.setItem('pizzaName', JSON.stringify(props.itemName));
        window.localStorage.setItem('count', JSON.stringify(count + 1));
        }
    }, [auth.name,count])

    var text = props.itemPrice;
    var largePrice = parseInt(text);


    return(
        <>
        <PizzaCard>
        <h3 className="ui header text-center">Make your pizza!</h3>
                    <div className="space-x-4 mt-8">
                        <input disabled value={props.itemName} onChange={(e) => (setPizzaName(e.target.value))} type="text" placeholder="Pizza name" style={{ marginLeft: '30px' }} className="text-center mb-4 ml-4 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500  rounded-md sm:text-sm focus:ring-1" />
                        <input disabled value={size === "Small" ? props.itemPrice - 3 : size === "Medium" ? props.itemPrice : size === "Large" ? largePrice + 3 : props.itemPrice} onChange={(e) => (setPrice(e.target.value))} type="text" placeholder="Pizza price" style={{ marginLeft: '30px' }} className="text-center mb-4 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500  rounded-md sm:text-sm focus:ring-1" />
                        <input disabled value={JSON.parse(window.localStorage.getItem('authName'))} onChange={(e) => (setAuthName(e.target.value))} type="text" placeholder="Your Name" style={{ marginLeft: '30px' }} className="text-center mb-4 ml-4 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500  rounded-md sm:text-sm focus:ring-1" />
                        <input disabled value={JSON.parse(window.localStorage.getItem('email'))} type="text" placeholder="Your Email" style={{ marginLeft: '30px' }} className="text-center mb-4 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500  rounded-md sm:text-sm focus:ring-1" />
                        <input value={phone} onChange={(e) => (setPhone(e.target.value))} type="text" placeholder="Your Phone" style={{ marginLeft: '30px' }} className="text-center mb-4 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500  rounded-md sm:text-sm focus:ring-1" />
                        <input value={address} onChange={(e) => (setAddress(e.target.value))} type="text" placeholder="Your Address" style={{ marginLeft: '30px' }} className="text-center mb-4 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500  rounded-md sm:text-sm focus:ring-1" />
                        <div className="flex flex-col mb-3" style={{ marginLeft: '30px' }}>
                            <select value={size} onChange={(e) => (setSize(e.target.value))} className="mb-2 ml-4 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500  rounded-md sm:text-sm focus:ring-1 text-center" style={{ width: "10.5vw", marginLeft: "1px" }}>
                                <option value="choose size" >Choose Size</option>
                                <option value="Small" onChange={(e) =>{(setSize(e.target.value))}}>Small</option>
                                <option value="Medium" onChange={(e) => {(setSize(e.target.value))}}>Medium</option>
                                <option value="Large" onChange={(e) =>{(setSize(e.target.value))}}>Large</option>
                            </select>
                        </div>
                        <button className="bg-green-500  hover:bg-green-700 text-white font-bold py-2 px-4  rounded-full mb-8" style={{ marginLeft: "82px" }} onClick={() => { handleSubmit() }}>Purchase</button>
                        {error ? <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div> : null}
                        </div>
        </PizzaCard>
        </>
    )
}