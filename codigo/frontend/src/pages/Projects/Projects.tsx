import { Container, NewProject, SearchInput, SearchRow, Title } from "./Styles";
import ProjectsList from "../../components/ProjectsList/ProjectsList";
import { useEffect, useState } from "react";
import CreateProjectModal from "../../components/ProjectsList/Modals/CreateProjectModal/CreateProjectModal";

export interface IProject {
  id?: string
  name: string
  maxMasterRollWidth: number
  demands: IDemand[]
  minMasterRollWidth: number
  maxRolls: number
  multipleOf: number
}

export interface IDemand {
  rollWidth: number
  quantity: number
}

export default function Projects() {
  const [modalVisible, setModalVisible] = useState(false);
  const [allProjects, setAllProjects] = useState<IProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<IProject[]>([]);
  const [ modalAction, setModalAction ] = useState<"create" | "edit">("create");

  const handleFilterProjects = (e: any) => {
    const value = e.target.value;
    const filtered = allProjects.filter((project) =>
      project.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  const handleDelete = (id: string) => {
    console.log(id);
    fetch(`http://localhost:8080/api/v1/scenarios/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setAllProjects(allProjects.filter((project) => project.id !== id));
        setFilteredProjects(
          filteredProjects.filter((project) => project.id !== id)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCreate = (newProject: IProject) => {
    setAllProjects([...allProjects, newProject]);
    setFilteredProjects([...filteredProjects, newProject]);
  };

  const handleUpdate = (updatedProject: IProject) => {
    console.log(updatedProject)
    fetch(`http://localhost:8080/api/v1/scenarios/${updatedProject.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProject),
    })
      .then(() => {
        setAllProjects(
          allProjects.map((project) =>
            project.id === updatedProject.id ? updatedProject : project
          )
        );
        setFilteredProjects(
          filteredProjects.map((project) =>
            project.id === updatedProject.id ? updatedProject : project
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/scenarios")
      .then((response) => response.json())
      .then((data) => {
        setAllProjects(data);
        setFilteredProjects(data);
      });
  }, []);

  return (
    <Container>
      {modalVisible && (
        <CreateProjectModal
          onClose={() => {
            setModalVisible(false);
          }}
          onCreate={handleCreate}
        />
      )}
      <Title>Projetos</Title>
      <SearchRow>
        <SearchInput
          onChange={handleFilterProjects}
          placeholder="Pesquise por um projeto"
        />
        <NewProject
          onClick={() => {
            setModalVisible(true);
            setModalAction("create");
          }}
        >
          Novo projeto
        </NewProject>
      </SearchRow>
      <ProjectsList
        data={filteredProjects}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        setModalAction={setModalAction}
      />
    </Container>
  );
}