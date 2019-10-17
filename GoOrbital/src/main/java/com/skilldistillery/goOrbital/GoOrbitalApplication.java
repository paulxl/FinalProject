package com.skilldistillery.goOrbital;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
@EntityScan("com.skilldistillery.goOrbtial.entities")
public class GoOrbitalApplication extends SpringBootServletInitializer {
	

	 @Override
	  protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
	    return application.sources(GoOrbitalApplication.class);
	  }

	public static void main(String[] args) {
		SpringApplication.run(GoOrbitalApplication.class, args);
	}

}
