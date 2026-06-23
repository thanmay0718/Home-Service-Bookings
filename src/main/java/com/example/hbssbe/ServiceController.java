package com.example.hbssbe;
//package com.example.demo.controller;

//import com.example.demo.entity.ServiceEntity;
//import com.example.demo.service.Servi/ceService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "*")
public class ServiceController {
    private final ServiceService serviceService;
    public ServiceController(ServiceService serviceService) { this.serviceService = serviceService; }

    @GetMapping
    public List<ServiceEntity> getAllServices() { return serviceService.getAllServices(); }
    
    @PostMapping
    public ServiceEntity addService(@RequestBody ServiceEntity service) {
    	return serviceService.addService(service);
    }

    @PutMapping("/{id}")
    public ServiceEntity updateService(@PathVariable Long id, @RequestBody ServiceEntity serviceEntity) {
        return serviceService.updateService(id, serviceEntity);
    }
}
