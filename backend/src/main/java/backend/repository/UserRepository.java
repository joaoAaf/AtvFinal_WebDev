package backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import backend.domain.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
	 
}
