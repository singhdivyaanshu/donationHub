import React,{useEffect, useState} from 'react';
import './App.css';
import Home from './Pages/home'
import {  Routes, Route } from "react-router-dom";
import Org from './Components/Auth/Org'
import People from './Components/Auth/People'
import useform ,{validate} from './Components/function/formhandle'
import Olog from './Components/Login/Olog'
import OSignup from './Components/Signup/OSignup'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import Forgot from './Components/Forgot/Forgot'
import Main from './Pages/Main'
import Contact from './Components/Contact/Contact'
import MainHome from './Components/Main/Home/Home'
import Post from './Components/Main/Post/Post'
import MyPost from './Components/Main/Post/Mypost'
import MyProfile from './Components/Main/Profile/Myprofile'
import Transaction from './Components/Transaction/Transaction'
import NotFound from './Components/NotFound/NotFound'

function App() {

  // const location  = useLocation();

  const [activeItem, setActiveItem] = useState("Home");

  useEffect(()=>{
    if(localStorage.getItem('userType')==='user'){
      setActiveItem('Profile');
    }
    else
    {
      setActiveItem('Home');
      
    }
    
  },[])



  return (
    
      <Routes>
        <Route path="/" element={<Home setActiveItem={setActiveItem}/>} />
          <Route path="org" element={<Org/>}>
            <Route path="login" element={<Olog form={useform()} validate={validate}/>} />
            <Route path="signup" element={<OSignup  form={useform()} validate={validate}/>} />
          </Route>
          <Route path="people" element={<People/>}>
            <Route path="login" element={<Login  form={useform()} validate={validate}/>} />
            <Route path="signup" element={<Signup  form={useform()} validate={validate}/>} />
          </Route>
          <Route path="contact" element={<Contact  form={useform()} validate={validate}/>} />
          <Route path="forgot" element={<Forgot form={useform()} validate={validate}/>}></Route>
          <Route path="main" element={<Main activeItem={activeItem} setActiveItem={setActiveItem}/>}>
            <Route path="home" element={<MainHome setActiveItem={setActiveItem} />} />
            <Route path="myprofile" element={<MyProfile setActiveItem={setActiveItem} form={useform()} validate={validate}/>} />
            <Route path="createpost" element={<Post setActiveItem={setActiveItem} activeItem={activeItem} form={useform()} validate={validate}/>} />
            <Route path="updatepost" element={<Post setActiveItem={setActiveItem} activeItem={activeItem} form={useform()} validate={validate}/>} />
            <Route path="mypost" element={<MyPost/>} />
          </Route>
          <Route path="transaction" element={<Transaction setActiveItem={setActiveItem} form={useform()} validate={validate}/>} />
          <Route path='*' element={<NotFound/>} />
      </Routes>
      

      
  );
}

export default App;