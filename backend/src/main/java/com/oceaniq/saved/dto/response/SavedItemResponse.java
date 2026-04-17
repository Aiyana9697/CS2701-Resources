package com.oceaniq.saved.dto.response;

import com.oceaniq.saved.enums.ItemType;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.Getter;

import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Response DTO representing a saved item returned to client
 * Contains generic saved item data + optional detailed metadata 
 * depending on the type of item (dataset, discussion, portal content)
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SavedItemResponse {
    
    private Long id;
    private ItemType itemType;
    private Long itemId;
    private String itemTitle;
    private String itemDescription;
    private String itemThumbnail;
    private String notes;
    private LocalDateTime savedAt;
    private ItemDetails details;
    
    @Setter
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ItemDetails {

        // For datasets
        private String uploaderName;
        private String category;
        private String region;
        
        // For discussions
        private String authorName;
        private Integer replyCount;
        
        // For portal content
        private String contentType;
        private Integer viewCount;
        
        // general status of item
        private String status;
    }
}