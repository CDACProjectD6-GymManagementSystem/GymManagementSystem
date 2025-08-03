package com.gymmate.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EquipmentCategoryDTO {
    private String category;
    private long activeCount;
    private long maintenanceCount;

    public EquipmentCategoryDTO(String category, long activeCount, long maintenanceCount) {
        this.category = category;
        this.activeCount = activeCount;
        this.maintenanceCount = maintenanceCount;
    }

}
