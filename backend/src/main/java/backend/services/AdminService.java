package backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import backend.domain.Admin;
import backend.repository.AdminRepository;
import backend.services.exception.ObjectNotFoundException;

@Service
public class AdminService {
	
	@Autowired
	private AdminRepository repo;

	private BCryptPasswordEncoder passEnc() {
		return new BCryptPasswordEncoder();
	}

	public List<Admin> findAll(){
		return repo.findAll();
	}

	public Admin findById(String id) {
		Optional<Admin> admin = repo.findById(id);
		return admin.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado"));
	}

	public Admin insert(Admin admin) {
		admin.setPass(passEnc().encode(admin.getPass()));
		return repo.insert(admin);
	}

	public void delete (String id) {
		findById(id);
		repo.deleteById(id);
	}

	public Admin update(Admin admin) {
		Admin newAdmin = findById(admin.getId());
		updateData(newAdmin, admin);
		return repo.save(newAdmin);
	}

	private void updateData(Admin newAdmin, Admin admin) {
		newAdmin.setName(admin.getName());
		newAdmin.setLogin(admin.getLogin());
		newAdmin.setPass(admin.getPass());
	}
	
}
