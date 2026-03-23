package com.example.demo.Controllers;
// handling HTTP requests and responses, talks to the service layer to perform operations on the database
import com.example.demo.DTO.UserPostDTO;
import com.example.demo.Models.User;
import com.example.demo.Models.UserType;
import com.example.demo.Services.UserService;
import com.example.demo.Exceptions.ResourceNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 1. GET all users
    @GetMapping("/user")
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.getUsers();
        return ResponseEntity.ok(users);
    }

    // 2. POST create a new user
    @PostMapping("/user")
    public ResponseEntity<Object> addUser(@RequestBody UserPostDTO newUserDTO) {
        // Validate input
        if (newUserDTO.getEmail() == null || newUserDTO.getEmail().isBlank()) {
            return ResponseEntity.badRequest().body("Email is required");
        }
        if (newUserDTO.getPassword() == null || newUserDTO.getPassword().isBlank()) {
            return ResponseEntity.badRequest().body("Password is required");
        }
        if (newUserDTO.getUserType() == null || newUserDTO.getUserType() == UserType.NONE) {
            return ResponseEntity.badRequest().body("UserType must not be NONE");
        }// receives DTO from the request body, validates the fields, converts it to a user model 
        // and then calls the service to insert it into the table

        // Convert DTO to User model
        User newUser = new User(
                newUserDTO.getEmail(),
                newUserDTO.getPassword(),
                false, // isVerified defaults to false on registration
                true // isActive defaults to true
        );

        userService.addUser(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    // 3. GET user by id
    @GetMapping("/user/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable(value = "id") Long id) {
        if (id <= 0) {
            return ResponseEntity.badRequest().body("ID must be greater than 0");
        }

        Optional<User> user = userService.findByID(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            throw new ResourceNotFoundException("User", "id", id);
        }
    }

    // 4. DELETE user by id
    @DeleteMapping("/user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable(value = "id") Long id) {
        if (id <= 0) {
            return ResponseEntity.badRequest().body("ID must be greater than 0");
        }

        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted");
    }

    // 5. GET user by email (query string)
    @GetMapping("/user/findByEmail")
    public ResponseEntity<Object> getUserByEmail(@RequestParam(value = "email", required = false) String email) {
        if (email == null || email.isBlank()) {
            return ResponseEntity.badRequest().body("Email parameter is required");
        }

        User user = userService.findByEmail(email);
        if (user == null) {
            throw new ResourceNotFoundException("User", "email", email);
        }
        return ResponseEntity.ok(user);
    }
}