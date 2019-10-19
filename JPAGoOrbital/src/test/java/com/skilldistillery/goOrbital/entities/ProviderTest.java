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

class CompaniesTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Companies companies;

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
		companies = em.find(Companies.class, 3);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		companies = null;
	}


	//@Test
	@DisplayName("testing fields in entity")
	void test() {
		assertNotNull(companies);
		assertEquals("Space X", companies.getName());
	}
	//@Test
	@DisplayName("testing relationships in entity")
	void test1() {
		
		assertEquals(1, companies.getTrips().size());
	}
	//@Test
	@DisplayName("testing relationships in entity")
	void test2() {
		
		assertEquals(2, companies.getVehicles().size());
	}
	@Test
	@DisplayName("testing user relationship")
	void test3() {
		
		assertEquals("123xyz", companies.getUser().getPassword());
	}
	
}
