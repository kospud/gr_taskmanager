import { createContext, memo, useEffect, useState } from 'react'
import './kanbanBoard.css'
import { Column, KanbanBoardContextType, TaskType } from '../../types/types'
import ColumnContainer from './column'
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, UniqueIdentifier, useSensor, useSensors } from '@dnd-kit/core'
import Task from './Task'
import { arrayMove } from '@dnd-kit/sortable'
import { TaskSidePage } from '../Workspace/Tasks/SidePage'
import { UpdateStageInput, useUpdateStageMutation } from '../../types/graphql'
import { Toast } from '@skbkontur/react-ui'
import { ApolloError } from '@apollo/client'

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
    const [updateStage, { loading: updateStageLoading, data: updateStageData, error: updateStageError }] = useUpdateStageMutation()

    useEffect(() => {
        if (editTaskId) {
            setSidePageOpened(true)
        }
    }, [editTaskId])

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    useEffect(() => {
        if (updateStageError) {
            Toast.push(updateStageError.message, null, 1500)
            setTasks(prevTasks => { return prevTasks })
        }

    }, [updateStageError])

    return (
        <KanbanBoardContext.Provider value={{ editTaskId, setEditTask }}>
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
            {sidePageOpened && <TaskSidePage taskId={editTaskId!} close={close} updateStage={updateStageFunc} />}
        </KanbanBoardContext.Provider>
    )

    function close() {
        setEditTask(null)
        setSidePageOpened(false)
    }

    async function updateStageFunc(stage: UpdateStageInput) {

        try {
            const result = await updateStage({
                variables: {
                    data: {
                        ...stage
                    }
                }
            })

            const data = result.data
            if (data) {
                const updateStage = data.updateStage
                const index = tasks.findIndex(task => task.id === updateStage.stageId)
                setTasks(prevTask => {
                    prevTask[index].object = updateStage
                    prevTask[index].columnId = columns.find(col => col.dataBaseId === updateStage.statusId)!.id
                    return prevTask
                })
            }
        } catch (error: any) {
            if (activeTask!==null) {
                setActiveTask(prevTask => {
                    prevTask!.columnId = columns.find(col => col.dataBaseId === prevTask!.object.statusId)!.id
                    return prevTask
                })
            }
            Toast.push(error.message, null, 1500)
        }

    }

    function onDragStart(event: DragStartEvent) {

        if (event.active.data.current?.type === "task") {
            setActiveTask(event.active.data.current.task);
            return;
        }
    }

    async function onDragEnd(event: DragEndEvent) {

        const targetColumnDataBaseId = columns.find(col => col.id === activeTask?.columnId)?.dataBaseId
        const updateTask: UpdateStageInput = { stageId: activeTask?.id as number, statusId: targetColumnDataBaseId }
        await updateStageFunc(updateTask)
        setActiveTask(null);

        const { active, over } = event;

        if (!over) return;

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