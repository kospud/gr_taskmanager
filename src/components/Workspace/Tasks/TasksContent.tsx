import { useState, useEffect, useContext } from "react";
import { Column, TaskType } from "../../../types/types";
import KanbanBoard from "../../kanbanBoard/KanbanBoard";
import Loader from "../../Loader/Loader";
import { TasksToolBarContext } from "../../../providers/TasksToolBarProvider";
import {useGetTasksQuery} from "../../../types/graphql";


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
    const [loading, setLoading]=useState(true)
    const { loading: getTasksLoading, data: getTasksData, error: getTasksError } = useGetTasksQuery({
        variables: { userId: 10, projectId: null }
    })
    
    useEffect(() => {
        if (!getTasksError && getTasksData) {
            
            const tasks=getTasksData.stages.map((value):TaskType=>{
                return {id: value.stageId, object: value, columnId: getColumnId(value.statusId)}
            })
            setTasks(tasks)
        }
    }, [getTasksLoading])

    useEffect(()=>{
        if(tasks)
            setLoading(false)
    })

    return (
        <div className="tasksContent">
            {loading ? <Loader /> : <KanbanBoard columns={columns} tasks={tasks} setTasks={setTasks}></KanbanBoard>}
        </div>
        
    )

    function getColumnId(dataBaseId: number){
       const index=columns.findIndex((col)=>col.dataBaseId===dataBaseId)
       return columns[index].id
    }
}


export default TasksContent;