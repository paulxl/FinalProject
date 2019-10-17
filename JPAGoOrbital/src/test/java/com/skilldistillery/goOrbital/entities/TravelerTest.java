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

class TravelerTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Traveler traveler;

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
		traveler = em.find(Traveler.class, 2);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		traveler = null;
	}

	//@Test
	@DisplayName("testing fields of entity")
	void test() {
		assertNotNull(traveler);
		assertEquals("John",traveler.getFirstName());
	}
	@Test
	@DisplayName("testing relationships of entity")
	void test1() {
		
		assertEquals(1,traveler.getTrips().size());
	}
	

}
