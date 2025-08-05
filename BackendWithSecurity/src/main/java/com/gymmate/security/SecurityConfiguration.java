package com.gymmate.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.AllArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@AllArgsConstructor
public class SecurityConfiguration {

	private final CustomUserDetailsServiceImpl customUserDetailsServiceImpl;
	private final CustomJWTFilter customJWTFilter;

	@Bean
	SecurityFilterChain configureFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable());
		http.cors();

		http.authorizeHttpRequests(authz -> authz
				// PUBLIC ENDPOINTS (anyone can access)
				.requestMatchers("/user/register", "/auth/**", "/subscriptions").permitAll()
				.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

				// ADMIN ONLY ENDPOINTS
				.requestMatchers("/admin/**").hasRole("ADMIN")

				// RECEPTIONIST ONLY ENDPOINTS
				.requestMatchers("/receptionist/**").hasRole("RECEPTIONIST")

				// TRAINER ONLY ENDPOINTS
				.requestMatchers("/trainer/**").hasRole("TRAINER")

				// USER-ONLY ENDPOINTS (and higher, if you want)
				.requestMatchers("/user/**").hasRole("USER")
				
				// Otherwise, authenticated
				.anyRequest().authenticated());

		http.sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		http.formLogin(f -> f.disable());
		http.httpBasic(b -> b.disable());
		http.addFilterBefore(customJWTFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

	@Bean
	 PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	 CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(List.of("http://localhost:5173"));
		configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		configuration.setAllowedHeaders(List.of("*"));
		configuration.setAllowCredentials(false);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}
