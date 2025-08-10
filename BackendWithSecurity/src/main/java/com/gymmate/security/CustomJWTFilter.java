package com.gymmate.security;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class CustomJWTFilter extends OncePerRequestFilter {
	private final JwtUtils jwtUtils;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String headerValue = request.getHeader("Authorization");
		if (headerValue != null && headerValue.startsWith("Bearer ")) {
			String jwt = headerValue.substring(7);
			Authentication populatedAuthenticationTokenFromJWT = jwtUtils.populateAuthenticationTokenFromJWT(jwt);
			System.out.println(populatedAuthenticationTokenFromJWT);
			SecurityContextHolder.getContext().setAuthentication(populatedAuthenticationTokenFromJWT);

		}
		filterChain.doFilter(request, response);

	}

}
