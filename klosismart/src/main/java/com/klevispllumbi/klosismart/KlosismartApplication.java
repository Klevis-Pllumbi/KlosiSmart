package com.klevispllumbi.klosismart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class KlosismartApplication {

	public static void main(String[] args) {
		SpringApplication.run(KlosismartApplication.class, args);
	}

}
