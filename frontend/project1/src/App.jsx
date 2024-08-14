import { useEffect, useState } from 'react'
import { Login } from './components/Login'
import { Registration } from './components/Registration'
import { Data } from './components/Data'
import { Menu } from './components/Menu'
import { Routes, Route } from 'react-router-dom'
import { Home } from './components/Home'
import './App.css'
import { CreateBooks } from './components/CreateBooks'
import { SingleUserBooks } from './components/SingleUserBooks'
import { BookTime } from './components/BookTime'
import { BookNew } from './components/BookNew'

function App() {
  

  return (
    <>
    <Menu/>
   <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Registration/>} />
      <Route path='/data' element={<Data/>} />
      <Route path='/create' element={<CreateBooks/>} />
      <Route path='/view' element={<SingleUserBooks/>} />
      <Route path='/books/old' element={<BookTime/>} />
      <Route path='/books/new' element={<BookNew/>} />
   </Routes>

    </>
  )
}

export default App
