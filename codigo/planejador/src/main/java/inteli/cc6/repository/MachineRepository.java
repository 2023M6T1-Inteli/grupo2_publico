package inteli.cc6.repository;

import inteli.cc6.model.Machine;
import org.springframework.data.mongodb.repository.MongoRepository;

// Necessary repository for MongoDB
public interface MachineRepository extends MongoRepository<Machine, String> {
}
