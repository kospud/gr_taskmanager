
import ProjectsToolBarProvider from '../../../providers/ProjectsToolBarProvider';
import './Projects.css'
import ProjectsContent from './ProjectsContent';
import ProjectsToolBar from "./ProjectsToolBar";


const Projects = () => {
    return (
        <div className="projects">
            <ProjectsToolBarProvider>
                <ProjectsToolBar></ProjectsToolBar>
                <ProjectsContent></ProjectsContent>
            </ProjectsToolBarProvider>
        </div>
    )
}

export default Projects;