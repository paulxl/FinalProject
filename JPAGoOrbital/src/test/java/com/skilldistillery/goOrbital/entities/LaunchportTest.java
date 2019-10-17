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

class LaunchportTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Launchport launchP;

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
		launchP = em.find(Launchport.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		launchP = null;
	}

	@Test
	@DisplayName("testing fields of entity")
	void test() {
		assertNotNull(launchP);
		assertEquals("Spaceport America",launchP.getName());
	}

}
