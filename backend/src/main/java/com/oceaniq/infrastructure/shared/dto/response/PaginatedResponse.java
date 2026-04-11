package com.oceaniq.infrastructure.shared.dto.response;

import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.List;

/**
 * Generic response wrapper provides standardised format for returning paginated data from API endpoints
 * includes pagination metadata (current page, total pages, total elements, page size) + actual content (list of items) for current page
 * uses boolean flags to indicate if  current page is first or last page of results 
 * uses generic type parameter <T> to allow wrapping any type of data in the content list
*/
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PaginatedResponse<T> {
    

    private List<T> content; 
    private int currentPage;
    private int totalPages;
    private long totalElements;
    private int pageSize;
    private boolean first;
    private boolean last;
    
    /**
     * Constructor to create a PaginatedResponse with pagination metadata + content list
      * calculates first & last page flags based on current page and total pages
      * used by service layer to create paginated responses for API endpoints that return lists of data
    */
    public PaginatedResponse(List<T> content, int currentPage, int totalPages, 
        long totalElements, int pageSize) {
            
        this.content = content;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
        this.pageSize = pageSize;

        // derived fields
        this.first = currentPage == 0; 
        this.last = currentPage == totalPages - 1;
    }
}