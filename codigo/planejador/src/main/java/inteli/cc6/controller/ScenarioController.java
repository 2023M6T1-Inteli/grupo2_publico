package inteli.cc6.controller;

import inteli.cc6.model.Scenario;
import inteli.cc6.service.ScenarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/api/v1/scenarios")
public class ScenarioController {

    private final ScenarioService scenarioService;

    @Autowired
    public ScenarioController(ScenarioService scenarioService) {
        this.scenarioService = scenarioService;
    }

    @PostMapping
    public Scenario create(@RequestBody Scenario scenario) {
        return scenarioService.save(scenario);
    }

    // Return a list of all cutting stocks
    @GetMapping
    public List<Scenario> getAll() {
        return scenarioService.findAll();
    }

    // Return a scenario by id
    @GetMapping("/{id}")
    public Scenario get(@PathVariable String id) {
        return scenarioService.findById(id);
    }

    // Delete scenario by id
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> deletePost(@PathVariable String id) {
        if (!scenarioService.delete(id)) {
            return new ResponseEntity<>("Projeto não encontrado", HttpStatus.NOT_FOUND);
        }
    
        return new ResponseEntity<>("Projeto deletado com sucesso", HttpStatus.OK);
    }

    @PatchMapping(value = "/{id}")
    public ResponseEntity<String> updateScenario(@PathVariable String id, @RequestBody Scenario scenario) {
        if (!scenarioService.update(id, scenario)) {
            return new ResponseEntity<>("Projeto não encontrado", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>("Projeto atualizado com sucesso", HttpStatus.OK);
    }
}
