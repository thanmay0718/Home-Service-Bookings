package com.example.hbssbe;
//package com.example.demo.service;

//import com.example.demo.entity.Booking;
//import com.example.demo.repository.BookingRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    public BookingService(BookingRepository bookingRepository) { this.bookingRepository = bookingRepository; }
    
    public Booking addBooking(Booking b) {
    	return bookingRepository.save(b);
    }

    public List<Booking> getAllBookings() { return bookingRepository.findAll(); }

    public Booking updateBookingStatus(Long id, String status) {
        return bookingRepository.findById(id).map(booking -> {
            booking.setStatus(status);
            return bookingRepository.save(booking);
        }).orElse(null);
    }
}
