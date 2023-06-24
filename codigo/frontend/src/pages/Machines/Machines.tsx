import { useState, useEffect } from "react";
import MachinesList from "../../components/MachinesList/MachinesList";
import { SearchInput } from "./Styles";
import { Container, Title, SearchRow, NewProject } from "./Styles";
import CreateMachineModal from "../../components/MachinesList/Modals/CreateMachineModal/CreateMachineModal";

export interface IMachine {
  id: string;
  name: string;
  maxMasterRollWidth: number;
  minMasterRollWidth: number;
  maxRolls: number;
}

export default function Machines() {
  const [modalVisible, setModalVisible] = useState(false);
  const [allMachines, setAllMachines] = useState<IMachine[]>([]);
  const [filteredMachines, setFilteredMachines] = useState<IMachine[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/machines")
      .then((response) => response.json())
      .then((data) => {
        setAllMachines(data);
        setFilteredMachines(data);
      });
  }, []);

  const handleFilterMachines = (e: any) => {
    const value = e.target.value;
    const filtered = allMachines.filter((machine) =>
      machine.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMachines(filtered);
  };

  const handleUpdate = (updatedMachine: IMachine) => {
    fetch(`http://localhost:8080/api/v1/machines/${updatedMachine.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMachine),
    })
      .then(() => {
        setAllMachines(
          allMachines.map((machine) =>
            machine.id === updatedMachine.id ? updatedMachine : machine
          )
        );
        setFilteredMachines(
          filteredMachines.map((machine) =>
            machine.id === updatedMachine.id ? updatedMachine : machine
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id: string) => {
    fetch(`http://localhost:8080/api/v1/machines/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setAllMachines(allMachines.filter((machine) => machine.id !== id));
        setFilteredMachines(
          filteredMachines.filter((machine) => machine.id !== id)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCreate = (newMachine: IMachine) => {
    setAllMachines([...allMachines, newMachine]);
    setFilteredMachines([...filteredMachines, newMachine]);
  };

  return (
    <Container>
      {modalVisible && (
        <CreateMachineModal
          onClose={() => {
            setModalVisible(false);
          }}
          onCreate={handleCreate}
        />
      )}
      <Title>Máquinas</Title>
      <SearchRow>
        <SearchInput
          onChange={handleFilterMachines}
          placeholder="Pesquise por uma máquina"
        />
        <NewProject
          onClick={() => {
            setModalVisible(true);
          }}
        >
          Nova máquina
        </NewProject>
      </SearchRow>
      <MachinesList
        data={filteredMachines}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </Container>
  );
}
