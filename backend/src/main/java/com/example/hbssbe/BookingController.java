package com.example.hbssbe;
//package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
//import com.example.demo.entity.Booking;
//import com.example.demo.service.BookingService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {
    private final BookingService bookingService;
    @Autowired
    private BookingRepository br;
    public BookingController(BookingService bookingService) { this.bookingService = bookingService; }

    @GetMapping
    public List<Booking> getAllBookings() { return bookingService.getAllBookings(); }
    
    @PostMapping
    public Booking addBooking(@RequestBody Booking b) {
    	return bookingService.addBooking(b);
    }
    
    @DeleteMapping("/{id}")
    public Boolean deleteBooking(@PathVariable Long id) {
    	br.deleteById(id);
    	return true;
    }

    @PutMapping("/{id}/status")
    public Booking updateBookingStatus(@PathVariable Long id, @RequestParam String status) {
        return bookingService.updateBookingStatus(id, status);
    }
}
