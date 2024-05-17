import React, { useContext, useEffect, useState } from 'react'
import './UsersReport.css'
import { AuthContext } from '../../../../providers/AuthProvider'
import SelectList from '../SelectList/SelectList'
import Loader from '../../../Loader/Loader'
import { REPORTS_USERS } from '../../../../utils/consts'
import { Tabs, Toast } from '@skbkontur/react-ui'
import axios from 'axios'
import { Doughnut } from 'react-chartjs-2'
import { ArcElement, Chart, Legend, Title, Tooltip } from 'chart.js'
import UserDataTable from './UserDataTable'
Chart.register(ArcElement, Title, Legend, Tooltip);

export interface taskState {
  projectID: number,
  projectName: string,
  taskID: number,
  taskName: string,
  statusID: number,
  statusName: string,
  endDatePlan: string | null,
  endDateFact: string | null,
  stageNumber: number,
  stageDescriprion: string | null
}

interface taskTimeState {
  taskName: string,
  timeDays: number
}

type tasksState = Record<string, taskState[]> | null;
type tasksTime = Record<string, taskTimeState[]> | null;

function UsersReport() {

  const users = useContext(AuthContext)![2]
  const [currentId, setCurrentId] = useState(users[0].userID)
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState<tasksState>(null)
  const [tasksTimes, setTasksTimes] = useState<tasksTime>(null)
  const [active, setActive] = useState('overdueTasks');
  const [activeData, setActiveData] = useState<taskState[]>([])

  //Загрузка задач
  useEffect(() => {

    if (currentId !== 0) {
      setLoading(true)
      axios.get(`${REPORTS_USERS}/${currentId}`, {
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
              overdueTasks: response.data.values.overdueTasks,
            })
          setTasksTimes({
            data: response.data.values.tasksTimes
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
    }

  }, [currentId])


  useEffect(() => {
    if (tasks && tasksTimes)
      setLoading(false)
  }, [tasks, tasksTimes])

  return (
    <div className='usersReport'>
      {loading ? <Loader /> : (<div className="usersReportContent">
        <h1>{getCurrentLabel()}</h1>
        <div className="usersReportDiagrams">
          <div className="usersTaskdiagram">

            <Doughnut height={150} width={100}
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
                    position: 'left',
                    display: true,
                    labels: {
                      font: {
                        size: 15
                      },
                      color: 'black'
                    }
                  },
                  tooltip: {
                    enabled: true,
                  }
                }
              }} />
          </div>
          <div className="tasksTimes">
            <ul>Среднее время выполнения задач:
              {
                tasksTimes!.data.map(elem => <li>{`${elem.taskName}-${elem.timeDays} дн.`}</li>)
              }
            </ul>
          </div>
        </div>
        <div className="UserReportTable">
          <Tabs value={active} onValueChange={setActiveMy}>
            <Tabs.Tab id="newTasks">Новые задачи</Tabs.Tab>
            <Tabs.Tab id="tasksInWork">Задачи в работе</Tabs.Tab>
            <Tabs.Tab id="successTasks">Выполненные задачи</Tabs.Tab>
            <Tabs.Tab id="overdueTasks">просроченные задачи</Tabs.Tab>
          </Tabs>
          <UserDataTable tasks={activeData} />
        </div>

      </div>)}

      <div className="projectsList">
        <SelectList title='Пользователи:' items={users} currentId={currentId} setCurrentId={setCurrentId} />
      </div></div>
  )

  function setActiveMy(value: string) {

    setActive(value)
    setActiveData(tasks![value])
  }

  function getCurrentLabel() {
    const index = users.findIndex(elem => elem.userID === currentId)
    return users[index].userName
  }
}

export default UsersReport