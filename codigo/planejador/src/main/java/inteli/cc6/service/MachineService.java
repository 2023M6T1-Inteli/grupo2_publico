package inteli.cc6.service;

import inteli.cc6.algorithm.CuttingStockAlgorithm;
import inteli.cc6.model.Machine;
import inteli.cc6.repository.MachineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MachineService {
    private final MachineRepository machineRepository;

    /**
     * Constructs a new MachineService object with the specified machine repository.
     *
     * @param machineRepository the machine repository to be used
     */
    @Autowired
    public MachineService(MachineRepository machineRepository) {
        this.machineRepository = machineRepository;
    }

    /**
     * Saves the given machine and returns the solved machine.
     *
     * @param machine the machine to be saved
     * @return machine
     */
    public Machine save(Machine machine) {
        return machineRepository.save(machine);
    }

    /**
     * Retrieves a list of all machines.
     *
     * @return the list of machine
     */
    public List<Machine> findAll() {
        return machineRepository.findAll();
    }

    /**
     * Retrieves the machine with the specified ID.
     *
     * @param id the ID of the machine to be retrieved
     * @return the retrieved machine, or null if not found
     */
    public Machine findById(String id) {
        return machineRepository.findById(id).orElse(null);
    }

    /**
     * Deletes the machine with the specified ID.
     *
     * @param id the ID of the machine to be deleted
     * @return true if the machine was successfully deleted, false otherwise
     */
    public boolean delete(String id) {
        machineRepository.deleteById(id);
        return true;
    }

    /**
     * Updates the machine with the specified ID.
     *
     * @param id the ID of the machine to be updated
     * @param machine the new machine
     * @return true if the machine was successfully updated, false otherwise
     */
    public boolean update(String id, Machine machine) {
        Machine machineToUpdate = machineRepository.findById(id).orElse(null);

        if (machineToUpdate == null) {
            return false;
        }

        // Update the machine
        machineToUpdate.setName(machine.getName());
        machineToUpdate.setmaxMasterRollWidth(machine.getmaxMasterRollWidth());
        machineToUpdate.setminMasterRollWidth(machine.getminMasterRollWidth());
        machineToUpdate.setmaxRolls(machine.getmaxRolls());

        machineRepository.save(machineToUpdate);

        return true;
    }
}
