package com.example.hbssbe;
//package com.example.demo.service;

//import com.example.demo.entity.User;
//import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    public UserService(UserRepository userRepository) { this.userRepository = userRepository; }
    
    public Optional<User> getUser(Long id){
    	return userRepository.findById(id);
    }
    
    public Boolean deleteUser(Long id) {
    	 userRepository.deleteById(id);
    	 return true;
    }
    
    public User addUser(User user) {
    	return userRepository.save(user);
    }

    public List<User> getAllUsers() { return userRepository.findAll(); }

    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setName(updatedUser.getName());
            user.setPhone(updatedUser.getPhone());
            user.setAddress(updatedUser.getAddress());
            return userRepository.save(user);
        }).orElse(null);
    }
}
