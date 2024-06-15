import { useContext, useEffect, useState } from "react";
import { ToolBarContext } from "../../../providers/ProjectsToolBarProvider";
import KanbanBoard from "../../kanbanBoard/KanbanBoard";
import axios from "axios";
import { PROJECTS_BY_TYPE, TEMPLATES } from "../../../utils/consts";
import Loader from "../../Loader/Loader";
import { Toast } from "@skbkontur/react-ui";
import { Column, TaskType, dataBaseProject, projectType } from "../../../types/types";

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

    return (
        <div className="projectsContent">
            {isLoading ? <Loader /> : <KanbanBoard columns={columns} tasks={projects} setTasks={setProjects}></KanbanBoard>}
        </div>
    )
}

export default ProjectsContent;