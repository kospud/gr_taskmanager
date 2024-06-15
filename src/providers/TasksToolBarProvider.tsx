import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { UserListItemState, projectListItemState, taskToolBarContext } from "../types/types";
import { AuthContext } from "./AuthProvider";
import Loader from "../components/Loader/Loader";


export const TasksToolBarContext = createContext<taskToolBarContext>(undefined)

const TaskToolBarProvider = ({ children }: PropsWithChildren) => {

    const users: UserListItemState[] = [{ userID: 0, userName: 'не выбрано' }, ...useContext(AuthContext)![2]]
    const currentUser = useContext(AuthContext)![0]!
    const [user, setUser] = useState<UserListItemState>(users[0])
    const [projects, setProjects] = useState<projectListItemState[]>([])
    const [project, setProject] = useState<projectListItemState>({ projectID: 0, projectName: 'не выбрано' })
    const [myTasksChecked, setMyTasksChecked] = useState(true)
    const [loading, setLoading] = useState(false)

    return (
        <TasksToolBarContext.Provider value={{ users, user, setUser, projects, project, setProject, myTasksChecked, setMyTasksChecked }}>
            {loading ? <Loader /> : children}
        </TasksToolBarContext.Provider>
    )
}

export default TaskToolBarProvider
