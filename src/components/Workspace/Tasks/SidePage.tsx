import { UniqueIdentifier } from "@dnd-kit/core";
import { SidePage } from "@skbkontur/react-ui";


interface sidePageProps{
    close: ()=>void
    taskId: UniqueIdentifier
}
export function TaskSidePage({close, taskId}: sidePageProps){
    return (
        <SidePage onClose={close}>
        <SidePage.Header>{taskId}</SidePage.Header>
        </SidePage>
    )
}
