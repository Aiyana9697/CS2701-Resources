package com.oceaniq; // middle layer between controller and repos
// controller doesn't talk to repos directly, it goes through a service
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Models.User;
import com.example.demo.Repos.UserRepository;
import com.example.demo.Exceptions.ResourceNotFoundException;

@Service // tells Spring that it needs to manage this class as a bean
public class UserService {
	@Autowired // tells Spring to inject an instance of UserRepository into this class
    UserRepository userRepository;
	
	public UserService() {
		super();
		// Auto-generated constructor stub
	}
	
	
	public List<User> getUsers() { // calls the repository to fetch all users
		return (List<User>) userRepository.findAll();
	}

	public void addUser(User newUser) { // save a new user
		userRepository.save(newUser);
	}
	
	public Optional<User> findByID(Long id) { // find a user based on ID
		 return userRepository.findById(id);
	}
	
	public void deleteUser(Long id) { // deletes user from the table
		User user = userRepository.findById(id)
				  .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
				  // if not found, throws an exception with a message of a resource type, etc
		userRepository.delete(user);
	}
	
	public User findByEmail(String email) { // find a user based on email
		return userRepository.findByEmail(email);
	}

}
