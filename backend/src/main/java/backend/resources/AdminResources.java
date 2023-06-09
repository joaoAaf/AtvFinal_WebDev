package backend.resources;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import backend.domain.Admin;
import backend.services.AdminService;

@RestController
@RequestMapping(value="/admins")
public class AdminResources {
	
	@Autowired
	private AdminService service;

	@GetMapping
	public ResponseEntity<List<Admin>> findAll () {
		List<Admin> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Admin> findById (@PathVariable String id) {
		Admin admin = service.findById(id);
		return ResponseEntity.ok().body(admin);
	}

	@PostMapping
	public ResponseEntity<Void> insert (@RequestBody Admin admin){
		admin = service.insert(admin);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(admin.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete (@PathVariable String id){
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

	@PutMapping("/{id}")
	public ResponseEntity<Void> update (@RequestBody Admin admin, @PathVariable String id){
		admin.setId(id);
		admin = service.update(admin);
		return ResponseEntity.noContent().build();
	}
	
}
