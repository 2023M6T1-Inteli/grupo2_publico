package inteli.cc6.repository;

import inteli.cc6.model.Scenario;
import org.springframework.data.mongodb.repository.MongoRepository;

// Necessary repository for MongoDB
public interface ScenarioRepository extends MongoRepository<Scenario, String> {
}

