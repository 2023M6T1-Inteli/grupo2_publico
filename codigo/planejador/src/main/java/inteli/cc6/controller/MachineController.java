package inteli.cc6.controller;

import inteli.cc6.model.Machine;
import inteli.cc6.service.MachineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/machines")
public class MachineController {

    private final MachineService machineService;

    @Autowired
    public MachineController(MachineService machineService) {
        this.machineService = machineService;
    }

    @PostMapping
    public Machine create(@RequestBody Machine machine) {
        return machineService.save(machine);
    }

    // Return a list of all machines
    @GetMapping
    public List<Machine> getAll() {
        return machineService.findAll();
    }

    // Return a machine by id
    @GetMapping("/{id}")
    public Machine get(@PathVariable String id) {
        return machineService.findById(id);
    }

    // Delete machine by id
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> deletePost(@PathVariable String id) {
        if (!machineService.delete(id)) {
            return new ResponseEntity<>("Máquina não encontrada", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>("Máquina deletada com sucesso", HttpStatus.OK);
    }

    @PatchMapping(value = "/{id}")
    public ResponseEntity<String> updateMachine(@PathVariable String id, @RequestBody Machine machine) {
        if (!machineService.update(id, machine)) {
            return new ResponseEntity<>("Máquina não encontrada", HttpStatus.NOT_FOUND);
        }

        // Return the updated machine
        return new ResponseEntity<>("Máquina atualizada com sucesso", HttpStatus.OK);
    }
}
