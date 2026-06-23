package com.example.hbssbe;
//package com.example.demo.service;

//import com.example.demo.entity.ServiceEntity;
//import com.example.demo.repository.ServiceRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ServiceService {
    private final ServiceRepository serviceRepository;
    public ServiceService(ServiceRepository serviceRepository) { this.serviceRepository = serviceRepository; }

    public List<ServiceEntity> getAllServices() { return serviceRepository.findAll(); }
    
    public ServiceEntity addService(ServiceEntity s) {
    	return serviceRepository.save(s);
    }

    public ServiceEntity updateService(Long id, ServiceEntity updatedService) {
        return serviceRepository.findById(id).map(service -> {
            service.setName(updatedService.getName());
            service.setDescription(updatedService.getDescription());
            service.setPrice(updatedService.getPrice());
            service.setIcon(updatedService.getIcon());
            service.setImage(updatedService.getImage());
            return serviceRepository.save(service);
        }).orElse(null);
    }
}
