package backend.config;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import backend.domain.Admin;
import backend.domain.User;
import backend.repository.AdminRepository;
import backend.repository.UserRepository;
import backend.services.AdminService;

@Configuration
public class Instantiation implements CommandLineRunner {

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private AdminRepository adminRepo;

	@Autowired
	private AdminService adminServ;
	
	@Override
	public void run(String... args) throws Exception {
		
		SimpleDateFormat fDate = new SimpleDateFormat("dd/MM/yyyy");
		fDate.setTimeZone(TimeZone.getTimeZone("GMT"));
		
		if(adminRepo.count() == 0) {
			Admin admin = new Admin(null,"Administrador","admin","123456");
			adminServ.insert(admin);
		}
		
		if(userRepo.count() == 0) {
			User user1 = new User(null, "Fulano de Tal", "fulano@gmail.com","85986534700");
			User user2 = new User(null, "Sicrano da Silva", "sicrano@gmail.com","85996244105");
			User user3 = new User(null, "Beltrano Costa", "beltrano@gmail.com","88999303590");
			userRepo.saveAll(Arrays.asList(user1,user2,user3));
		}
	}
}
