import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import Logo from '../assets/logo.png'
import {ToastContainer,toast} from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { registerRoute } from '../utils/APIRoutes';
function Register() {

  const [values,setValues]=useState({
    username:"",email:"",password:"",confirmPassword:"",
  })

  const handleSubmit=async (event) => {
    event.preventDefault(); 
    if(handleValidation()){
      const {username,email,password,confirmPassword}=values;
      const {data}=await axios.post(registerRoute,{
        username,email,password
      });
    }
  }

  const toastOptions={
    position:'bottom-right',
    autoClose:5000,
    draggable:true,
    pauseOnHover:true,
    theme:'dark',
  }
  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;
  
    // Regular expression for a simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!username.trim()) {
      toast.error("Username is required", toastOptions);
      return false;
    } else if (!email.trim()) {
      toast.error("Email is required", toastOptions);
      return false;
    } else if (!password.trim()) {
      toast.error("Password is required", toastOptions);
      return false;
    } else if (!confirmPassword.trim()) {
      toast.error("Confirm password is required", toastOptions);
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Password and confirm password do not match", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be greater than or equal to 8 characters", toastOptions);
      return false;
    } else if (!emailRegex.test(email)) {
      toast.error("Invalid email format", toastOptions);
      return false;
    }
  
    // If all conditions pass, return true
    return true;
  };

  const handleChange=(event) => {
    event.preventDefault();

    setValues({...values,[event.target.name]:event.target.value});

  }
  return <>
    
    <FormContainer>
      <form onSubmit={(event)=>handleSubmit(event)}>
        <div className="brand">
          <img src={Logo} alt='logo'/>
          <h1>Connectly</h1>
        </div>
        <input 
          type="text" 
          placeholder='Username' name='username' 
          onChange={(event)=>handleChange(event)}>

        </input>
        <input 
          type="email" 
          placeholder='Email' name='email' 
          onChange={(event)=>handleChange(event)}>

        </input>
        <input 
          type="password" 
          placeholder='Password' name='password' 
          onChange={(event)=>handleChange(event)}>

        </input>
        <input 
          type="password" 
          placeholder='Confirm Password' name='confirmPassword' 
          onChange={(event)=>handleChange(event)}>

        </input>
        <button type='submit'>Create User</button>
        <span>already have an account ? <Link to='/login'>Login</Link></span>
      </form>
    </FormContainer>
    <ToastContainer />
    
  </>

}
const FormContainer=styled.div`
  height:100vh;
  width:100vW;
  display: flex;
  flex-direction:column;
  justify-content:center;
  gap:1rem;
  align-items:center;
  background-color:#131324;
  .brand{
    display:flex;
    justify-content:center;
    gap:1rem;
    align-items:center;
  }
  img{
    height:5rem;
  }
  h1{
    color:white;
    text-transform: uppercase;

  }
  form{
    display:flex;
    flex-direction:column;
    gap:2rem;
    background-color: #00000076;
    border-radius:2rem;
    padding: 3rem 5rem;


  }
  input{
    background-color:transparent;
    padding:1rem;
    border:0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color:white;
    width:100%;
    font-size:1rem;

    &:focus{
      border:0.1rem solid #997af0;
      outline:none;

    }
  }
  button{
    background-color: #997af0;
    color:white;
    padding:1rem 2rem;
    border:none;
    font-weight:bold;
    cursor:pointer;
    border-radius:0.4rem;
    font-size:1rem;
    text-transform:uppercase;
    &:hover{
      background-color: #4e0eff;
      transition:0.5s ease-in-out;
      
    }
  }
  span{
    color:white;
    text-transfrom:uppercase;
    a {
      color: #4e0eff;
      text-decoration:none;
      fort-weight:bold;

    }
  }
`;



export default Register
