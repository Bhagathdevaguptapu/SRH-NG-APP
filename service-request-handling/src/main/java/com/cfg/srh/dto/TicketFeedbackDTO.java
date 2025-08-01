package com.cfg.srh.dto;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class TicketFeedbackDTO {
    private Integer feedbackId;
    private Integer ticketId;
    private Integer employeeId;
    private String feedbackText;
    private Timestamp givenAt;
}
