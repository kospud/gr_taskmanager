import { Button,  Select } from '@skbkontur/react-ui'
import { useContext, useState } from 'react';
import { ToolBarContext } from '../../../providers/ProjectsToolBarProvider';

const ProjectsToolBar = () => {

    const toolBar = useContext(ToolBarContext)!
    const [projectTypes, setProjectTypes] = useState(toolBar.projectTypes)
    const [currentType, setCurrentType] = useState(toolBar.currentProjectType.typeName)

    const items=projectTypes.map(item=>item.typeName)

    const setCurrentProjectType=(value: string)=>{
        const newValue=projectTypes.find(element=>{
            return element.typeName===value})
        toolBar.setCurrentProjectType(newValue!);
        setCurrentType(value);
    }
    return (
        <div className="projectsToolBar">
            <Select items={items} value={currentType} onValueChange={setCurrentProjectType}/>
            <Button>Добавить проект</Button>
        </div>
    )
}

export default ProjectsToolBar;