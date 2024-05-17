import { Toast } from "@skbkontur/react-ui";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Column, TaskType, dataBaseTask } from "../../../types";
import { STATUSES, TASKS } from "../../../utils/consts";
import KanbanBoard from "../../kanbanBoard/KanbanBoard";
import Loader from "../../Loader/Loader";
import { TasksToolBarContext } from "../../../providers/TasksToolBarProvider";
import { TaskRounded } from "@mui/icons-material";

interface statusesFromServer {
    statusID: number,
    statusName: string
}

const TasksContent = () => {

    const [columns, setColumns] = useState<Column[]>([])
    const [tasks, setTasks] = useState<TaskType[]>([])
    const [loading, setLoading] = useState(true);
    const { user, project } = useContext(TasksToolBarContext)!

    useEffect(() => {

        axios.get(STATUSES, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(response => {
                setColumns(
                    response.data.values.map((value: statusesFromServer) => { return { id: value.statusName, title: value.statusName, dataBaseId: value.statusID } })
                )

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

        axios.get(TASKS, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(response => {

                setTasks(response.data.values.map((value: dataBaseTask) => {
                    return {
                        id: generateNumericID(),
                        columnId: value.statusName,
                        dataBaseId: [value.projectID, value.taskID],
                        object: value,
                        objectType: 'task'
                    }
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
    }, [])

    return (
        <div className="tasksContent">
            {loading ? <Loader /> : <KanbanBoard columns={columns} tasks={tasks.filter(elem => taskFilter(elem))} setTasks={setTasks}></KanbanBoard>}
        </div>
    )

    function taskFilter(task: TaskType) {

        const { userID, projectID } = task.object as dataBaseTask;

        if (user.userID !== 0 && project.projectID !== 0)
            return userID === user.userID && projectID === project.projectID;
        else if (user.userID !== 0)
            return userID === user.userID
        else if (project.projectID !== 0)
            return projectID === project.projectID
        else
            return true;
    }
}


function generateNumericID() {

    return Math.floor(Math.random() * 10001);
}

export default TasksContent;