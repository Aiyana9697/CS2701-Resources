package com.oceaniq.infrastructure.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.oceaniq.infrastructure.shared.dto.response.ApiResponse;
import com.oceaniq.infrastructure.security.JwtAuthenticationFilter;
import com.oceaniq.infrastructure.security.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
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
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

import jakarta.servlet.http.HttpServletResponse;
import java.util.List;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    
    private final CustomUserDetailsService userDetailsService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final ObjectMapper objectMapper;
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
    
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }

    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, HandlerMappingIntrospector introspector) throws Exception {
        MvcRequestMatcher.Builder mvc = new MvcRequestMatcher.Builder(introspector);

        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authenticationProvider(authenticationProvider())
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/**").permitAll()
                .requestMatchers(mvc.pattern(HttpMethod.GET, "/api/v1/regions")).permitAll()
                .requestMatchers(mvc.pattern(HttpMethod.GET, "/api/v1/regions/**")).permitAll()
                .requestMatchers(mvc.pattern(HttpMethod.GET, "/api/v1/species")).permitAll()
                .requestMatchers(mvc.pattern(HttpMethod.GET, "/api/v1/species/**")).permitAll()
                .requestMatchers(mvc.pattern(HttpMethod.GET, "/api/v1/modules")).permitAll()
                .requestMatchers(mvc.pattern(HttpMethod.GET, "/api/v1/modules/**")).permitAll()
                .requestMatchers(mvc.pattern(HttpMethod.GET, "/api/v1/datasets")).permitAll()
                .requestMatchers(mvc.pattern(HttpMethod.GET, "/api/v1/datasets/**")).permitAll()
                .requestMatchers(mvc.pattern(HttpMethod.GET, "/api/v1/impact")).permitAll()
                .requestMatchers(mvc.pattern(HttpMethod.GET, "/api/v1/impact/**")).permitAll()
                .requestMatchers(mvc.pattern(HttpMethod.GET, "/api/learn/timeline")).permitAll()
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .anyRequest().authenticated()
            )
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint((request, response, authException) -> {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                    response.getWriter().write(
                        objectMapper.writeValueAsString(ApiResponse.error("Authentication required"))
                    );
                })
                .accessDeniedHandler((request, response, accessDeniedException) -> {
                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                    response.getWriter().write(
                        objectMapper.writeValueAsString(ApiResponse.error("Access denied"))
                    );
                })
            )
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            );

        return http.build();
    }

}
