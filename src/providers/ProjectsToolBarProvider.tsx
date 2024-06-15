import { PropsWithChildren, createContext, useEffect, useState } from "react"
import axios from "axios"
import Loader from "../components/Loader/Loader"
import type { projectType, projectsToolBarContext } from '../types/types'
import { TEMPLATES } from "../utils/consts";
import { Toast } from "@skbkontur/react-ui";

export const ToolBarContext = createContext<projectsToolBarContext>(undefined);

const ProjectsToolBarProvider = ({ children }: PropsWithChildren) => {

    const [loading, setLoading] = useState(true)
    const [projectTypes, setProjectTypes] = useState<projectType[]>([])
    const [currentType, setCurrentType] = useState<projectType>({ typeID: 0, typeName: 'none' })
    const [newProject, setNewProject] = useState<number | null>(null)

    return (
        <ToolBarContext.Provider value={{
            projectTypes: projectTypes,
            currentProjectType: currentType,
            setCurrentProjectType: setCurrentType,
            newProject: newProject,
            setNewProject: setNewProject
        }}>
            {loading ? <Loader /> : children}
        </ToolBarContext.Provider>
    )
}

export default ProjectsToolBarProvider;