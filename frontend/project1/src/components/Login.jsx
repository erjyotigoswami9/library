import React, { useContext, useState } from 'react'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export const Login = () => {
    let [formData, setFormData] = useState({email:"", password:""}) ;
    let [status, setStatus] = useState(0) ;
    let [token, setToken] = useState("") ;
    let [er, setEr] = useState("") ;
    let {tokenLogin, setTokenLogin} = useContext(AuthContext) ;

    async function handleSubmit(e){
        e.preventDefault() ;
        if(formData.email!="" && formData.password!=""){
          let details = {...formData} ;
        //   console.log(details) ;

          // backend
          let login_url = "http://localhost:3000/user/login" ;
          let res = await axios.post(login_url,details) ;
        //   console.log(res) ;
          setStatus(res.status) ;
          setToken(res.data.token) ;
          setTokenLogin(res.data.token) ;
        //   console.log(res.data.token) ;
          if(res.message=="Request failed with status code 404"){setStatus(404)}
          setFormData({email:"", password:""}) ;
        }
    }

   return (
    <>
    <div style={{margin:"auto", marginTop:"80px", width:"fit-content", backgroundColor:"rgb(181,214,241)" ,paddingTop:"20px",paddingBottom:"40px", paddingLeft:"100px", paddingRight:"100px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"}}>
        <h1>LOGIN</h1>
        <div>
            <form onSubmit={handleSubmit} style={{paddingBottom:"20px", paddingTop:"20px", margin:"auto", textAlign:"center"}}>
                <input type='email' placeholder='enter email' value={formData.email} onChange={(e)=>{setFormData({...formData, email: e.target.value}); setStatus(0)}}  style={{width:"200px", height:"20px", border:"0.3px solid transparent", padding:"5px", marginBottom:"10px", fontFamily:"monospace", color:"blue", outline:"0.5px solid lightskyblue"}} required /> <br/>
                <input type="password" placeholder='enter password' value={formData.password} onChange={(e)=>{setFormData({...formData, password:e.target.value});setStatus(0)}} style={{width:"200px", height:"20px", border:"0.3px solid transparent", padding:"5px", fontFamily:"monospace", color:"blue", outline:"0.5px solid lightskyblue"}} required /> <br/><br/>
                <input type="submit"  style={{border:"1px solid lightyellow", backgroundColor:"lightgoldenrodyellow",color:"green",fontFamily:"monospace", padding:"10px", paddingLeft:"20px", paddingRight:"20px", borderRadius:"10px",marginTop:"10px"}} />
            </form>
            { (status==200 || status==202) && <h3 style={{fontSize:"14px", color:"blue", fontFamily:"sans-serif"}}>You logged in successfully !</h3> }
        </div>
        
    </div>
    <br />
    {/* { (status==200 || status==202) && <div style={{color:"black", fontFamily:"serif", fontSize:"17px", width:"400px"}}> Token is :  {token}   </div> } */}
    { (status==404) && <h3 style={{color:"red",fontSize:"17px", fontFamily:"sans-serif"}}> error while login... {er}  </h3> }
    </>
  )
}
