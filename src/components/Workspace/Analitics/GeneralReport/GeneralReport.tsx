import './GeneralReport.css'
import { Doughnut } from "react-chartjs-2"
import { Chart, ArcElement, Legend, Tooltip, Title } from 'chart.js'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { REPORTS_GENERAL } from '../../../../utils/consts';
import { Tabs, Toast } from '@skbkontur/react-ui';
import { dataBaseTask } from '../../../../types';
import Loader from '../../../Loader/Loader';
import GeneralDataTable from './GeneralDataTable';
Chart.register(ArcElement, Title, Legend, Tooltip);

type tasksState = Record<string, dataBaseTask[]> | undefined

const GeneralReport = () => {

    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState<tasksState>(undefined);
    const [active, setActive] = useState('overdueTasks');
    const [activeData, setActiveData] = useState<dataBaseTask[]>([])

    useEffect(() => {

        axios.get(REPORTS_GENERAL, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(response => {

                setTasks(
                    {
                        newTasks: response.data.values.newTasks,
                        tasksInWork: response.data.values.tasksInWork,
                        successTasks: response.data.values.successTasks,
                        overdueTasks: response.data.values.overdueTasks
                    })

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

    }, [])

    useEffect(() => {

        if (tasks) {
            setActiveData(tasks.overdueTasks)
            setLoading(false)
        }

    }, [tasks])


    return loading ?
        (
            <Loader />
        )
        :
        (
            <div className="generalReport">
                <div className="generalDiagram">
                    <Doughnut height={200} width={200}
                        data={{
                            labels: ['Задачи к выполнению', 'Задачи в работе', 'Завершенные задачи', 'Просроченные задачи'],
                            datasets: [{
                                label: 'Количество задач',
                                data: [tasks!.newTasks.length, tasks!.tasksInWork.length, tasks!.successTasks.length, tasks!.overdueTasks.length],
                                backgroundColor: ['rgb(48, 131, 255)', 'rgb(255, 140, 0)', 'rgb(2, 196, 5)', 'rgb(100%, 0%, 0%)'],
                                hoverOffset: 10
                            }]
                        }}
                        options={{
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: 'right',
                                    display: true,
                                    labels: {
                                        font: {
                                            size: 20
                                        },
                                        color: 'black'
                                    }
                                },
                                tooltip: {
                                    enabled: true,
                                }
                            }
                        }} />
                </div >
                <div className="generalReportTable">
                    <Tabs value={active} onValueChange={setActiveMy}>
                        <Tabs.Tab id="newTasks">Новые задачи</Tabs.Tab>
                        <Tabs.Tab id="tasksInWork">Задачи в работе</Tabs.Tab>
                        <Tabs.Tab id="successTasks">Выполненные задачи</Tabs.Tab>
                        <Tabs.Tab id="overdueTasks">просроченные задачи</Tabs.Tab>
                    </Tabs>
                    <GeneralDataTable tasks={activeData} />
                </div>
            </div >

        )

    function setActiveMy(value: string) {

        setActive(value)
        setActiveData(tasks![value])
    }
}

export default GeneralReport