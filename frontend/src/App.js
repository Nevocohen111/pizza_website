import { useState, useContext, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import AuthContext from "./context/AuthProvider";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Menu from './components/Menu'
import axios from 'axios';
import SearchAnInput from './components/SearchAnInput';
import { Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import MyOrders from './components/MyOrders';
import UserOrder from './components/UserOrder';
import ForgotPassword from './components/ForgotPassword';
import AccountActivated from './components/AccountActivated';
import ResetPassword from './components/ResetPassword';
import AccessibilityButton from './components/AccessibilityButton';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './components/NotFound';
import Timer from './components/Timer';




function App() {
  const { auth, setAuth } = useContext(AuthContext);
  const [show404, setShow404] = useState(false);
  const location = useLocation();
  const [images, setImages] = useState([]);
  const [searchParams] = useSearchParams();



  var token = searchParams.get("token");
  var access = searchParams.get("access");



  const onSearchSubmit = async (entry) => {
    const response = await axios.get(`https://pixabay.com/api/?key=29726177-f028e9e1819b55bfa3ef7bbf5&q=${entry}&image_type=photo`)
    const data = response.data.hits;
    setImages(data);
  }



  useEffect(() => {
    if (auth?.name !== undefined && auth?.accessToken !== null) {
      window.localStorage.setItem("showCookies", false);
      window.localStorage.setItem('MY_AUTH_KEY', JSON.stringify(auth));
      window.localStorage.removeItem('showCookies')
    }
  }, [auth])

  useEffect(() => {
    setAuth(JSON.parse(window.localStorage.getItem('MY_AUTH_KEY')));
  }, [])








  return (
    <div>
      {!show404 ? <Navbar setShow404={setShow404} /> : null}
      {!show404 ? <AccessibilityButton /> : null}
      <ScrollToTop />
      <Routes>
        <Route path="/timer" element={<Timer />} />
        <Route path={`/activate`} element={<AccountActivated access={access} />}></Route>
        <Route path={`/resetPassword`} element={<ResetPassword token={token} />}></Route>
        <Route path="/gallery" element={<SearchAnInput images={images} onSearchSubmit={onSearchSubmit} />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path={`/home&deleted=:${auth?.name}`} element={<Home deleted={location.state?.deleted} />}></Route>
        <Route path="/menu" element={<Menu />} />
        <Route path={"/myOrders&user=:" + auth?.name} element={<MyOrders />} />
        <Route path={"/userOrder&user=:" + auth?.name} element={<UserOrder itemName={location.state?.itemName} itemPrice={location.state?.itemPrice} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login=true" element={<Home />} />
        <Route path="/registered=true" element={<Login registered={location.state?.registered} />} />
        <Route path="/logout" element={<Home flag="true" />} />
        <Route path="/loginAccess=true" element={<Login loginAccess={location.state?.loginAccess} />} />
        <Route path="/loginResetSuccess=true" element={<Login loginResetSuccess={location.state?.loginResetSuccess} />} />
        <Route path="*" element={<NotFound setShow404={setShow404} />} />
      </Routes>
    </div>
  );
}
export default App;
