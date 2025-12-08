package com.gastosplus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class GastosplusApplication {

	public static void main(String[] args) {
		SpringApplication.run(GastosplusApplication.class, args);
	}

}
