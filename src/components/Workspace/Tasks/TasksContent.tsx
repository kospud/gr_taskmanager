import { useState, useEffect, useContext } from "react";
import { Column, TaskType, dataBaseTask } from "../../../types/types";
import KanbanBoard from "../../kanbanBoard/KanbanBoard";
import Loader from "../../Loader/Loader";
import { TasksToolBarContext } from "../../../providers/TasksToolBarProvider";
import {useGetTasksQuery } from "../../../types/graphql";


interface statusesFromServer {
    statusID: number,
    statusName: string
}

const mockColumns: Column[] = [
    { id: 'К выполнению', title: 'К выполнению', dataBaseId: 1 },
    { id: 'В работе', title: 'В работе', dataBaseId: 2 },
    { id: 'Завершено', title: 'Завершено', dataBaseId: 3 }

]


const TasksContent = () => {

    const [columns, setColumns] = useState<Column[]>(mockColumns)
    const [tasks, setTasks] = useState<TaskType[]>([])
    const { user, project } = useContext(TasksToolBarContext)!
    const [myLoading, setLoading]=useState(true)
    const { loading, data, error } = useGetTasksQuery({
        variables: { userId: 10, projectId: null }
    })
    useEffect(() => {
        if (!loading && data) {
            
            const tasks=data.getTasks.map((value):TaskType=>{
                return {id: value.stageId, object: value, columnId: value.status.statusName}
            })
            setTasks(tasks)
        }
    }, [loading])

    useEffect(()=>{
        if(tasks)
            setLoading(false)
    })

    return (
        <div className="tasksContent">
            {myLoading ? <Loader /> : <KanbanBoard columns={columns} tasks={tasks} setTasks={setTasks}></KanbanBoard>}
        </div>
        
    )
}


export default TasksContent;