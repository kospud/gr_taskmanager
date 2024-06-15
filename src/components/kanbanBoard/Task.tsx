import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities'
import { TaskType, dataBaseProject, dataBaseTask } from "../../types/types";
import { memo, useContext, useState } from "react";
import TaskCard from "../Workspace/Tasks/TaskCard";
import { TaskSidePage } from "../Workspace/Tasks/SidePage";
import { KanbanBoardContext } from "./KanbanBoard";

const filterUser = ['пользователь (none)', 'Константин Пудов (Я)', 'Тимур Тимуров', 'Иван Иванов']

interface TaskProps {
    task: TaskType
    className?: string
    onValueChange?: () => {}
}

const Task = memo(({ task, className }: TaskProps) => {

    const {setEditTask}=useContext(KanbanBoardContext)!
    const [user, setUser] = useState(filterUser[0])
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: task.id,
        data: {
            type: "task",
            task
        }
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    //Если задача перетаскивается возвращаем силуэт
    if (isDragging) {
        return <div
            ref={setNodeRef}
            style={style}
            className="task draggable" />
    }

    return (
        <div ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={()=>setEditTask(task.id)}
            className={`task ${className}`}>
            <TaskCard task={task.object} />
        </div>
    )
})



export default Task;