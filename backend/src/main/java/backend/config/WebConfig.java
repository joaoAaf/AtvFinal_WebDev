package backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
@EnableWebSecurity
public class WebConfig implements WebMvcConfigurer {
	 
    	@Autowired
    	private FilterToken filter;
	
		public void addCorsMappings(CorsRegistry registry) {
	        registry.addMapping("/**");
	    }
	    
		@Bean
	    public SecurityFilterChain sfc (HttpSecurity httpSec) throws Exception {
	    	return httpSec.csrf((csrf) -> csrf.disable())
	    			.sessionManagement((sessionManagement) ->
	 					sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	    			.authorizeHttpRequests((authorizeHttpRequests) -> authorizeHttpRequests
 						.requestMatchers("/**"/*HttpMethod.POST,"/login"*/).permitAll()/*.anyRequest().authenticated()*/)
	    			.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class)
	    			.build();
		}

	    @Bean
	    public AuthenticationManager authM (AuthenticationConfiguration authConfig) throws Exception {
	    	return authConfig.getAuthenticationManager();

	    }

	    @Bean
	    public PasswordEncoder passEncod () {
	    	return new BCryptPasswordEncoder();
	    }
	    
}
