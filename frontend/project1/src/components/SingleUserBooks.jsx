import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export const SingleUserBooks = () => {


    let [data,setData] = useState([]) ;
    let {tokenLogin, setTokenLogin} = useContext(AuthContext) ;
    let navigate = useNavigate() ; 
    let [updateClick,setUpdateClick] = useState(false) ;
    let [idForUpdate, setIdForUpdate] = useState("") ;
    let [updateFormData, setUpdateFormData] = useState({name:"",publication:"",price:"",author:""}) ;
  
    let dispatch = useDispatch() ;
    let data_display = useSelector(state=>state) ;
    // console.log("data display",data_display) ;
  
    async function getData(){
        let instance = axios.create({
            headers : {
              Authorization : `Bearer ${tokenLogin}`
            }
          })
          let url = `http://localhost:3000/book/view` ;
          let data2 = await instance.get(url) ;
    //    console.log(data2.data) ;
       setData(data2.data) ;
       dispatch({type:"initialise",payload:data2.data}) ;
       
    }
    // getData() ;
    useEffect(()=>{
       getData() ;
    },[])
  
     async function handleDelete(_id){
      let delete_book_url = `http://localhost:3000/book/delete/${_id}`
      let instance =  axios.create({
        headers : {
          Authorization : `Bearer ${tokenLogin}`
        }
      })
      let res = await instance.delete(delete_book_url) ;
    //   console.log(res) ;
      if(res.request.status==200){
        getData() ;
        navigate('/') ;
      }
    }
    
    function handleUpdate(_id){
      setUpdateClick(true) ;
      setIdForUpdate(_id) ;
    }
  
    async function handleSubmitUpdate(e){
      e.preventDefault() ;
    //   console.log(updateFormData) ;
      setUpdateClick(false) ;
      // navigate("/");
      let details = {} ;
      if(updateFormData.name){ details={...details, name: updateFormData.name} } 
      if(updateFormData.author){ details={...details, author:updateFormData.author} }
      if(updateFormData.price){ details = {...details, price: updateFormData.price}}
      if(updateFormData.publication){ details={...details, publication:updateFormData.publication}} ;
    //   console.log(details) ;
      
      let instance = axios.create({
        headers : {
          Authorization : `Bearer ${tokenLogin}`
        }
      })
      let update_book_url = `http://localhost:3000/book/edit/${idForUpdate}` ;
      let res = await instance.patch(update_book_url,details) ;
  
     
      setUpdateFormData({name:"",publication:"",price:"",author:""}) ;
      getData();
      navigate('/') ;
    }

  return (
    <>
    <div style={{display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"20px", textAlign:"center", fontSize:"20px", backgroundColor:'lightgray' ,fontWeight:"600", padding:"20px"}}>
    <div>Id</div>
    <div>Name</div>
    <div>Author</div>
    <div>Price</div>
    <div>Publication</div>
    <div>Update</div>
    <div>Delete</div>
  </div>

  {
      
      data_display.data &&  data_display.data?.map(ele=>{
        return(
            
             <div style={{display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"20px", textAlign:"center", padding:"10px", backgroundColor:'lightyellow'}} key={`${Date.now()}/${ele._id}`}>
              
               <div>
               {ele._id} 
               </div>
               {ele._id!=idForUpdate  &&
               <>
               <div>{ele.name}</div>
               <div>{ele.author}</div>
               <div>{ele.price}</div>
               <div>{ele.publication}</div>

               <div>
                <button onClick={()=>handleDelete(ele._id)} style={{border:"none" , backgroundColor:"white",color:"red",fontFamily:"serif", width:"fit-content"}}>Delete❌</button>
               </div>
               <div>
                <button onClick={()=>handleUpdate(ele._id)} style={{border:"none", width:"fit-content", backgroundColor:"white", color:"blue",fontFamily:"serif"}}>Update✏️</button>
               </div>
               </> }
            
               {updateClick && idForUpdate==ele._id  &&
               <>
             
                <input type="text" placeholder='update name' value={updateFormData.name} onChange={(e)=>setUpdateFormData({...updateFormData, name : e.target.value})} />
                <input type="text" placeholder='update author' value={updateFormData.author} onChange={(e)=>setUpdateFormData({...updateFormData, author : e.target.value})} />
                <input type="number" placeholder='update price' value={updateFormData.price} onChange={(e)=>setUpdateFormData({...updateFormData, price : e.target.value})} />
                <input type="text" placeholder='update publication' value={updateFormData.publication} onChange={(e)=>setUpdateFormData({...updateFormData, publication : e.target.value})} />
                <input type="submit" onClick={handleSubmitUpdate}/>
              
               </>
               }
            </div>
        )
      })
    }

  </>
  )
}
