package com.skilldistillery.goOrbital.entities;

public class CreateCompanyDTO {
	// user fields
	private String username;
	private String password;
	private String email;
	// company field
	private String name;
	private String logoUrl;
	private String webUrl;

	public CreateCompanyDTO() {
	}

	// Create CompanyDTO
	public CreateCompanyDTO(String username, String password, String email, String name, String logoUrl, String webUrl) {
		this.username = username;
		this.password = password;
		this.email = email;
		this.name = name;
		this.logoUrl = logoUrl;
		this.webUrl = webUrl;
	}
	
	public User makeUser() {
		return new User(this.username,this.password,this.email);
	}
	
	public Companies getCompany() {
		Companies company = new Companies(this.name,this.logoUrl,this.webUrl);
		company.setUser(this.makeUser());
		return company;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLogoUrl() {
		return logoUrl;
	}

	public void setLogoUrl(String logoUrl) {
		this.logoUrl = logoUrl;
	}

	public String getWebUrl() {
		return webUrl;
	}

	public void setWebUrl(String webUrl) {
		this.webUrl = webUrl;
	}
}
