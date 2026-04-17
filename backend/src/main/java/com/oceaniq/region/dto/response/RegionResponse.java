package com.oceaniq.region.dto.response;

import com.oceaniq.region.enums.RegionType;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RegionResponse {
    
    private Long id;
    private String name;
    private String description;
    private String coordinates;
    private String oceanName;
    private RegionType type;
}