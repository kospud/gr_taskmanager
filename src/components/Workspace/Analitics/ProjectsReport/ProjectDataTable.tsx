import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { dataBaseTask } from '../../../../types';
import { useContext } from 'react';
import { AuthContext } from '../../../../providers/AuthProvider';
import { projectData } from './ProjectsReport';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Задача', width: 150 },
    { field: 'userName', headerName: 'Пользователь', width: 150 },
    { field: 'statusName', headerName: 'Статус', width: 100 },
    { field: 'endDatePlan', headerName: 'План. дата окончания', width: 100 },
    { field: 'endDateFact', headerName: 'Факт. дата окончания', width: 100 },
    { field: 'deadlineStatus', headerName: 'Соблюдение сроков', width: 200 }
];

interface Row {
    id: string,
    userName: string,
    statusName: string,
    endDatePlan: string,
    endDateFact: string,
    deadlineStatus: string
}



interface ProjectTableProps {
    tasks: projectData[]
}


export default function ProjectDataTable({ tasks }: ProjectTableProps) {

    const users = useContext(AuthContext)![2]

    const rows = tasks?.map(task => {

        const index = users.findIndex(elem => elem.userID === task.userID)
        const userName = index !== -1 ? users[index].userName : '';
        const endDatePlan = task.endDatePlan ? dataFormat(task.endDatePlan) : '';
        const endDateFact = task.endDateFact ? dataFormat(task.endDateFact) : '';
        const id = task.taskName;
        const statusName = task.statusName;
        const deadlineStatus = task.deadlineStatus

        return { id, userName, endDateFact, statusName, endDatePlan, deadlineStatus }
    })

    return (
        <div style={{ height: 'auto', width: '100%', backgroundColor: 'white' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowClassName={(params) => getColorToRow(params)}
            />
        </div>
    );

    function getColorToRow(params: GridRowParams<Row>) {

        const deadlineStatuses = ['Сроки соблюдены', 'Сроки не соблюдены', 'Не установлено']
        const deadlineStatusesColors = ['greenRow', 'redRow', '']


        const index = deadlineStatuses.findIndex(elem => elem === params.row.deadlineStatus)
        return deadlineStatusesColors[index]

    }

    function dataFormat(dateS: string) {
        const date = new Date(dateS)


        const formattedDate = date.toLocaleDateString('ru-RU');
        return formattedDate;
    }
}