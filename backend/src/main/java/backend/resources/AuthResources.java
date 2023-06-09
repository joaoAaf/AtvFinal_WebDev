package backend.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import backend.domain.Admin;
import backend.dto.Login;
import backend.services.TokenService;

@CrossOrigin
@RestController
@RequestMapping(value="/login")
public class AuthResources {

	@Autowired
	private AuthenticationManager authM;

	@Autowired
	private TokenService tokenService;
	
	@RequestMapping(method = RequestMethod.POST)
	public String login(@RequestBody Login login) {
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(login.login(), login.pass());

		Authentication auth = this.authM.authenticate(authToken);

		var admin = (Admin) auth.getPrincipal();

		return tokenService.gerarToken(admin);
	}
	
}
