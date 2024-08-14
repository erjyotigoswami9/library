import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export const CreateBooks = () => {

    let [formData, setFormData] = useState({name:"", author:"", price:"", publication:""}) ;
    let {tokenLogin, setTokenLogin} = useContext(AuthContext) ;

    async function handleSubmit(e){
        e.preventDefault() ;
        if(formData.name!="" && formData.author!="" && formData.price!="" && formData.publication!=""){
          let details = {...formData} ;
          // console.log(details) ;
          let create_book_url = "http://localhost:3000/book/create" ;
          let instance =  axios.create({
            headers : {
                Authorization : `Bearer ${tokenLogin}`
            }
          })
          let res = await instance.post(create_book_url,details) ;
          // console.log(instance,"\n\n",res) ;

          setFormData({name:"", author:"", price:"", publication:""}) ;
        }
    }

  return (
    <div style={{margin:"auto", marginTop:"80px", width:"fit-content", backgroundColor:'rgb(198,224,207)' ,paddingTop:"20px",paddingBottom:"40px", paddingLeft:"100px", paddingRight:"100px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"}}>
        <h1>Create Book</h1>
        <div>
            <form onSubmit={handleSubmit} style={{paddingBottom:"20px", paddingTop:"20px", margin:"auto", textAlign:"center"}}>
                <input type='text' placeholder='enter book name' value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})}  style={{width:"200px", height:"20px", border:"0.3px solid transparent", padding:"5px", marginBottom:"10px", fontFamily:"monospace", color:"blue", outline:"0.5px solid lightskyblue"}} required /> <br/>
                <input type="text" placeholder='enter author name' value={formData.author} onChange={(e)=>setFormData({...formData, author:e.target.value})} style={{width:"200px", height:"20px", border:"0.3px solid transparent", padding:"5px", fontFamily:"monospace", color:"blue", outline:"0.5px solid lightskyblue"}} required /> <br/><br/>
                <input type='number' placeholder='enter book price' value={formData.price} onChange={(e)=>setFormData({...formData, price: e.target.value})}  style={{width:"200px", height:"20px", border:"0.3px solid transparent", padding:"5px", marginBottom:"10px", fontFamily:"monospace", color:"blue", outline:"0.5px solid lightskyblue"}} required /> <br/>
                <input type="text" placeholder='enter publication' value={formData.publication} onChange={(e)=>setFormData({...formData, publication:e.target.value})} style={{width:"200px", height:"20px", border:"0.3px solid transparent", padding:"5px", fontFamily:"monospace", color:"blue", outline:"0.5px solid lightskyblue"}} required /> <br/><br/>
                <input type="submit"  style={{border:"1px solid lightyellow", backgroundColor:"lightgoldenrodyellow",color:"green",fontFamily:"monospace", padding:"10px", paddingLeft:"20px", paddingRight:"20px", borderRadius:"10px",marginTop:"10px"}} />
            </form>
        </div>
    </div>
  )
}
