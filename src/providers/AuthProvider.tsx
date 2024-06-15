import { PropsWithChildren, createContext, useEffect, useState } from "react"
import type { AuthContextType, UserListItemState } from '../types/types'
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
        authorized: true,
        userName: '',
        userEmail: '',
        userID: 0,
        token: ''
    })
    const [loading, setLoading] = useState(false)
    const [usersList, setUsersList] = useState<UserListItemState[]>([])

    
    return (
        <AuthContext.Provider value={[user, setUser, usersList]}>
            {loading ? <Loader /> : children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;