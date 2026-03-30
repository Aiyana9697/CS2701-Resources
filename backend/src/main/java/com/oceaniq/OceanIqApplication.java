package com.oceaniq;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class OceanIqApplication {
	public static void main(String[] args) {
		SpringApplication.run(OceanIqApplication.class, args);
	}

}