import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export const BookNew = () => {
    let [data,setData] = useState([]) ;
    let {tokenLogin, setTokenLogin} = useContext(AuthContext) ;
    let navigate = useNavigate() ; 
    let [updateClick,setUpdateClick] = useState(false) ;
    let [idForUpdate, setIdForUpdate] = useState("") ;
    let [updateFormData, setUpdateFormData] = useState({name:"",publication:"",price:"",author:""}) ;
  
    let dispatch = useDispatch() ;
    let data_display = useSelector(state=>state) ;
    // console.log("data display",data_display) ;
    // let {old,new1}=useParams() ;
    // console.log(old,new1)
    async function getData(){
        
        let res=[] ;
        // if(old==1){
            // res = await axios.get(`http://localhost:3000/book/books?old=1`) ;
        //     console.log(res) ;
        // }
        // if(new1==1){
            res = await axios.get(`http://localhost:3000/book/books?new1=1`) ;
        //     console.log(res) ;
        // }
   
       let data2 = res ;
      //  console.log(data2) ;
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
      // console.log(res) ;
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
      // console.log(updateFormData) ;
      setUpdateClick(false) ;
      // navigate("/");
      let details = {} ;
      if(updateFormData.name){ details={...details, name: updateFormData.name} } 
      if(updateFormData.author){ details={...details, author:updateFormData.author} }
      if(updateFormData.price){ details = {...details, price: updateFormData.price}}
      if(updateFormData.publication){ details={...details, publication:updateFormData.publication}} ;
      console.log(details) ;
      
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
      
      <div style={{paddingBottom:"20px"}}>
        <img width={'100%'} height={400} src='data:image/jpeg;base64,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' alt='img'/>
      { !data && <h1>Loading...</h1> }
      <h2 style={{padding:"10px",fontFamily:"monospace"}}>Details:- book created within 10mins</h2>
  
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
     
   </div>
    )
}
