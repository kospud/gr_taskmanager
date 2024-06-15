import { Tabs } from "@skbkontur/react-ui";
import { useState } from "react";
import './Analytics.css'
import ProjectsReport from "./ProjectsReport/ProjectsReport";
import UsersReport from "./UsersReport/UsersReport";
import GeneralReport from "./GeneralReport/GeneralReport";


const componentsByName: Record<string, any> = {
    "General": <GeneralReport />,
    "Projects": <ProjectsReport />,
    "Users": <UsersReport />
}

const Analytics = () => {

    const [active, setActive] = useState('General');
    const component = componentsByName[active]

    return (
        <div className="analytics">
            <Tabs value={active} onValueChange={setActive}>
                <Tabs.Tab id="General">Задачи</Tabs.Tab>
                <Tabs.Tab id="Projects">Проекты</Tabs.Tab>
                <Tabs.Tab id="Users">Пользователи</Tabs.Tab>
            </Tabs>
            {component}
        </div>
    )
}

export default Analytics;