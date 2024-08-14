import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Menu = () => {
    let navigate = useNavigate() ;
  return (
    <div style={{display:"flex", justifyContent:"space-around",flexWrap:"wrap", fontSize:"16px", fontFamily:"monospace",letterSpacing:"0.2px", backgroundColor:"rgb(22,33,45)", padding:"50px", color:"whitesmoke"}}>
        <div onClick={()=>navigate('/')}>Home</div>
        <div onClick={()=>navigate('/data')}>View Books</div>
        <div onClick={()=>navigate('/login')}>Login</div>
        <div onClick={()=>navigate('/register')}>Registration</div>
        <div onClick={()=>navigate('/create')}>Create Book</div>
        <div onClick={()=>navigate('/view')}>Users Book</div>
        <div onClick={()=>navigate('/books/old')}>Old</div>
        <div onClick={()=>navigate('/books/new')}>New</div>
    </div>
  )
}
