package com.example.hbssbe;
//package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "services")
public class ServiceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private double price;
    private String icon;
    private String image;

    public ServiceEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ServiceEntity(String name, String description, double price, String icon, String image) {
		super();
		this.name = name;
		this.description = description;
		this.price = price;
		this.icon = icon;
		this.image = image;
	}
	// Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
	@Override
	public String toString() {
		return "ServiceEntity [id=" + id + ", name=" + name + ", description=" + description + ", price=" + price
				+ ", icon=" + icon + ", image=" + image + "]";
	}
    
}
