package com.cfg.srh.dto;

import lombok.Data;

@Data
public class TicketDTO {
	private int ticketId;
    private String title;
    private String description;
    private String status;
    
    public TicketDTO(int ticketId, String title, String description, String status) {
        this.ticketId = ticketId;
        this.title = title;
        this.description = description;
        this.status = status;
    }

}
