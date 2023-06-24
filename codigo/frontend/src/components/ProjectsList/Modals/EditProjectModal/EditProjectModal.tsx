import { useEffect, useState } from "react";
import { IProject } from "../../../../pages/Projects/Projects";
import Button from "../../../Common/Button/Button";
import FileDrop from "../../../Common/DragFile/FileDrop";
import Input from "../../../Common/Input/Input";
import MySelect from "../../../Common/Select/Select";
import { SelectElement } from "../../../Common/Select/Styles";
import ModalStructure from "../../../Modal/ModalStructure";
import { ButtonsRow, Container, Form, Title } from "./Styles";
import { IMachine } from "../../../../pages/Machines/Machines";

interface EditProjectModalProps {
  handleClose: any;
  handleUpdate: any
  project: IProject
}

export default function EditProjectModal({
  handleClose,
  handleUpdate,
  project
}: EditProjectModalProps) {

  const [allMachines, setAllMachines] = useState<IMachine[]>([]);
  const [demand, setDemand] = useState<any>();
  const [machineId, setMachineId] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [updatedProject, setUpdatedProject] = useState<IProject>({
    id: project.id,
    name: project.name,
    demands: project.demands,
    minMasterRollWidth: project.minMasterRollWidth,
    maxMasterRollWidth: project.maxMasterRollWidth,
    maxRolls: project.maxRolls,
    multipleOf: project.multipleOf || 4,
  });

  console.log(updatedProject.demands);

  const handleSelectMachine = (e: any) => {
    setMachineId(e.value);
  };

  const handleConfirmClick = async () => {

    const response = await fetch(`http://localhost:8080/api/v1/machines/${machineId}`)
    const data = await response.json();

    setUpdatedProject((prevProject) => ({
      ...prevProject,
      minMasterRollWidth: data.minMasterRollWidth,
      maxMasterRollWidth: data.maxMasterRollWidth,
      maxRolls: data.maxRolls,
      demands: demand
    }))

    setIsConfirmed(true);

  };

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/machines")
      .then((response) => response.json())
      .then((data) => {
        setAllMachines(data);
      });
  }, []);

  useEffect(() => {
    if (isConfirmed) {
      handleUpdate(updatedProject)
      handleClose();
      setIsConfirmed(false);
    }
  }, [isConfirmed])

  return (
    <ModalStructure>
      <Container>
        <Title>Editar Projeto</Title>
        <Form>
        <Input 
            type="text"
            label="Nome do projeto:"
            placeholder={project.name}
            margin="0 0 1.5rem 0"
            onChange={
              (e: any) => {
                e.preventDefault();
                setUpdatedProject((prevProject) => ({
                  ...prevProject,
                  name: e.target.value
                }))
            }}
            value={updatedProject.name}
          />

          <MySelect 
            options={
              allMachines.map((project) => { 
                return {
                  value: project.id,
                  label: project.name
              }})
            }
            onChange={handleSelectMachine}
            placeholder="Selecione a máquina"
            label="Máquina relacionada:"
          />

          <FileDrop
            file={demand}
            setFile={setDemand}
          />        
        </Form>
        <ButtonsRow>
          <Button 
            variant="outline"
            text="Cancelar"
            onClick={handleClose}
          />
          <Button 
            variant="primary"
            text="Confirmar"
            onClick={handleConfirmClick}
          />
        </ButtonsRow>
      </Container>
    </ModalStructure>
  )
}