import React, { useState } from 'react'
import axios from 'axios' 

export const Registration = () => {
    let [formData, setFormData] = useState({email:"", password:"", username : "" , role : [] }) ;
    let [creator,setCreator] = useState(false) ;
    let [viewer, setViewer] = useState(false) ;
    let [status, setStatus] = useState(0) ;

    async function handleSubmit(e){
        e.preventDefault() ;
        if(formData.email!="" && formData.password!="" && formData.username!=""){
        //   console.log(formData, creator, viewer) ;
          let role1, role2 , roles;
          if(creator) { role1="creator" }
          if(viewer){ role2 = "viewer" }
          if(creator && viewer) { roles = [role1,role2] }
          else if(creator){ roles= [role1] } 
          else if(viewer){ roles = [role2] }  
          if(viewer==false && creator==false){ roles = ["viewall"]} ;
          let detail = {email:formData.email, password: formData.password, username:formData.username, role:roles} ;
          // console.log(detail) ;

          // backend usage 
          let register_url = "http://localhost:3000/user/register"  ;
          let temp = await axios.post(register_url,detail) ;
          // console.log(temp.data,"\n","status ",temp.status) ;
          setStatus(temp.status) ;

          setFormData({email:"", password:"", username:"",role:[]}) ;
          setCreator(false) ;
          setViewer(false) ;
        }
    }
  return (
    <div style={{margin:"auto", marginTop:"60px", width:"fit-content", backgroundColor:"rgb(207,207,207)" ,paddingTop:"20px",paddingBottom:"20px", paddingLeft:"100px", paddingRight:"100px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"}}>
        <h1>REGISTRATION</h1>
        <div>
            <form onSubmit={handleSubmit} style={{paddingBottom:"20px", paddingTop:"20px", margin:"auto", textAlign:"center"}}>
                <input type='email' placeholder='enter email' value={formData.email} onChange={(e)=>{setFormData({...formData, email: e.target.value}); setStatus(0)}}  style={{width:"200px", height:"20px", border:"0.3px solid transparent", padding:"5px", marginBottom:"10px", fontFamily:"monospace", color:"blue", outline:"0.5px solid lightskyblue"}} required /> <br/>
                <input type="password" placeholder='enter password' value={formData.password} onChange={(e)=>{setFormData({...formData, password:e.target.value}); setStatus(0)}} style={{width:"200px", height:"20px", border:"0.3px solid transparent", padding:"5px", fontFamily:"monospace", color:"blue", outline:"0.5px solid lightskyblue"}} required /> <br/><br/>
                <input type='text' placeholder='enter username' value={formData.username} onChange={(e)=>{setFormData({...formData, username: e.target.value}); setStatus(0)}}  style={{width:"200px", height:"20px", border:"0.3px solid transparent", padding:"5px", marginBottom:"10px", fontFamily:"monospace", color:"blue", outline:"0.5px solid lightskyblue"}} required /> <br/>
                <div style={{alignItems:"center", justifyContent:"space-around", marginTop:"20px"}}>
                <label>Creator<sub>
                <input type="checkbox" placeholder='creator' checked={creator} onChange={(e)=>{setCreator(!creator);setStatus(0)}} style={{width:"20px", height:"15px", paddingLeft:"20px", paddingTop:"5px"}} />  &nbsp;&nbsp;
                </sub></label>
                <label>Viewer<sub>
                <input type="checkbox" placeholder='viewer' checked={viewer} onChange={(e)=>{setViewer(!viewer);setStatus(0)}} style={{width:"20px", height:"15px", paddingLeft:"20px", paddingTop:"5px"}} /> <br/><br/>
                </sub></label>
                </div>
                <input type="submit"  style={{border:"1px solid lightyellow", backgroundColor:"lightgoldenrodyellow",color:"green",fontFamily:"monospace", padding:"10px", paddingLeft:"20px", paddingRight:"20px", borderRadius:"10px",marginTop:"10px"}} />
            </form>
        </div>
      
        { (status==200 || status==202) && <h3 style={{color:"blue", fontFamily:"serif", fontSize:"17px"}}> You have registered successfully !  </h3> }
        { (status==404) && <h3 style={{color:"red",fontSize:"17px", fontFamily:"sans-serif"}}> error while registering...  </h3> }
    </div>
  )
}
