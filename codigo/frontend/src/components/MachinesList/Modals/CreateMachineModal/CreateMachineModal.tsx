import { useState } from "react";

import Button from "../../../Common/Button/Button";
import FileDrop from "../../../Common/DragFile/FileDrop";
import Input from "../../../Common/Input/Input";
import MySelect from "../../../Common/Select/Select";
import ModalStructure from "../../../Modal/ModalStructure";
import { ButtonsRow, Container, Form, Title } from "./Styles";

interface CreateMachineModalProps {
  onClose: () => void;
  onCreate: (newMachine: Machine) => void;
}

interface Machine {
  id: string;
  name: string;
  maxMasterRollWidth: number;
  minMasterRollWidth: number;
  maxRolls: number;
}

export default function CreateMachineModal(props: CreateMachineModalProps) {
  const [machine, setMachine] = useState({
    name: "",
    minMasterRollWidth: 0,
    maxMasterRollWidth: 0,
    maxRolls: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "name") {
      setMachine({ ...machine, [e.target.name]: e.target.value });
      return;
    }
    const value = e.target.value === "" ? "" : Number(e.target.value);
    setMachine({ ...machine, [e.target.name]: value });
  };

  const handleSubmit = () => {
    fetch("http://localhost:8080/api/v1/machines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(machine),
    })
      .then((response) => response.json())
      .then((data) => {
        props.onCreate(data);
        props.onClose();
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <ModalStructure>
      <Container>
        <Title>Nova máquina</Title>
        <Form>
          <Input
            name="name"
            label="Nome"
            value={machine.name}
            onChange={handleChange}
          />
          <Input
            name="maxRolls"
            label="Máximo de bobinas geradas"
            value={machine.maxRolls}
            onChange={handleChange}
          />
          <Input
            name="minMasterRollWidth"
            label="Largura mínima do padrão de corte (em mmn)"
            value={machine.minMasterRollWidth}
            onChange={handleChange}
          />
          <Input
            name="maxMasterRollWidth"
            label="Largura máxima do padrão / Largura do rolo jumbo (em mm)"
            value={machine.maxMasterRollWidth}
            onChange={handleChange}
          />
        </Form>
        <ButtonsRow>
          <Button variant="outline" text="Cancelar" onClick={props.onClose} />
          <Button variant="primary" text="Processar" onClick={handleSubmit} />
        </ButtonsRow>
      </Container>
    </ModalStructure>
  );
}
