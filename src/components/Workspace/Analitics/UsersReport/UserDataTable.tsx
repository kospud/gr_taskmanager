import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { dataBaseTask } from '../../../../types';
import { useContext } from 'react';
import { AuthContext } from '../../../../providers/AuthProvider';
import { taskState } from './UsersReport';

const columns: GridColDef[] = [
  {field: 'id', headerName: 'id', width: 0 },
  { field: 'taskName', headerName: 'Задача', width: 150 },
  { field: 'projectName', headerName: 'Проект', width: 150 },
  { field: 'endDatePlan', headerName: 'План. дата окончания', width: 200 },
  { field: 'endDateFact', headerName: 'Факт. дата окончания', width: 200}
];



interface UserTableProps {
  tasks: taskState[];
}
export default function UserDataTable({ tasks }: UserTableProps) {


  const rows = tasks?.map(task => {


    const endDatePlan = task.endDatePlan ? dataFormat(task.endDatePlan) : '';
    const endDateFact = task.endDateFact ? dataFormat(task.endDateFact) : '';
    const projectName=task.projectName;
    const taskName=task.taskName;
    const id=taskName+projectName;
    return {id, taskName, projectName, endDatePlan, endDateFact};

  })

  return (
    <div style={{ height: '400px', width: '100%', backgroundColor: 'white' }}>
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