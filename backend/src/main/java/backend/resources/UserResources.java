package backend.resources;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import backend.domain.User;
import backend.services.UserService;

@CrossOrigin
@RestController
@RequestMapping(value="/users")
public class UserResources {

	@Autowired
	private UserService service;
	
	
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<User>> findAll () {
		List<User> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@RequestMapping(value ="/{id}", method = RequestMethod.GET)
	public ResponseEntity<User> findById (@PathVariable String id) {
		User user = service.findById(id);
		return ResponseEntity.ok().body(user);
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Void> insert (@RequestBody User user){
		user = service.insert(user);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(user.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> delete (@PathVariable String id){
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Void> update (@RequestBody User user, @PathVariable String id){
		user.setId(id);
		user = service.update(user);
		return ResponseEntity.noContent().build();
	}
}
