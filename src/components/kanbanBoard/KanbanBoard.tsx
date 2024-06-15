import { createContext, memo, useEffect, useState } from 'react'
import './kanbanBoard.css'
import { Column, KanbanBoardContextType, TaskType } from '../../types/types'
import ColumnContainer from './column'
import { DndContext, DragEndEvent, DragMoveEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, UniqueIdentifier, closestCorners, useSensor, useSensors } from '@dnd-kit/core'
import { createPortal } from 'react-dom'
import Task from './Task'
import { arrayMove } from '@dnd-kit/sortable'
import { TaskSidePage } from '../Workspace/Tasks/SidePage'
import { close } from 'inspector'

export const KanbanBoardContext = createContext<KanbanBoardContextType>(undefined)

interface KanbanBoardProps {
    columns: Column[],
    tasks: TaskType[]
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>
}

const KanbanBoard = memo(({ columns, tasks, setTasks }: KanbanBoardProps) => {

    const [activeTask, setActiveTask] = useState<TaskType | null>(null);
    const [editTaskId, setEditTask] = useState<UniqueIdentifier | null>(null);
    const [sidePageOpened, setSidePageOpened] = useState(false)

    useEffect(()=>{
        if(editTaskId){
            setSidePageOpened(true)
        }
    },[editTaskId])

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    return (
        <KanbanBoardContext.Provider value={{editTaskId, setEditTask}}>
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
                        {activeTask && <Task className='draggable' task={activeTask} />}
                    </DragOverlay>

                </DndContext>
            </div >
            {sidePageOpened && <TaskSidePage taskId={editTaskId!} close={close}/>}
        </KanbanBoardContext.Provider>
    )

    function close(){
        setEditTask(null)
        setSidePageOpened(false)
    }

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
        //if (activeId === overId) return;

        console.log("DRAG END");
    }

    function onDragOver(event: DragOverEvent) {

        const { active, over } = event;

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;
        const activeType = active.data.current?.type;
        const overType = active.data.current?.type;

        if (activeId === overId && activeType === overType) return;


        const isActiveTask = active.data.current?.type === 'task';
        const isOverATask = over.data.current?.type === 'task';
        const isOverAColumn = over?.data.current?.type === "column";

        const activeTaskColumn = tasks[getTaskPosition(activeId)].columnId

        if (activeTaskColumn === overId) return;

        //Поверх задач
        if (isActiveTask && isOverATask) {
            setTasks(tasks => {
                const activeIndex = tasks.findIndex(task => task.id === activeId)
                const overIndex = tasks.findIndex(task => task.id === overId)

                tasks[activeIndex].columnId = tasks[overIndex].columnId

                return arrayMove(tasks, activeIndex, overIndex)
            })
        }

        // Дроп задачи над колонкой

        if (isActiveTask && isOverAColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);

                tasks[activeIndex].columnId = overId;

                return arrayMove(tasks, activeIndex, activeIndex);
            });
        }

    }

    function getTaskPosition(id: UniqueIdentifier) {
        return tasks.findIndex(task => task.id === id)
    }

})

export default KanbanBoard;