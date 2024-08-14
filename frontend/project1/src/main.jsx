import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import {Provider} from 'react-redux'
import { store } from './store/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(

  
  <BrowserRouter>
    <AuthProvider>
    <Provider store={store}>
       <App />
      </Provider>
    </AuthProvider>
  </BrowserRouter>
  
  ,
)
