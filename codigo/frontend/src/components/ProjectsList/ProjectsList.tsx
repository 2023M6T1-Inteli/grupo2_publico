import { useState } from "react";
import ProjectRow from "./ProjectRow/ProjectRow";
import { Container } from "./Styles";
import EditProjectModal from "./Modals/EditProjectModal/EditProjectModal";
import { IProject } from "../../pages/Projects/Projects";
import CreateProjectModal from "./Modals/CreateProjectModal/CreateProjectModal";

interface EditProjectModalProps {
  handleClose: () => void;
  handleUpdate: (project: IProject) => void;
  project: IProject;
}

interface ProjectsListProps {
  data: IProject[]
  handleUpdate?: (updatedProject: IProject) => void;
  handleDelete: (id: string) => void;
  onCreate?: (newProject: IProject) => void;
  setModalAction: any
}

export default function ProjectsList({
  data,
  handleDelete,
  handleUpdate
}: ProjectsListProps) {

  const [selectedProject, setSelectedProject] = useState<IProject | undefined>(
    undefined
  );
  const [ editModalVisible, setEditModalVisible ] = useState(false);
  
  const handleModalVisible = () => {
    setEditModalVisible(!editModalVisible);
  }

  const handleEditModal = (id: string) => {
    const projectToEdit = data.find((project) => project.id === id);
    setSelectedProject(projectToEdit);
    handleModalVisible();
  };

  const handleDeletePress = (id: string, name: string) => {
    console.log(id);
    // Confirmation
    if (window.confirm(`Você deseja deletar o projeto ${name}?`)) {
      // Delete the project
      handleDelete(id);
    }
  };

  return (
    <Container>
      {
        editModalVisible &&
        <EditProjectModal
          handleClose={handleModalVisible}
          project={selectedProject as IProject}
          handleUpdate={handleUpdate}
        />
      }
      {
        data.map((project) => {
          return (
            <ProjectRow
              handleEditModal={() => handleEditModal(project?.id as string)}
              handleDeletePress={() => handleDeletePress(project?.id as string, project?.name as string)}
              key={project.id}
              id={project?.id as string}
              name={project.name}
            />
          )
        })
      }
    </Container>
  )
}