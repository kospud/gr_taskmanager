import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities'
import { TaskType } from "../../types";

interface TaskProps {
    task: TaskType
}

const Task = ({ task }: TaskProps) => {

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
            className="task">{`Task ${task.id}`}
        </div>
    )
}

export default Task;