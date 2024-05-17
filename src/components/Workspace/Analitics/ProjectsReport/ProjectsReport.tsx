import React, { useContext, useEffect, useState } from 'react'
import './ProjectsReport.css'
import { Toast } from '@skbkontur/react-ui'
import SelectList from '../SelectList/SelectList'
import { AuthContext } from '../../../../providers/AuthProvider'
import { projectListItemState } from '../../../../types'
import axios from 'axios'
import { PROJECTS, REPORTS_PROJECTS } from '../../../../utils/consts'
import Loader from '../../../Loader/Loader'
import LinearProgressWithLabel from './LinearProgressWithLabel'
import ProjectDataTable from './ProjectDataTable'

export interface projectData {
  projectID: number,
  taskName: string,
  userID: number | null,
  statusID: number
  statusName: string,
  endDatePlan: string | null,
  endDateFact: string | null,
  stageNumber: number,
  deadlineStatus: string
}

function ProjectsReport() {

  const [loading, setLoading] = useState(true)
  const [currentId, setCurrentId] = useState(0)
  const [projects, setProjects] = useState<projectListItemState[]>([])
  const [projectLoading, setProjectLoading] = useState(true);
  const [tasks, setTasks] = useState<projectData[] | null>(null)


  //Проекты
  useEffect(() => {
    axios.get(PROJECTS, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    })
      .then(response => {
        setProjects(response.data.values)
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
    if (projects.length != 0) {
      setCurrentId(projects[0].projectID)
      setLoading(false)
    }
  }, [projects])

  useEffect(() => {

    console.log(currentId)
    if (currentId != 0) {
      setProjectLoading(true)


      axios.get(`${REPORTS_PROJECTS}/${currentId}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
        .then(response => {
          setTasks(response.data.values)
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

    if (tasks)
      setProjectLoading(false)
    else
      setProjectLoading(true)
  }, [tasks])

  return loading ?
    (
      <Loader />
    )
    :
    (
      <div className='projectsReport'>
        {projectLoading ? <Loader /> : (<div className="projectsReportContent">
          <h1>{getCurrentLabel()}</h1>
          <span>{`Выполнено ${tasks!.filter(elem => elem.statusID === 3).length} из ${tasks!.length} задач`}</span>
          <div className="progressBar">
            <LinearProgressWithLabel doneTasks={tasks!.filter(elem => elem.statusID === 3).length} sumTasks={tasks!.length} />

          </div>
          <ProjectDataTable tasks={tasks!} />
        </div>)}
        <div className="projectsList">
          <SelectList title='Проекты:' items={projects} currentId={currentId} setCurrentId={setCurrentId} />
        </div>


      </div>
    )

  function getCurrentLabel() {
    const index = projects.findIndex(elem => elem.projectID === currentId)
    return projects[index].projectName
  }
}

export default ProjectsReport