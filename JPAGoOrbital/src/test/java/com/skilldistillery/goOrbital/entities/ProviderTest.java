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

class ProviderTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Provider provider;

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
		provider = em.find(Provider.class, 3);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		provider = null;
	}


	//@Test
	@DisplayName("testing fields in entity")
	void test() {
		assertNotNull(provider);
		assertEquals("Space X", provider.getName());
	}
	//@Test
	@DisplayName("testing relationships in entity")
	void test1() {
		
		assertEquals(1, provider.getTrips().size());
	}
	@Test
	@DisplayName("testing relationships in entity")
	void test2() {
		
		assertEquals(2, provider.getVehicles().size());
	}
	
}
