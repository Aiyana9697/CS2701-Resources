// package com.oceaniq.infrastructure.util;

// import java.util.regex.Pattern;

// /**
//  * ValidationUtil provides utility methods for handling user input related operations (authentication, API request validation)
//  * improves data intengrity (prevent invalid data) / security issue
//  * 
//  * Inspiration and reference were taken from:
//  * https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/validation/ValidationUtils.html
//  * https://www.baeldung.com/java-email-validation-regex
//  */

// public class ValidationUtil {
    
//     // regex pattern for validating email addresses 
//     private static final Pattern EMAIL_PATTERN = 
//         Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
    
//     /**
//      * regex pattern for validating strong passwords 
//      * passwords must have 8 characters
//      * at least 1 digit, lowercase / uppercase letter, special character
//      * and no whitespace
//     */
//     private static final Pattern PASSWORD_PATTERN = 
//         Pattern.compile("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$");
    
//     /**
//      * validates email format 
//      * 
//      * @param email input email 
//      * @return true if email if valid
//     */
//     public static boolean isValidEmail(String email) {
//         return email != null && EMAIL_PATTERN.matcher(email).matches();
//     }
    
//     /**
//      * validates password's strength 
//      * 
//      * @param password input password
//      * @return true if password meets security requirements
//     */
//     public static boolean isValidPassword(String password) {
//         return password != null && PASSWORD_PATTERN.matcher(password).matches();
//     }
    
//     /**
//      * validates URL format to ensure it stats with 'http://' or 'https://'
//      * 
//      * @param url input URL 
//      * @return true if valid
//     */
//     public static boolean isValidUrl(String url) {
//         if (url == null || url.isEmpty()) {
//             return false;
//         }
//         return url.startsWith("http://") || url.startsWith("https://");
//     }

//     /**
//      * checks if a atring is numeric 
//      * 
//      * @param str input string
//      * @return true if string can be parsed as a number
//     */
//     public static boolean isNumeric(String str) {
//         if (str == null || str.isEmpty()) {
//             return false;
//         }
//         try {
//             Double.parseDouble(str);
//             return true;
//         } catch (NumberFormatException e) {
//             return false;
//         }
//     }
// }