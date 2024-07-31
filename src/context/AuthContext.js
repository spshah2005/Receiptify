import React, {useContext, useState, useEffect} from "react"
import {auth} from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()

    function signup(email,password) {
        return auth.createUserWithEmailAndPassword(email,password)
    }

    function login(email,password) {
        return auth.signInWithEmailAndPassword(email,password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(newEmail) {
        currentUser.updateEmail(newEmail)
    }

    function updatePassword(password){
        currentUser.updatePassword(password)
    }

    useEffect(()=> {
        const unsubscribe =  auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
            console.log('log in/out')
        })
        return unsubscribe
    }, []) //empty dependency array to only run on mount

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
    }

    return (
     <AuthContext.Provider value={value}>
        {children}
     </AuthContext.Provider>
    );
  }