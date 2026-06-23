package com.example.hbssbe;
//package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String password;
    private String name;
    private boolean isAdmin;
    private String phone;
    private String address;
    
    
    @Override
	public String toString() {
		return "User [id=" + id + ", email=" + email + ", password=" + password + ", name=" + name + ", isAdmin="
				+ isAdmin + ", phone=" + phone + ", address=" + address + "]";
	}
	public User(String email, String password, String name, boolean isAdmin, String phone, String address) {
		super();
		this.email = email;
		this.password = password;
		this.name = name;
		this.isAdmin = isAdmin;
		this.phone = phone;
		this.address = address;
	}
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}
	// Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public boolean isAdmin() { return isAdmin; }
    public void setAdmin(boolean admin) { isAdmin = admin; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}
