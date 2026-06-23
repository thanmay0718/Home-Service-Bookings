package com.example.hbssbe;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ServiceDataLoader {

    @Bean
    CommandLineRunner initServices(ServiceRepository serviceRepository) {
        return args -> {

            // If services already exist, do nothing
            if (serviceRepository.count() > 0) {
                return;
            }

            serviceRepository.save(new ServiceEntity( "Plumbing",
                    "Fix water leaks, pipes, and drainage issues", 299,
                    "wrench",
                    "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=500&fit=crop&crop=center&auto=format"));

            serviceRepository.save(new ServiceEntity( "Electrical",
                    "Electrical repairs, wiring, and installations", 399,
                    "zap",
                    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=500&fit=crop&crop=center&auto=format"));

            serviceRepository.save(new ServiceEntity( "Cleaning",
                    "Professional home and office cleaning services", 199,
                    "sparkles",
                    "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=500&fit=crop&crop=center&auto=format"));

            serviceRepository.save(new ServiceEntity( "Carpentry",
                    "Furniture repair and custom woodwork", 349,
                    "hammer",
                    "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=500&fit=crop&crop=center&auto=format"));

            serviceRepository.save(new ServiceEntity( "Painting",
                    "Interior and exterior painting services", 499,
                    "paintbrush",
                    "https://images.unsplash.com/photo-1560439514-4e9645039924?w=800&h=500&fit=crop&crop=center&auto=format"));

            serviceRepository.save(new ServiceEntity( "AC Repair",
                    "Air conditioning maintenance and repair", 449,
                    "wind",
                    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=500&fit=crop&crop=center&auto=format"));

            serviceRepository.save(new ServiceEntity( "Appliance Repair",
                    "Fix washing machines, refrigerators, and other appliances", 379,
                    "wrench",
                    "https://images.unsplash.com/photo-1581578731548-c6a0c3f2f6d3?w=800&h=500&fit=crop&crop=center&auto=format"));

            serviceRepository.save(new ServiceEntity( "Pest Control",
                    "Professional pest control and extermination services", 329,
                    "sparkles",
                    "https://images.unsplash.com/photo-1508002366005-75a695ee2d17?w=800&h=500&fit=crop&crop=center&auto=format"));

            serviceRepository.save(new ServiceEntity( "Landscaping",
                    "Garden design, lawn care, and outdoor maintenance", 549,
                    "wind",
                    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=500&fit=crop&crop=center&auto=format"));

            serviceRepository.save(new ServiceEntity( "Roofing",
                    "Roof repairs, maintenance, and replacement services", 699,
                    "hammer",
                    "https://images.unsplash.com/photo-1597008437705-3f06abbdece4?w=800&h=500&fit=crop&crop=center&auto=format"));

            serviceRepository.save(new ServiceEntity( "Flooring",
                    "Installation and repair of tiles, hardwood, and carpets", 599,
                    "paintbrush",
                    "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?w=800&h=500&fit=crop&crop=center&auto=format"));

            serviceRepository.save(new ServiceEntity( "Security Systems",
                    "Installation and maintenance of security cameras and alarms", 799,
                    "zap",
                    "https://images.unsplash.com/photo-1584438784894-089d6a62b8d5?w=800&h=500&fit=crop&crop=center&auto=format"));

            System.out.println("Default services inserted!");
        };
    }
}
