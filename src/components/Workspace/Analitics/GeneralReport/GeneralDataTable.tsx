import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { dataBaseTask } from '../../../../types';
import { useContext } from 'react';
import { AuthContext } from '../../../../providers/AuthProvider';

const columns: GridColDef[] = [
  {field: 'id', headerName: 'id', width: 0 },
  { field: 'taskName', headerName: 'Задача', width: 150 },
  { field: 'projectName', headerName: 'Проект', width: 150 },
  { field: 'userName', headerName: 'Пользователь', width: 300 },
  { field: 'endDatePlan', headerName: 'Плановая дата окончания', width: 200 },
  { field: 'endDateFact', headerName: 'Фактическая дата окончания', width: 200}
];



interface GeneralTableProps {
  tasks: dataBaseTask[];
}
export default function GeneralDataTable({ tasks }: GeneralTableProps) {

  const users = useContext(AuthContext)![2]

  const rows = tasks?.map(task => {

    
    const index = users.findIndex(elem => elem.userID === task.userID)
    const userName = index !== -1 ? users[index].userName : '';
    const endDatePlan = task.endDatePlan ? dataFormat(task.endDatePlan) : '';
    const endDateFact = task.endDateFact ? dataFormat(task.endDateFact) : '';
    const projectName=task.projectName;
    const taskName=task.taskName;
    const id=taskName+projectName;
    return {id, taskName, projectName, userName, endDatePlan, endDateFact};

  })

  return (
    <div style={{ height: '450px', width: '100%', backgroundColor: 'white' }}>
      <DataGrid
        rows={rows}
        columns={columns}
      />
    </div>
  );

  function dataFormat(dateS: string) {
    const date = new Date(dateS)


    const formattedDate = date.toLocaleDateString('ru-RU');
    return formattedDate;
  }
}