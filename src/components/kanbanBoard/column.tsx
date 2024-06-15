import { SortableContext } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import type { Column, TaskType } from "../../types/types"
import Task from "./Task";
import { useEffect, useMemo, useState } from "react";

interface ColumnProps {
    column: Column,
    tasks: TaskType[]
}

const ColumnContainer = ({ column, tasks }: ColumnProps) => {

    const taskIds = useMemo(() => {
        return tasks.map(task => task.id)
    }, [tasks])

    const [tasksCount, setCount] = useState(tasks.length)

    const { setNodeRef } = useDroppable({
        id: column.id,
        data: {
            type: 'column',
            column
        }
    })

    useEffect(() => { setCount(tasks.length) }, [tasks])
    return (
        <div className="columnContainer">
            <div className="columnTitle">
                <div className="columnTitleText">{column.title}</div>
                <div className="columnTitleCount">{tasksCount}</div>
            </div>
            <div ref={setNodeRef} className="columnContent">
                <SortableContext items={taskIds}>
                    {
                        tasks.map(task => <Task key={task.id} task={task} />)
                    }
                </SortableContext>
            </div>
        </div>

    )
}

export default ColumnContainer;