package com.gymmate.security;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.gymmate.entities.Admin;
import com.gymmate.entities.BaseEntity;
import com.gymmate.entities.Receptionist;
import com.gymmate.entities.Trainer;
import com.gymmate.entities.UserEntity;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
 
@Component
public class JwtUtils {
	@Value("${jwt.token.secret}")
	private String jwtSecret;

	@Value("${jwt.token.expiration.millis}")
	private int jwtExpirationMs;

	private SecretKey key;// => represents symmetric key

	@PostConstruct
	public void init() {
		key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
	}

	public String generateJwtToken(Authentication authentication) {
		BaseEntity userPrincipal= new BaseEntity();
		if (authentication.getPrincipal() instanceof UserEntity) {
			userPrincipal = (UserEntity) authentication.getPrincipal();
		} else if (authentication.getPrincipal() instanceof Trainer) {
			userPrincipal = (Trainer) authentication.getPrincipal();
		} else if (authentication.getPrincipal() instanceof Receptionist) {
			userPrincipal = (Receptionist) authentication.getPrincipal();
		} else if (authentication.getPrincipal() instanceof Admin) {
			userPrincipal = (Admin) authentication.getPrincipal();
		}

		return Jwts.builder() 
				.subject((userPrincipal.getUsername()))
				.issuedAt(new Date())
				.expiration(new Date((new Date()).getTime() + jwtExpirationMs))
				.claim("authorities", getAuthoritiesInString(userPrincipal.getAuthorities()))
				.claim("isSubscribed", userPrincipal.isSubscribed())
				.claim("id", userPrincipal.getId())
				.claim("firstName", userPrincipal.getFirstName())
				
				.signWith(key, Jwts.SIG.HS256) 
				.compact();
	}

	public String getUserNameFromJwtToken(Claims claims) {
		return claims.getSubject();
	}

	private List<String> getAuthoritiesInString(Collection<? extends GrantedAuthority> authorities) {
		return authorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
	}

	public List<GrantedAuthority> getAuthoritiesFromClaims(Claims claims) {

		List<String> authorityNamesFromJwt = (List<String>) claims.get("authorities");
		List<GrantedAuthority> authorities = authorityNamesFromJwt.stream().map(SimpleGrantedAuthority::new)
				.collect(Collectors.toList());

		authorities.forEach(System.out::println);
		return authorities;
	}

	public Claims validateJwtToken(String jwtToken) {
		// try {
		Claims claims = Jwts.parser()

				.verifyWith(key) 
				.build()

				.parseSignedClaims(jwtToken)
				.getPayload();
		
		return claims;
	}

	public Authentication populateAuthenticationTokenFromJWT(String jwt) {
		Claims payloadClaims = validateJwtToken(jwt);
		String email = getUserNameFromJwtToken(payloadClaims);
		List<GrantedAuthority> authorities = getAuthoritiesFromClaims(payloadClaims);
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(email, null, authorities);
		System.out.println("is authenticated " + token.isAuthenticated());// true
		return token;

	}
}
