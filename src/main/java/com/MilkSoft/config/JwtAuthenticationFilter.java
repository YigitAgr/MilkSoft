package com.MilkSoft.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final String secret;

    public JwtAuthenticationFilter(String secret) {
        this.secret = secret;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            try {
                Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token.substring(7)).getBody();
                String username = claims.getSubject();
                Collection<? extends GrantedAuthority> authorities = null; // Logic to get authorities from claims (optional)
                Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (Exception e) {
                // Handle invalid token exceptions (e.g., send unauthorized response)
            }
        }
        filterChain.doFilter(request, response);
    }

}