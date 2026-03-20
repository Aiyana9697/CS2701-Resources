// package com.oceaniq.infrastructure.util;

// import java.time.LocalDate;
// import java.time.LocalDateTime;
// import java.time.format.DateTimeFormatter;

// /*
//  * DateUtil provides utility methods for formatting & parsing dates and date-times.
//  * ensures consistent date formats across application 
//  * making it easier to maintain / update date formats if needed
//  * 
//  * Inspiration and reference were taken from:
//  * https://github.com/xjdhanyu/DateUtils/blob/master/DateUtil.java
//  */
// public class DateUtil {
    
//     // formatter for date-only values
//     private static final DateTimeFormatter DATE_FORMATTER = 
//         DateTimeFormatter.ofPattern("yyyy-MM-dd");

//     // formatter for date & time values
//     private static final DateTimeFormatter DATETIME_FORMATTER = 
//         DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    
//     /**
//      * Formats a LocalDate into a string using the date format.
//      *
//      * @param date LocalDate object
//      * @return formatted date string (or null if date is null)
//      */
//     public static String formatDate(LocalDate date) {
//         return date != null ? date.format(DATE_FORMATTER) : null;
//     }
    
//     /**
//      * Formats a LocalDateTime into a string using the date-time format.
//      *
//      * @param dateTime LocalDateTime object
//      * @return formatted date-time string (or null if dateTime is null)
//      */
//     public static String formatDateTime(LocalDateTime dateTime) {
//         return dateTime != null ? dateTime.format(DATETIME_FORMATTER) : null;
//     }
    
//     /**
//      * Parses a date string into a LocalDate object using the date format.
//      *
//      * @param dateStr  date string to parse
//      * @return  parsed LocalDate object (or null if string is null / invalid)
//      */
//     public static LocalDate parseDate(String dateStr) {
//         return dateStr != null ? LocalDate.parse(dateStr, DATE_FORMATTER) : null;
//     }
    
//     /**
//      * Parses a date-time string into a LocalDateTime object using the date-time format.
//      *
//      * @param dateTimeStr the date-time string to parse
//      * @return parsed LocalDateTime object, (or null if string is null / invalid)
//      */
//     public static LocalDateTime parseDateTime(String dateTimeStr) {
//         return dateTimeStr != null ? LocalDateTime.parse(dateTimeStr, DATETIME_FORMATTER) : null;
//     }
    
//     /**
//     * Checks if a given date falls within a specified date range
//     *
//     * @param date the date to check
//     * @param start the start date of the range
//     * @param end the end date of the range
//     * @return true if the date is within the range, otherwise false
//     */
//     public static boolean isDateInRange(LocalDate date, LocalDate start, LocalDate end) {
//         return !date.isBefore(start) && !date.isAfter(end);
//     }
// }