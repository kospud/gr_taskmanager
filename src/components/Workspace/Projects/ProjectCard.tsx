import { IconButton } from "@mui/material";
import { Button, Modal, Select, Toggle } from '@skbkontur/react-ui';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { dataBaseProject } from "../../../types";
import { useState } from "react";

interface ProjectCardProps {
    project: dataBaseProject
}

const ProjectCard = ({ project }: ProjectCardProps) => {

    const [modalOpened, setOpened]=useState(false);
    const [panel, setPanel] = useState(false);

    return (
        <div className="projectCard">
            <div className={`projectCardHeader ${deadLineHeader(project.stageEndDate)}`}>
                <p>{project.projectName}</p>
                <IconButton size='small' onClick={open}>
                    <EditIcon fontSize="small" color="inherit" />
                </IconButton>
            </div>
            <div className="projectCardLine">
                <PersonIcon /><a>{`${project.userName} ${project.userSurname}`}</a>
            </div>
            <div className="projectCardLine">
                <EventAvailableIcon /><a>{`${dataFormat(project.startDate)} - ${dataFormat(project.endDate)}`}</a>
            </div>
            {
                modalOpened && renderModal()
            }
        </div>

    )
    
    function renderModal() {

        
        return (
          <Modal onClose={close}>
            <Modal.Header>{project.projectName}</Modal.Header>
            <Modal.Body>
              <p>Use rxjs operators with react hooks</p>
      
              <div>
                Информация о проекте
              </div>
            </Modal.Body>
            <Modal.Footer panel={panel}>
              <Button onClick={close}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }
      
      function open() {
        setOpened(true);
      }
      
      function close() {
        setOpened(false);
      }
      

    function dataFormat(dateS: string) {
        const date = new Date(dateS)

    
        const formattedDate = date.toLocaleDateString('ru-RU');
        return formattedDate;
    }
    function deadLineHeader(inputDate: string) {


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
            return '';
        }
    }
}

export default ProjectCard;