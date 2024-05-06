import { PropsWithChildren, createContext, useEffect, useState } from "react"
import type { AuthContextType } from '../types'
import axios from "axios"
import Loader from "../components/Loader/Loader"
import { AUTH_USER } from "../utils/consts"
import { Toast } from "@skbkontur/react-ui"


export const AuthContext = createContext<AuthContextType>(undefined)

const AuthProvider = ({ children }: PropsWithChildren) => {

    const [user, setUser] = useState({
        authorized: false,
        userName: '',
        userEmail: '',
        token: ''
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {

            axios.get(AUTH_USER, {
                headers: {
                    'Authorization': token
                }
            })
                .then(response => {
                    const userData = response.data?.values[0]
                    const userState={
                        authorized: true, 
                        userName: `${userData.userName} ${userData.userSurname}`, 
                        userEmail: userData.userEmail, 
                        token: token
                    }
                    setUser(userState)
                })
                .catch(error => {
                    let message: string;
                    if (error?.response) {
                        message = error.response.data.values.message
                    } else {
                        message = error.message
                    }
    
                    Toast.push(message, null, 1000)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
        else{
            setLoading(false)
        }
    }, [])

    return (
        <AuthContext.Provider value={[user, setUser]}>
            {loading? <Loader/> : children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;