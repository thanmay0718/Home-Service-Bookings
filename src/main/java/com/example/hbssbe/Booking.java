package com.example.hbssbe;
//package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long serviceid;
    private Long userid;
    private LocalDate date;
    private String time;
    private String status;
    private String address;
    private String contact;
    private double price;
    private String additionalInfo;

    public Booking() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Booking(Long serviceid, Long userid, LocalDate date, String time, String status, String address,
			String contact, double price, String additionalInfo) {
		super();
		this.serviceid = serviceid;
		this.userid = userid;
		this.date = date;
		this.time = time;
		this.status = status;
		this.address = address;
		this.contact = contact;
		this.price = price;
		this.additionalInfo = additionalInfo;
	}
	@Override
	public String toString() {
		return "Booking [id=" + id + ", serviceid=" + serviceid + ", userid=" + userid + ", date=" + date + ", time="
				+ time + ", status=" + status + ", address=" + address + ", contact=" + contact + ", price=" + price
				+ ", additionalInfo=" + additionalInfo + "]";
	}
	// Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getServiceid() { return serviceid; }
    public void setServiceid(Long serviceid) { this.serviceid = serviceid; }

    public Long getUserid() { return userid; }
    public void setUserid(Long userid) { this.userid = userid; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getAdditionalInfo() { return additionalInfo; }
    public void setAdditionalInfo(String additionalInfo) { this.additionalInfo = additionalInfo; }
}
