package backend.config;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import backend.domain.User;
import backend.repository.UserRepository;

@Configuration
public class Instantiation implements CommandLineRunner {

	@Autowired
	private UserRepository userRepo;
	
	@Override
	public void run(String... args) throws Exception {
		
		SimpleDateFormat fDate = new SimpleDateFormat("dd/MM/yyyy");
		fDate.setTimeZone(TimeZone.getTimeZone("GMT"));
		
		userRepo.deleteAll();
		
		User maria = new User(null, "Maria Brown", "maria@gmail.com","85986534700",true);
		User alex = new User(null, "Alex Green", "alex@gmail.com","85996244105",true);
		User bob = new User(null, "Bob Grey", "bob@gmail.com","88999303590",false);
		
		userRepo.saveAll(Arrays.asList(maria,alex,bob));
	}

}
