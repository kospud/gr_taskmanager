import { SortableContext } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import type { Column, TaskType } from "../../types"
import Task from "./Task";
import { useMemo } from "react";

interface ColumnProps {
    column: Column,
    tasks: TaskType[]
}

const ColumnContainer = ({column, tasks}: ColumnProps) => {

    const taskIds = useMemo(() => {
        return tasks.map(task => task.id)
    }, [tasks])

    const { setNodeRef } = useDroppable({
        id: column.id,
        data: {
            type: 'column',
            column
        }
    })

    return (
        <div ref={setNodeRef} className="columnContainer">
            <div className="columnTitle">
                <div className="columnTitleText">{column.title}</div>
                <div className="columnTitleCount">0</div>
            </div>
            <div className="columnContent">
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