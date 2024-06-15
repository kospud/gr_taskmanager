import { useContext } from "react"
import { dataBaseTask } from "../../../types/types"
import { AuthContext } from "../../../providers/AuthProvider"
import { CalendarMonth, Person, Task } from "@mui/icons-material"
import { DatePicker, Select } from "@skbkontur/react-ui"
import { GetTasksQuery } from "../../../types/graphql"

interface TaskCardProps {
    task: { __typename: 'Projectstage', 
        stageId: number, 
        startDatePlan: string | null, 
        endDatePlan: string | null, 
        status: { __typename: 'Stagestatus', statusId: number, statusName: string }, 
        task: { __typename: 'Task', taskId: number, taskName: string }, 
        project: { __typename: 'Project', projectId: number, projectName: string }, 
        user: { __typename: 'User', userId: number, userName: string, userSurname: string } | null 
        } 
}
const TaskCard = ({ task }: TaskCardProps) => {

    const users = useContext(AuthContext)![2]
    
    return (
        <div className="taskCard">
            <div className={`taskStatusline ${task.status.statusId != 3 ? deadLineHeader(task.endDatePlan) : 'blue'}`}></div>
            <div className="taskContent">
                <a className="taskName">{task.task.taskName}</a>
                <a className="taskLine"><Task className="icon" />{task.project.projectName}</a>
                <div className="taskDates">
                    <CalendarMonth className='icon' />
                    <DatePicker value={dateFormat(task.startDatePlan)} onValueChange={(value) => {task.startDatePlan=value}} />
                    <DatePicker value={dateFormat(task.endDatePlan)} onValueChange={() => { }} />
                </div>
                <div className="taskUser">
                    <Person className="icon" />
                    <Select className="user"></Select>
                </div>
            </div>
        </div>
    )

    function getUserValue(id: number | null) {
        if (id) {
            const index = users.findIndex(elem => elem.userID === id)
            return users[index].userName;
        } else
            return id;
    }
    function dateFormat(dateS: string | null) {
        if (dateS) {
            const date = new Date(dateS)

            const formattedDate = date.toLocaleDateString('ru-RU');
            return formattedDate;
        } else
            return null
    }

    function deadLineHeader(inputDate: string | null) {


        if (inputDate) {
            var today = new Date();
            today.setHours(0, 0, 0, 0);

            var inputDateObj = new Date(inputDate);
            inputDateObj.setHours(0, 0, 0, 0);

            // Сравниваем даты
            if (inputDateObj.getTime() === today.getTime()) {
                return 'yellow';
            } else if (inputDateObj < today) {
                return 'red';
            } else {
                return 'blue';
            }
        } else {
            return 'blue';
        }
    }
}

export default TaskCard