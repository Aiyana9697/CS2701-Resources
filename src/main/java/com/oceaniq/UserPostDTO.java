package com.example.demo.DTO;

// handles the incoming data from the client, without exposing the user model
import com.example.demo.Models.UserType;

public class UserPostDTO {
	String name;
	String email;
	String password;
	UserType userType;

	public UserPostDTO(String name, String email, String password, Boolean user, Boolean admin) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
		this.userType = convertType(user, admin);
	} // fields that clients need to send

	// Getters and Setters to retrieve the values of the fields and set/update them
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public UserType getUserType() {
		return userType;
	}

	public void setUserType(UserType userType) {
		this.userType = userType;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public UserType convertType(Boolean user, Boolean admin) {// converts boolean values into an enum value
		boolean isUser = Boolean.TRUE.equals(user);
		boolean isAdmin = Boolean.TRUE.equals(admin);

		if (!isUser && !isAdmin)
			return UserType.NONE;

		if (isUser && !isAdmin)
			return UserType.USER;

		if (!isUser)
			return UserType.ADMIN;

		return UserType.BOTH;
	} // this keeps the user model seperate from what the client sends or controls
}