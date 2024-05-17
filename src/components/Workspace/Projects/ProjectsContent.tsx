import { useContext, useEffect, useState } from "react";
import { ToolBarContext } from "../../../providers/ProjectsToolBarProvider";
import KanbanBoard from "../../kanbanBoard/KanbanBoard";
import axios from "axios";
import { PROJECTS_BY_TYPE, TEMPLATES } from "../../../utils/consts";
import Loader from "../../Loader/Loader";
import { Toast } from "@skbkontur/react-ui";
import { Column, TaskType, dataBaseProject, projectType } from "../../../types";

function generateNumericID() {
    return Math.floor(Math.random() * 10001);
}

interface templateStageType {
    taskID: number,
    taskName: string,
    defaultOrder: number
}

const ProjectsContent = () => {

    const { currentProjectType, newProject } = useContext(ToolBarContext)!
    const [isLoading, setLoading] = useState(true)
    const [columns, setColumns] = useState<Column[]>([])
    const [projects, setProjects] = useState<TaskType[]>([])

    //Загрузка данных для доски
    useEffect(() => {


        //Получаем заголовки для досок
        axios.get(`${TEMPLATES}/${currentProjectType.typeID}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(response => {
                setColumns(
                    response.data.values.map((value: templateStageType) => { return { id: value.taskName, title: value.taskName, dataBaseId: value.taskID } })
                )
            })
            .catch(error => {
                let message: string;
                if (error?.response.data.values) {
                    message = error.response.data.values.message
                } else {
                    message = error.message
                }

                Toast.push(message, null, 1000)
            })
    }, [currentProjectType])

    useEffect(() => {
        //Получаем проекты

        setLoading(true);
        axios.get(`${PROJECTS_BY_TYPE}/${currentProjectType.typeID}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(response => {


                setProjects(response.data.values.map((value: dataBaseProject) => {
                    return {
                        id: generateNumericID(),
                        columnId: value.stageName,
                        object: value,
                        dataBaseId: value.stageID,
                        objectType: 'project'
                    }
                }))


            })
            .catch(error => {
                let message: string;
                if (error?.response.data.values) {
                    message = error.response.data.values.message
                } else {
                    message = error.message
                }

                Toast.push(message, null, 1000)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [newProject, currentProjectType])


    return (
        <div className="projectsContent">
            {isLoading ? <Loader /> : <KanbanBoard columns={columns} tasks={projects} setTasks={setProjects}></KanbanBoard>}
        </div>
    )
}

export default ProjectsContent;