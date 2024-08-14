import React, { createContext, useState } from 'react'

export const AuthContext = createContext() ;

function AuthProvider({children}){
   let [tokenLogin,setTokenLogin] = useState("") ;

   return <AuthContext.Provider value={{tokenLogin,setTokenLogin}}> {children} </AuthContext.Provider>

}

export {AuthProvider} ;