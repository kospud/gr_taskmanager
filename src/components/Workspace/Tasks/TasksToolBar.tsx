import { Select, Toggle } from "@skbkontur/react-ui"
import { useContext, useEffect, useState } from "react"
import { TasksToolBarContext } from "../../../providers/TasksToolBarProvider"



const TasksToolBar = () => {

    const { users, user, setUser, projects, project, setProject, myTasksChecked, setMyTasksChecked } = useContext(TasksToolBarContext)!

    return (
        <div className="tasksToolBar">
            <Toggle defaultChecked captionPosition="left" onValueChange={setMyTasksChecked}>
                Мои задачи
            </Toggle>
            <a>Пользователь:</a>
            <Select disabled={myTasksChecked} items={users.map(elem => elem.userName)} value={user.userName} onValueChange={changeUserFilter} />
            <a>Проект:</a>
            <Select items={projects.map(elem => elem.projectName)} value={project?.projectName} onValueChange={changeProjectFilter}></Select>
        </div>
    )


    function changeProjectFilter(selectedValue: string) {
        const index = projects.findIndex(elem => elem.projectName === selectedValue)
        setProject(projects[index])
    }

    function changeUserFilter(selectedValue: string) {
        const index = users.findIndex(elem => elem.userName === selectedValue)
        setUser(users[index])
    }
}

export default TasksToolBar