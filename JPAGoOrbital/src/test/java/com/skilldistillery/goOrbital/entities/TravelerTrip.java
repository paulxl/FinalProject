package com.skilldistillery.goOrbital.entities;

import static org.junit.jupiter.api.Assertions.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class TravelerTrip {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private TravelerTrip travelerTrip;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("goOrbital");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		travelerTrip = em.find(TravelerTrip.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		travelerTrip = null;
	}

	@Test
	@DisplayName("testing fields of entity")
	void test() {
		assertNotNull(travelerTrip);
		
	}

}
