package com.example.demo.Repos;

import com.example.demo.Models.User;
import org.springframework.data.repository.CrudRepository;
 //Provides me built in operations without any SQL

public interface UserRepository extends CrudRepository<User, Long> {
	User findByEmail(String email); // allows me to search for a user by their email address
}
