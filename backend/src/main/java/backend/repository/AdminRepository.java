package backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import backend.domain.Admin;

@Repository
public interface AdminRepository extends MongoRepository<Admin, String> {

	Admin findByLogin(String login);
	
}
