import { Button, Checkbox, DatePicker, Input, Select, SidePage, Textarea, Toast } from '@skbkontur/react-ui'
import { Dispatch, useContext, useEffect, useState } from 'react';
import { ToolBarContext } from '../../../providers/ProjectsToolBarProvider';
import Loader from '../../Loader/Loader';
import axios from 'axios';
import { PROJECTS, TEMPLATES, USERS } from '../../../utils/consts';
import { AuthContext } from '../../../providers/AuthProvider';

const ProjectsToolBar = () => {

    const toolBar = useContext(ToolBarContext)!
    const [projectTypes, setProjectTypes] = useState(toolBar.projectTypes)
    const [currentType, setCurrentType] = useState(toolBar.currentProjectType.typeName)
    const [currentTypeId, setCurrentTypeId] = useState(toolBar.currentProjectType.typeID)
    const [sideBarOpened, setOpened] = useState(false)

    const items = projectTypes.map(item => item.typeName)

    const setCurrentProjectType = (value: string) => {
        const newValue = projectTypes.find(element => {
            return element.typeName === value
        })
        toolBar.setCurrentProjectType(newValue!);
        setCurrentType(value);
    }

    return (
        <div className="projectsToolBar">
            <Select items={items} value={currentType} onValueChange={setCurrentProjectType} />
            <Button onClick={open}>Добавить проект</Button>
            {sideBarOpened && <NewProjectSidePage setOpenFunc={setOpened} currentType={currentTypeId} />}
        </div>
    )
    function open() {
        setOpened(true);
    }

}

//Боковая панель для кнопки создать проект
interface NewProjectSidePageProps {
    setOpenFunc: Dispatch<React.SetStateAction<boolean>>,
    currentType: number
}

interface TemplateValue {
    taskID: number,
    taskName: string,
    defaultOrder: number
}


interface StateUserValue {
    userID: number,
    userName: string
}

interface taskState {
    taskID: number,
    taskName: string,
    userID: number | null,
    startDatePlan: string | null,
    endDatePlan: string | null,
    statusID: number,
    stageNumber: number,
    stageDescription: string,
    ended: boolean
}


function NewProjectSidePage({ setOpenFunc, currentType }: NewProjectSidePageProps) {

    const [projectName, setProjectName] = useState('')
    const [projectDescription, setDescription] = useState('')
    const users = useContext(AuthContext)![2]
    const [userId, setUserId] = useState<number | null>(null);
    const [tasks, setTasks] = useState<taskState[]>([]);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { setNewProject } = useContext(ToolBarContext)!

    //Загрузить шаблоны задач
    useEffect(() => {
        setLoading(true);

        //Получаем заголовки для досок
        axios.get(`${TEMPLATES}/${currentType}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(response => {
                setTasks(response.data.values.map((value: TemplateValue): taskState => {
                    return {
                        taskID: value.taskID,
                        taskName: value.taskName,
                        userID: null,
                        startDatePlan: null,
                        endDatePlan: null,
                        statusID: 1,
                        stageNumber: value.defaultOrder,
                        stageDescription: "",
                        ended: false
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

    }, [])


    return (
        <SidePage width="50%" onClose={close}>
            <SidePage.Header>Новый проект</SidePage.Header>
            {
                loading ? <Loader /> : (<SidePage.Body>
                    <div className="sidePageBody">
                        <a>Наименование проекта:</a>
                        <Input value={projectName} onValueChange={setProjectName} />
                        <a>Сроки проекта:</a>
                        <div className="sidePageDates">
                            <a>Начало:</a>
                            <DatePicker value={startDate} onValueChange={setStartDate}></DatePicker>
                            <a>Окончание:</a>
                            <DatePicker value={endDate} onValueChange={setEndDate}></DatePicker>
                        </div>
                        <a>Пользователь:</a>
                        <Select items={users.map((value): string => value.userName)} onValueChange={setCurrentUser}></Select>
                        <a>Описание проекта:</a>
                        <Textarea value={projectDescription} onValueChange={setDescription}></Textarea>
                        <div className="stages">
                            {
                                tasks.map((value, index) => <ProjectStage key={index} stage={value} onValueChange={onValueChange} users={users}></ProjectStage>)
                            }
                        </div>
                    </div>
                </SidePage.Body>)
            }
            <SidePage.Footer panel>
                <Button use="success" size='large' onClick={postProject}>Дабавить</Button>
            </SidePage.Footer>
        </SidePage >
    )

    function onValueChange(index: number, value: taskState) {

        let newTasks = [...tasks];
        newTasks[index] = value;
        setTasks(newTasks)
    }

    function postProject() {

        const project = {
            projectName: projectName,
            userID: userId,
            typeID: currentType,
            projectDescription: projectDescription,
            startDatePlan: formatDateString(startDate),
            endDatePlan: formatDateString(endDate),
            stages: tasks.map(value => {
                return {
                    taskID: value.taskID,
                    userID: value.userID,
                    startDatePlan: formatDateString(value.startDatePlan as string),
                    endDatePlan: formatDateString(value.endDatePlan as string),
                    statusID: value.statusID,
                    stageNumber: value.stageNumber,
                    stageDescription: value.stageDescription
                }
            })
        }

        axios.post(PROJECTS, project, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(response => {

                Toast.push('Проект добавлен!', null, 1000)
                setNewProject(response.data.values.project.insertedId);
                close();
            })
            .catch(error => {
                let message: string;
                if (error?.response) {
                    message = error.response.data.values.message
                } else {
                    message = error.message
                }

                Toast.push(message, null, 1000)
            })
            .finally(() => {
                setLoading(false)
            })

    }

    function close() {
        setOpenFunc(false);
    }

    function setCurrentUser(user: string) {
        const index = users.findIndex(element => element.userName === user);
        setUserId(users[index].userID);
    }
}

interface ProjectStageProps {
    stage: taskState,
    onValueChange: (index: number, value: taskState) => void
    users: StateUserValue[]
}

function ProjectStage({ stage, onValueChange, users }: ProjectStageProps) {

    const [done, setDone] = useState(false)
    const statusArray = [
        {
            statusName: 'К выполнению',
            statusID: 1,
        },
        {
            statusName: 'В работе',
            statusID: 2,
        },
        {
            statusName: 'Выполнено',
            statusID: 3,
        },]

    let userIndex = users.findIndex(element => element.userID === stage.userID)
    let statusIndex = statusArray.findIndex(element => element.statusID === stage.statusID)
    return (
        <div className={`projectStage ${done && 'done'}`}>
            <a>{stage.taskName}</a>
            <div className="sidePageDates">
                <a>Начало:</a>
                <DatePicker value={stage.startDatePlan} onValueChange={setStartDate}></DatePicker>
                <a>Окончание:</a>
                <DatePicker value={stage.endDatePlan} onValueChange={setEndDate}></DatePicker>
            </div>
            <div className="sidePageDates">
                <a>Пользователь</a>
                <Select items={users.map(element => element.userName)} value={users[userIndex]?.userName} onValueChange={setUser}></Select>
                <a>Статус</a>
                <Select items={statusArray.map(elem => elem.statusName)} value={statusArray[statusIndex].statusName} onValueChange={setStatus}></Select>
            </div>
        </div>
    )

    function setStatus(status: string) {

        let index = statusArray.findIndex(element => element.statusName === status)
        stage.statusID = statusArray[index].statusID
        if (status === statusArray[2].statusName)
            setDone(true)
        else
            setDone(false)
        onValueChange(stage.stageNumber, stage)


    }
    function setUser(user: string) {

        let index = users.findIndex(element => element.userName === user)
        stage.userID = users[index].userID;
        onValueChange(stage.stageNumber, stage)

    }
    function setStartDate(date: string) {
        stage.startDatePlan = date;
        onValueChange(stage.stageNumber, stage);
    }

    function setEndDate(date: string) {
        stage.endDatePlan = date;
        onValueChange(stage.stageNumber, stage);
    }
}

function formatDateString(inputDateString: string) {
    // Разбиваем строку на день, месяц и год

    if (inputDateString === null) return null;
    let parts = inputDateString.split('.');

    // Форматируем дату в нужный формат для MySQL
    let formattedDate = parts[2] + '.' + parts[1] + '.' + parts[0];

    return formattedDate;
}

export default ProjectsToolBar;