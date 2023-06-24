import Button from "../../../Common/Button/Button";
import Input from "../../../Common/Input/Input";
import ModalStructure from "../../../Modal/ModalStructure";
import { ButtonsRow, Container, Form, Title } from "./Styles";
import { useState } from "react";

interface EditMachineModalProps {
  handleClose: () => void;
  handleUpdate: (machine: Machine) => void;
  machine: Machine | undefined;
}

interface Machine {
  id: string;
  name: string;
  maxMasterRollWidth: number;
  minMasterRollWidth: number;
  maxRolls: number;
}

export default function EditMachineModal(props: EditMachineModalProps) {
  const [name, setName] = useState(props.machine?.name || "");
  const [maxMasterRollWidth, setMaxMasterRollWidth] = useState(
    props.machine?.maxMasterRollWidth || 0
  );
  const [minMasterRollWidth, setMinMasterRollWidth] = useState(
    props.machine?.minMasterRollWidth || 0
  );
  const [maxRolls, setMaxRolls] = useState(props.machine?.maxRolls || 0);

  const handleConfirmClick = () => {
    const updatedMachine: Machine = {
      id: props.machine?.id || "",
      name,
      maxMasterRollWidth: Number(maxMasterRollWidth),
      minMasterRollWidth: Number(minMasterRollWidth),
      maxRolls: Number(maxRolls),
    };

    props.handleUpdate(updatedMachine);
    props.handleClose();
  };

  return (
    <ModalStructure>
      <Container>
        <Title>Editar Máquina</Title>
        <Form>
          <Input
            type="text"
            label="Nome da máquina:"
            placeholder="Máquina 1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="number"
            label="Máximo de Bobinas por tirada:"
            placeholder="6"
            value={maxRolls}
            onChange={(e) => setMaxRolls(e.target.value)}
          />
          <Input
            type="number"
            label="Largura mínima:"
            placeholder="5080"
            value={minMasterRollWidth}
            onChange={(e) => setMinMasterRollWidth(e.target.value)}
          />
          <Input
            type="number"
            label="Largura máxima:"
            placeholder="6030"
            value={maxMasterRollWidth}
            onChange={(e) => setMaxMasterRollWidth(e.target.value)}
          />
        </Form>
        <ButtonsRow>
          <Button
            variant="outline"
            text="Cancelar"
            onClick={props.handleClose}
          />
          <Button
            variant="primary"
            text="Confirmar"
            onClick={handleConfirmClick}
          />
        </ButtonsRow>
      </Container>
    </ModalStructure>
  );
}
