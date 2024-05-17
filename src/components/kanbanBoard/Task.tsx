import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities'
import { TaskType, dataBaseProject, dataBaseTask } from "../../types";
import { memo, useState } from "react";
import ProjectCard from "../Workspace/Projects/ProjectCard";
import TaskCard from "../Workspace/Tasks/TaskCard";

const filterUser = ['пользователь (none)', 'Константин Пудов (Я)', 'Тимур Тимуров', 'Иван Иванов']

interface TaskProps {
    task: TaskType
    className?: string
    onValueChange?: () => {}
}

const Task = memo(({ task, className }: TaskProps) => {

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
    //Костыль позже исправлю
    switch (task.objectType) {
        case 'project':
            return (
                <div ref={setNodeRef}
                    style={style}
                    {...attributes}
                    {...listeners}
                    className={`task ${className}`}>
                    <ProjectCard project={task.object as dataBaseProject} />
                </div>
            )
        case 'task':
            return (
                <div ref={setNodeRef}
                    style={style}
                    {...attributes}
                    {...listeners}
                    className={`task ${className}`}>
                    <TaskCard task={task.object as dataBaseTask} />
                </div>
            )
        default:
            return (
                <div ref={setNodeRef}
                    style={style}
                    {...attributes}
                    {...listeners}
                    className={`task ${className}`}>
                    taskCard
                </div>
            )
    }




})

export default Task;