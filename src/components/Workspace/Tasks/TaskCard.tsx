import { useContext } from "react"
import { AuthContext } from "../../../providers/AuthProvider"
import { CalendarMonth, Person, Task } from "@mui/icons-material"


interface TaskCardProps {
    task: { __typename: 'Projectstage', 
        stageId: number, 
        startDatePlan: string | null, 
        endDatePlan: string | null,
        statusId: number  
        task: { __typename: 'Task', taskId: number, taskName: string }, 
        project: { __typename: 'Project', projectId: number, projectName: string }, 
        user: { __typename: 'User', userId: number, userName: string, userSurname: string } | null 
        } 
}
const TaskCard = ({ task }: TaskCardProps) => {

    const users = useContext(AuthContext)![2]
    
    return (
        <div className="taskCard">
            <div className={`taskStatusline ${task.statusId !== 3 ? deadLineHeader(task.endDatePlan) : 'blue'}`}></div>
            <div className="taskContent">
                <a className="taskName">{task.task.taskName}</a>
                <a className="taskLine"><Task className="icon" />{task.project.projectName}</a>
                <div className="taskDates">
                    <CalendarMonth className='icon' />
                    <span>{dateFormat(task.startDatePlan)}</span>
                    <span>-</span>
                    <span>{dateFormat(task.endDatePlan)}</span>
                </div>
                <div className="taskUser">
                    <Person className="icon" />
                    <span>{`${task.user?.userName} ${task.user?.userSurname}`}</span>
                </div>
            </div>
        </div>
    )

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