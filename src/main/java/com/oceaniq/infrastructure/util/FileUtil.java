// package com.oceaniq.infrastructure.util;

// import java.text.DecimalFormat;

// /**
//  * FileUtil provides utility methods for handling file-related operations (formatting file sizes / validating file extensions)
//  * ensures consistent handling of files across application
//  * makes it easier to maintain file-related logic in one place.
//  * 
//  * Inspiration and reference were taken from:
//  * https://github.com/xjdhanyu/DateUtils/blob/master/DateUtil.java
//  */
// public class FileUtil {
    
//     // units used for formatting file sizes
//     private static final String[] SIZE_UNITS = {"B", "KB", "MB", "GB", "TB"};
    

//     /**
//      * converts a file size in bytes into a human-readable format
//      * @param size file size in byes 
//      * @return formatted file size string
//     */
//     public static String formatFileSize(long size) {
//         if (size <= 0) return "0 B";
        
//         int digitGroups = (int) (Math.log10(size) / Math.log10(1024));
//         return new DecimalFormat("#,##0.#")
//             .format(size / Math.pow(1024, digitGroups)) + " " + SIZE_UNITS[digitGroups];
//     }
    

//     /**
//      * Extracts the file extention from a file name
//      * @param fileName name of file
//      * @return file extention in lowercase (or empty string if none)
//     */
//     public static String getFileExtension(String fileName) {
//         if (fileName == null || fileName.isEmpty()) {
//             return "";
//         }
        
//         int lastDotIndex = fileName.lastIndexOf('.');
//         if (lastDotIndex == -1) {
//             return "";
//         }
        
//         return fileName.substring(lastDotIndex + 1).toLowerCase();
//     }
    
//     /**
//      * checks if file has valid extension 
//      * @param fileName file name to check 
//      * @param allowedExtensions list of allowed file extensions 
//      * @return true if file extension is allowed
//     */
//     public static boolean isValidFileExtension(String fileName, String[] allowedExtensions) {
//         String extension = getFileExtension(fileName);
//         for (String allowed : allowedExtensions) {
//             if (extension.equalsIgnoreCase(allowed)) {
//                 return true;
//             }
//         }
//         return false;
//     }
// }