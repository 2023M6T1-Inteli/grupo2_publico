package inteli.cc6.controller;

import com.fasterxml.jackson.databind.ObjectMapper;

import inteli.cc6.model.Demand;
import inteli.cc6.model.Scenario;
import inteli.cc6.service.ScenarioService;
import inteli.cc6.repository.ScenarioRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ScenarioControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    ScenarioRepository scenarioRepository;

    @Mock
    private ScenarioService scenarioService;

    @InjectMocks
    private ScenarioController scenarioController;

    @Test
    void create() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();

        // Creating a scenario example
        Scenario scenario = new Scenario();
        scenario.setId("teste123");
        Demand demand = new Demand();
        demand.setRollWidth(600);
        demand.setQuantity(4);
        scenario.setDemands(List.of(demand));
        scenario.setMaxMasterRollWidth(6000);
        scenario.setMinMasterRollWidth(5000);
        scenario.setMaxRolls(8);
        scenario.setMultipleOf(1);

        // Mocking the scenario and parsing the class to a JSON structure
        Mockito.when(scenarioRepository.save(Mockito.any())).thenReturn(scenario);
        this.mockMvc.perform(post("/api/v1/scenarios")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(scenario))
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("teste123")); // Verify if the ID is the same
    }


    @Test
    void getAll() throws Exception{
        // Scenario example
        Scenario scenario = new Scenario();
        scenario.setId("teste123");

        Mockito.when(scenarioRepository.findAll()).thenReturn(List.of(scenario));
        this.mockMvc.perform(get("/api/v1/scenarios"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().json("[{\"id\":\"teste123\",\"patterns\":null,\"name\":null,\"demands\":null,\"masterRollsUsed\":0,\"maxMasterRollWidth\":0,\"minMasterRollWidth\":0,\"maxRolls\":0,\"multipleOf\":0}]"));
    }


    @Test
    void getById() throws Exception {
        // Scenario example
        Scenario scenario = new Scenario();
        scenario.setId("teste123");

        Mockito.when(scenarioRepository.findById(scenario.getId())).thenReturn(Optional.of(scenario));
        this.mockMvc.perform(get("/api/v1/scenarios/teste123"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void deletePost() throws Exception {
        Scenario scenario = new Scenario();
        scenario.setId("teste123");

        Mockito.when(scenarioService.delete(scenario.getId())).thenReturn(true);

        ResponseEntity<String> response = scenarioController.deletePost(scenario.getId());
        verify(scenarioService, times(1)).delete(scenario.getId());

        // Verify the response status code and message
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Projeto deletado com sucesso", response.getBody());
    }
}