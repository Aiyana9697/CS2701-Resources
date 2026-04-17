package com.oceaniq.saved.dto.request;

import com.oceaniq.saved.enums.ItemType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Setter;
import lombok.Getter;

/**
 * Request DTO for saving an item
 * Used when user wants to save a specific item (dataset, module, or discussion)
 */
@Setter
@Getter
public class SaveItemRequest {
    
    // type of the item being saved (required)
    @NotNull(message = "Item type is required")
    private ItemType itemType;
    
    // ID of the item being saved (required)
    @NotNull(message = "Item ID is required")
    private Long itemId;
    
    // title of item being saved (optional, max length 200 characters)
    @Size(max = 200, message = "Title must not exceed 200 characters")
    private String itemTitle;
    
    // Description of the item being saved (optional, max length 500 characters)
    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String itemDescription;
    
    // optional URL / image of saved item
    private String itemThumbnail;
    
}