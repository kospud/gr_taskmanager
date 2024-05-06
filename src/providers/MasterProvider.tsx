import { PropsWithChildren } from "react"
import AuthProvider from "./AuthProvider"


const MasterProvider=({children}: PropsWithChildren)=>{
    return(
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}

export default MasterProvider