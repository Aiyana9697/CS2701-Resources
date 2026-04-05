package com.oceaniq;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


/**
 * Main application class for OceanIQ backend 
 * entry point for Spring Boot application
 * enables JPA auditing for automatic management of created/updated timestamps in entities
 * 
 * Inspiration and reference were taken from: 
 * https://medium.com/@sonu.satyanand182/simplifying-audit-logging-in-spring-boot-with-enablejpaauditing-and-spring-security-31dab12c65b0
*/
@SpringBootApplication
@EnableJpaAuditing
public class OceanIqApplication {
	public static void main(String[] args) {
		SpringApplication.run(OceanIqApplication.class, args);
	}

}