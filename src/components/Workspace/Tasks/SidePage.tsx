import { UniqueIdentifier } from "@dnd-kit/core";
import { AccountCircle, Checklist } from "@mui/icons-material";
import { DatePicker, Toast, Select, SidePage } from "@skbkontur/react-ui";
import styled from "styled-components";
import { UpdateStageInput, useLoadTaskCardDataQuery } from "../../../types/graphql";
import { ChangeEvent, useEffect, useState } from "react";
import Loader from "../../Loader/Loader";

const SidePageBody = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2%;
`
const TextArea = styled.textarea`
    width: 100%;
    height: 150px;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #dfdfdf;
    border-radius: 4px;
    background-color: #fcfcfc;
    font-size: 16px;
    resize: none;
`
const Selection = styled.div`
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1%;
`
const SelectStyle = {
    flexGrow: 1,
}

const Span = styled.span`
    color: #585858;
`

interface sidePageProps {
    close: () => void
    taskId: UniqueIdentifier
    updateStage: (stage: UpdateStageInput) => void
}

export interface Stage extends UpdateStageInput {
    __typename: "Projectstage";
    stageDescription: string | null;
    stageId: number;
    startDatePlan: string | null;
    endDatePlan: string | null;
    statusId: number;
    userId: number | null
    task: {
        __typename: "Task";
        taskName: string;
    };
    project: {
        projectName: string;
    };
}
export function TaskSidePage({ close, taskId, updateStage }: sidePageProps) {

    const [componentLoading, setLoading] = useState(true)
    const { loading, data, error } = useLoadTaskCardDataQuery({ variables: { id: taskId as number }, fetchPolicy: "cache-and-network" })
    const [stage, setStage] = useState<Stage>({} as Stage)

    useEffect(() => {
        if (!loading && data) {
            console.log(data.stage)
            setStage(data.stage)
            setLoading(false)
        }
        if (error) {
            Toast.push(error.message, null, 1000)
            close()
        }
    }, [loading])

    return (
        <SidePage onClose={sidePageClose} width={'50%'}>
            {componentLoading ? <Loader /> :
                <div>
                    <SidePage.Header>{`${stage!.project.projectName} / ${stage!.task.taskName}`}</SidePage.Header>
                    <SidePage.Body>
                        <SidePageBody>
                            <TextArea placeholder="Описание" value={stage.stageDescription || undefined} onChange={setDescription} />
                            <Selection>
                                <AccountCircle />
                                <Select style={SelectStyle} items={userValues()} value={currentUser()} onValueChange={setUser}></Select>
                            </Selection>
                            <Selection>
                                <Span>Начало</Span>
                                <DatePicker value={formatDatetoLocaleStringRus(stage.startDatePlan)} onValueChange={(value) => { setDate(value, "startDatePlan") }} style={SelectStyle} />
                                <Span>Конец</Span>
                                <DatePicker value={formatDatetoLocaleStringRus(stage.endDatePlan)} onValueChange={(value) => { setDate(value, "endDatePlan") }} style={SelectStyle} />
                            </Selection>
                            <Selection>
                                <Checklist />
                                <Select style={SelectStyle} items={statusValues()} value={currentStatus()} onValueChange={setStatus}></Select>
                            </Selection>
                        </SidePageBody>
                    </SidePage.Body>
                </div>
            }

        </SidePage>
    )

    function statusValues() {
        const statuses = data?.stageStatuses.map(status => status.statusName)
        return statuses;
    }

    function currentStatus() {
        const status = data?.stageStatuses.find(elem => elem.statusId === stage.statusId)
        return status?.statusName
    }

    function setStatus(statusName: string) {
        const status = data?.stageStatuses.find(elem => elem.statusName === statusName)
        setStage(prevState => ({
            ...prevState,
            statusId: status?.statusId!
        }))
    }

    function userValues() {
        const users = data!.users.map((user) => { return `${user.userName} ${user.userSurname}` })
        return users
    }

    function currentUser() {
        const index = data!.users.findIndex(value => value.userId === stage.userId)
        if (index === -1) return
        const user = data!.users[index]
        return `${user.userName} ${user.userSurname}`
    }

    function setUser(userValue: string) {
        const index = data!.users.findIndex(value => userValue === `${value.userName} ${value.userSurname}`)
        const user = data!.users[index]
        setStage(prevState => ({
            ...prevState,
            userId: user.userId

        }))
    }

    function setDescription(event: ChangeEvent<HTMLTextAreaElement>) {

        const description = event.target.value
        setStage(prevState => ({
            ...prevState,
            stageDescription: description
        }))
    }

    function formatDatetoLocaleStringRus(dateS: string | null) {
        if (dateS) {
            const date = new Date(dateS)
            const formattedDate = date.toLocaleDateString('ru-RU');
            return formattedDate;
        } else
            return null
    }

    function formatDateToISOString(dateS: string | null) {
        if (dateS) {
            const [day, month, year] = dateS.split('.')
            return `${year}.${month}.${day}`
        } else
            return null
    }

    function setDate(value: string | null, dateType: "startDatePlan" | "endDatePlan") {
        const date = formatDateToISOString(value)
        setStage(prevState => ({
            ...prevState,
            [dateType]: date
        }))
    }

    function sidePageClose() {

        const {
            stageId,
            stageDescription,
            startDatePlan,
            endDatePlan,
            statusId,
            userId
        } = stage
        const input: UpdateStageInput = { stageId, stageDescription, startDatePlan, endDatePlan, statusId, userId }

        updateStage(input)

        close()
    }

    /*function createInput(stage: Stage):UpdateStageInput{
        let input: UpdateStageInput={...stage}
        Object.keys(input).map(key=>{
            if(key in UpdateStageI)
        })
    }*/
}
