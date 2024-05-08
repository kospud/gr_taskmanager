import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { UserListItemState, projectListItemState, taskToolBarContext } from "../types";
import { AuthContext } from "./AuthProvider";
import axios from "axios";
import { PROJECTS } from "../utils/consts";
import { Toast } from "@skbkontur/react-ui";
import Loader from "../components/Loader/Loader";


export const TasksToolBarContext = createContext<taskToolBarContext>(undefined)

const TaskToolBarProvider = ({ children }: PropsWithChildren) => {

    const users: UserListItemState[] = [{ userID: 0, userName: 'не выбрано' }, ...useContext(AuthContext)![2]]
    const currentUser = useContext(AuthContext)![0]!
    const [user, setUser] = useState<UserListItemState>(users[0])
    const [projects, setProjects] = useState<projectListItemState[]>([])
    const [project, setProject] = useState<projectListItemState>({ projectID: 0, projectName: 'не выбрано' })
    const [myTasksChecked, setMyTasksChecked] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
       
        if (myTasksChecked) {
            const index = users.findIndex(elem => elem.userID === currentUser.userID)
            setUser(users[index])
        } else{
            setUser(users[0])
        }
        
    }, [myTasksChecked])

    //Проекты
    useEffect(() => {
        axios.get(PROJECTS, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then(response => {
                setProjects([project, ...response.data.values])
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
    }, [])

    return (
        <TasksToolBarContext.Provider value={{ users, user, setUser, projects, project, setProject, myTasksChecked, setMyTasksChecked }}>
            {loading ? <Loader /> : children}
        </TasksToolBarContext.Provider>
    )
}

export default TaskToolBarProvider
