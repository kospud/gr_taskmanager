import { PropsWithChildren, createContext, useEffect, useState } from "react"
import type { AuthContextType, UserListItemState } from '../types'
import axios from "axios"
import Loader from "../components/Loader/Loader"
import { AUTH_USER, USERS } from "../utils/consts"
import { Toast } from "@skbkontur/react-ui"


export const AuthContext = createContext<AuthContextType>(undefined)

interface UserValue {
    userID: number,
    userName: string,
    userSurname: string,
    userEmail: string
}

const AuthProvider = ({ children }: PropsWithChildren) => {

    const [user, setUser] = useState({
        authorized: false,
        userName: '',
        userEmail: '',
        userID: 0,
        token: ''
    })
    const [loading, setLoading] = useState(true)
    const [usersList, setUsersList]=useState<UserListItemState[]>([])

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
                        token: token,
                        userID: userData.userID
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
        }
    }, [])

    useEffect(()=>{
        axios.get(USERS, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(response => {
                setUsersList(response.data.values.map((value: UserValue) => {
                    return { userID: value.userID, userName: `${value.userName} ${value.userSurname}` }
                }))
            })
            .catch(error => {
                let message: string;
                if (error?.response.data.values) {
                    message = error.response.data.values.message
                } else {
                    message = error.message
                }
                Toast.push(message, null, 1000)
            })
            .finally(() => {
                setLoading(false)
            })
    },[])

    return (
        <AuthContext.Provider value={[user, setUser, usersList]}>
            {loading? <Loader/> : children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;