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

class VehicleTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Vehicle vehicle;

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
		vehicle = em.find(Vehicle.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		vehicle = null;
	}

	//@Test
	@DisplayName("testing vehicle entities")
	void test() {
		assertNotNull(vehicle);
		assertEquals("Omega ", vehicle.getName());
		
	}
	//@Test
	@DisplayName("testing provider relationships")
	void test1() {
		
		assertEquals(5, vehicle.getCompanies().getId());
		
	}
	@Test
	@DisplayName("testing trip relationships")
	void test2() {
		
		assertEquals(1, vehicle.getTrips().size());
		
	}

}
