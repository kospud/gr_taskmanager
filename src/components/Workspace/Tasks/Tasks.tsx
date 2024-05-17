import { Button, Select, Toast } from '@skbkontur/react-ui';
import './Tasks.css'
import { useContext, useEffect, useState } from 'react';
import KanbanBoard from '../../kanbanBoard/KanbanBoard';
import { Column, TaskType, UserListItemState, dataBaseTask } from '../../../types';
import Loader from '../../Loader/Loader';
import { PROJECTS, STATUSES, TASKS } from '../../../utils/consts';
import axios from 'axios';
import { AuthContext } from '../../../providers/AuthProvider';
import TasksToolBar from './TasksToolBar';
import TasksContent from './TasksContent';
import TasksToolBarProvider from '../../../providers/TasksToolBarProvider';



const Tasks = () => {

    return (
        <TasksToolBarProvider>
            <div className="tasks">
                <TasksToolBar></TasksToolBar>
                <TasksContent></TasksContent>
            </div>
        </TasksToolBarProvider>

    )
}

export default Tasks;


