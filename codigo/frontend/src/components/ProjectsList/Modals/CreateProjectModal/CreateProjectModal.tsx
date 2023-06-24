import { useState, useEffect } from 'react';
import { IMachine } from '../../../../pages/Machines/Machines';
import Button from '../../../Common/Button/Button';
import FileDrop from '../../../Common/DragFile/FileDrop';
import Input from '../../../Common/Input/Input';
import MySelect from '../../../Common/Select/Select';
import ModalStructure from '../../../Modal/ModalStructure';
import { ButtonsRow, Container, FieldRow, Form, Title } from './Styles';
import { IProject } from '../../../../pages/Projects/Projects';

interface CreateProjectModalProps {
  onClose: () => void;
  onCreate?: (newProject: Project) => void;
  project?: IProject;
  modalAction: 'create' | 'edit';
}

interface IDemand {
  rollWidth: number;
  quantity: number;
}

interface Project {
  name: string;
  maxMasterRollWidth: number;
  minMasterRollWidth: number;
  maxRolls: number;
  multipleOf: number;
  demands: IDemand[];
}

export default function CreateProjectModal(props: CreateProjectModalProps) {
  const [allMachines, setAllMachines] = useState<IMachine[]>([]);
  const [demand, setDemand] = useState<IDemand[]>([]);
  const [demandFields, setDemandFields] = useState<IDemand[]>([
    { rollWidth: 0, quantity: 0 },
  ]);
  const [project, setProject] = useState<IProject>({
    name: props.project?.name || '',
    demands: props.project?.demands || demand,
    minMasterRollWidth: props.project?.minMasterRollWidth || 0,
    maxMasterRollWidth: props.project?.maxMasterRollWidth || 0,
    maxRolls: props.project?.maxRolls || 0,
    multipleOf: props.project?.multipleOf || 1,
  });

  useEffect(() => {
    const modalConfirm = () => {
      fetch('http://localhost:8080/api/v1/scenarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      })
        .then((response) => response.json())
        .then((data) => {
          if (props.onCreate) {
            props.onCreate(data);
          }
          props.onClose();
        })
        .catch((error) => console.error('Error:', error));
    };

    if (project.demands.length > 0) {
      modalConfirm();
      props.onClose();
    }
  }, [project, props]);

  useEffect(() => {
    if (demand && demand.length > 0) {
      setDemandFields(demand);
    }
  }, [demand]);

  const handleSelectMachine = async (e: any) => {
    const response = await fetch(
      `http://localhost:8080/api/v1/machines/${e.value}`
    );
    const data = await response.json();

    console.log(data);

    setProject((prevProject) => ({
      ...prevProject,
      maxMasterRollWidth: data.maxMasterRollWidth,
      minMasterRollWidth: data.minMasterRollWidth,
      maxRolls: data.maxRolls,
    }));
  };

  const handleSubmit = () => {
    const demandsToUse = demandFields.filter(
      (demand) => demand.rollWidth !== 0 && demand.quantity !== 0
    );

    console.log(demandsToUse);

    setProject((prevProject) => ({
      ...prevProject,
      demands: demandsToUse,
    }));
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/machines')
      .then((response) => response.json())
      .then((data) => {
        setAllMachines(data);
      });
  }, []);

  return (
    <ModalStructure>
      <Container>
        <Title>
          {props.modalAction === 'create' ? 'Novo Projeto' : 'Editar Projeto'}
        </Title>
        <Form>
          <Input
            type="text"
            label="Nome do projeto:"
            placeholder={
              props.modalAction === 'create'
                ? 'Digite aqui um nome para o seu projeto...'
                : props.project?.name
            }
            margin="0 0 1.5rem 0"
            onChange={(e: any) => {
              setProject({ ...project, name: e.target.value });
            }}
            value={project.name}
          />

          <MySelect
            options={allMachines.map((machine) => ({
              value: machine.id,
              label: machine.name,
            }))}
            onChange={handleSelectMachine}
            placeholder="Selecione a máquina"
            label="Máquina relacionada:"
          />

          <Input
            type="number"
            label="Multíplo das tiradas:"
            placeholder={
              props.modalAction === 'create'
                ? 'As tiradas devem ser múltiplas de...'
                : props.project?.multipleOf
            }
            margin="0 0 1.5rem 0"
            onChange={(e: any) => {
              setProject({ ...project, multipleOf: e.target.value });
            }}
            value={project?.multipleOf}
          />
          <FileDrop file={demand} setFile={setDemand} />
          {demandFields.map((demand, index) => (
            <div key={index}>
              <FieldRow>
                <Input
                  type="number"
                  label={`Tamanho ${index + 1} (mm):`}
                  onChange={(e: any) => {
                    const newDemands = [...demandFields];
                    newDemands[index].rollWidth = e.target.value;
                    setDemandFields(newDemands);
                  }}
                  value={demand.rollWidth}
                />
                <Input
                  type="number"
                  label={`Quantidade ${index + 1}:`}
                  onChange={(e: any) => {
                    const newDemands = [...demandFields];
                    newDemands[index].quantity = e.target.value;
                    setDemandFields(newDemands);
                  }}
                  value={demand.quantity}
                />
              </FieldRow>
            </div>
          ))}
        </Form>
        <ButtonsRow>
          <Button variant="outline" text="Cancelar" onClick={props.onClose} />
          <Button variant="primary" text="Processar" onClick={handleSubmit} />
        </ButtonsRow>
      </Container>
    </ModalStructure>
  );
}
