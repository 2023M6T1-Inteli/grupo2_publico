import React, { useState } from "react";
import MachineRow from "./MachineRow/MachineRow";
import EditMachineModal from "./Modals/EditMachineModal/EditMachineModal";
import { Container, HeaderRow, HeaderColumn } from "./Styles";

interface Machine {
  id: string;
  name: string;
  maxMasterRollWidth: number;
  minMasterRollWidth: number;
  maxRolls: number;
}

interface Props {
  data: Machine[];
  handleUpdate: (updatedMachine: Machine) => void;
  handleDelete: (id: string) => void;
}

export default function MachinesList({
  data,
  handleUpdate,
  handleDelete,
}: Props) {
  const [selectedMachine, setSelectedMachine] = useState<Machine | undefined>(
    undefined
  );
  const [editModalVisible, setEditModalVisible] = useState(false);

  const handleModalVisible = () => {
    setEditModalVisible(!editModalVisible);
  };

  const handleDeletePress = (id: string) => {
    // Confirmation
    if (window.confirm(`Você deseja deletar a máquina de id ${id}?`)) {
      // Delete the machine
      handleDelete(id);
    }
  };

  const handleEditModal = (id: string) => {
    const machineToEdit = data.find((machine) => machine.id === id);
    setSelectedMachine(machineToEdit);
    handleModalVisible();
  };

  return (
    <Container>
      {editModalVisible && (
        <EditMachineModal
          handleClose={handleModalVisible}
          handleUpdate={handleUpdate}
          machine={selectedMachine}
        />
      )}
      <HeaderRow>
        <HeaderColumn>Nome</HeaderColumn>
        <HeaderColumn>Largura Min. de Corte</HeaderColumn>
        <HeaderColumn>Lárgura Max. de Corte</HeaderColumn>
        <HeaderColumn>Máximo de Bobinas</HeaderColumn>
        <HeaderColumn>Ações</HeaderColumn>
      </HeaderRow>
      {data.map((machine) => (
        <MachineRow
          handleEditModal={() => handleEditModal(machine.id)}
          handleDeletePress={() => handleDeletePress(machine.id)}
          key={machine.id}
          id={machine.id}
          name={machine.name}
          maxMasterRollWidth={machine.maxMasterRollWidth}
          minMasterRollWidth={machine.minMasterRollWidth}
          maxRolls={machine.maxRolls}
        />
      ))}
    </Container>
  );
}
