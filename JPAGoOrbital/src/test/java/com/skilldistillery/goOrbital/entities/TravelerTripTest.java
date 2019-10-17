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

class TravelerTripTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private TravelerTrip tp;

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
		tp = em.find(TravelerTrip.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		tp = null;
	}

	//@Test
	@DisplayName("testing fields of entity")
	void test() {
		assertNotNull(tp);
		assertEquals(5, tp.getRating());
		
	}
	
	@Test
	@DisplayName("testing tt relationship")
	void test1() {
		
		assertEquals(2, tp.getTraveler().getId());
		
	}

}
