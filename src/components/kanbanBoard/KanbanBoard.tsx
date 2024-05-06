import { useState } from 'react'
import './kanbanBoard.css'
import { Column, TaskType } from '../../types'
import ColumnContainer from './column'
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { createPortal } from 'react-dom'
import Task from './Task'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'

const defTasks: TaskType[] = [{
    id: 1,
    columnId: 1,
    title: 'task 1'
},
{
    id: 2,
    columnId: 1,
    title: 'task 2'
},
{
    id: 3,
    columnId: 2,
    title: 'task 3'
}
]

const defColumns: Column[]= [
    {
        id: 1,
        title: 'column 1'
    },
    {
        id: 2,
        title: 'column 2'
    },
    {
        id: 3,
        title: 'column 3'
    }]

const KanbanBoard = () => {

    const [tasks, setTasks] = useState<TaskType[]>(defTasks)
    const [columns, setColumns] = useState<Column[]>(defColumns)
    const [activeTask, setActiveTask] = useState<TaskType | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    return (
        <div className="kanbanBoard">
            <DndContext
                sensors={sensors}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}>
                {
                    columns.map(column => <ColumnContainer
                        key={column.id}
                        column={column}
                        tasks={tasks.filter(task => task.columnId === column.id)}
                    ></ColumnContainer>)
                }
                <DragOverlay>
                    {activeTask && <Task task={activeTask} />}
                </DragOverlay>

            </DndContext>
        </div >
    )


    function onDragStart(event: DragStartEvent) {

        if (event.active.data.current?.type === "task") {
            setActiveTask(event.active.data.current.task);
            return;
        }
    }

    function onDragEnd(event: DragEndEvent) {

        setActiveTask(null);

        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;


        console.log("DRAG END");
    }

    function onDragOver(event: DragOverEvent) {

        
        const { active, over } = event;

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;
        const activeType=active.data.current?.type;
        const overType=active.data.current?.type;

        if (activeId === overId && activeType===overType) return;

        console.log(event)
        const isActiveTask = active.data.current?.type === 'task';
        const isOverATask = over.data.current?.type === 'task';
        //Сброс поверх задачи

        if (isActiveTask && isOverATask) {
            setTasks(tasks => {
                const activeIndex = tasks.findIndex(task => task.id === activeId)
                const overIndex = tasks.findIndex(task => task.id === overId)

                tasks[activeIndex].columnId = tasks[overIndex].columnId
                
                return arrayMove(tasks, activeIndex, overIndex)

            })
        }

        const isOverAColumn = over?.data.current?.type === "column";

        // Дроп задачи над колонкой
        if (isActiveTask && isOverAColumn) {
          setTasks((tasks) => {
            const activeIndex = tasks.findIndex((t) => t.id === activeId);
    
            tasks[activeIndex].columnId = overId;
            console.log("DROPPING TASK OVER COLUMN", { activeIndex });
            return arrayMove(tasks, activeIndex, activeIndex);
          });
        }

    }


}


export default KanbanBoard