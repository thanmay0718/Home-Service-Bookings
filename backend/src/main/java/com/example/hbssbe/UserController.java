package com.example.hbssbe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
//package com.example.demo.controller;
//
//import com.example.demo.entity.User;
//import com.example.demo.service.UserService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    private final UserService userService;
    @Autowired
    private UserRepository ur;
    
    public UserController(UserService userService) { this.userService = userService; }

    @GetMapping
    public List<User> getAllUsers() { return userService.getAllUsers(); }
    
    
    
    @GetMapping("/emal/{email}")
    public User getUserByEmail(@PathVariable String email) {
    	return ur.findByEmail(email);
    }
    
    @PostMapping
    public User createUser(@RequestBody User user) {
    	return userService.addUser(user);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable Long id){
    	return ResponseEntity.ok(userService.deleteUser(id));
    }
    

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }
    
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
    	Optional<User> u = userService.getUser(id);
    	if(u.isPresent()) 
    		return u.get();
    		
    	return null;    	
    }
    
}
