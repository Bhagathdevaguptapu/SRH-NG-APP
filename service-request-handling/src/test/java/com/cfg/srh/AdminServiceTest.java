package com.cfg.srh;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import com.cfg.srh.dto.EmployeeDTO;
import com.cfg.srh.entities.Department;
import com.cfg.srh.entities.EmployeeEntity;
import com.cfg.srh.entities.Ticket;
import com.cfg.srh.exceptions.InvalidDepartmentException;
import com.cfg.srh.repository.DepartmentRepository;
import com.cfg.srh.repository.EmployeeRepository;
import com.cfg.srh.repository.TicketRepository;
import com.cfg.srh.services.AdminService;

@SpringBootTest
public class AdminServiceTest {

    @InjectMocks
    private AdminService adminService;

    @Mock
    private TicketRepository ticketrepo;

    @Mock
    private DepartmentRepository departmentrepo;

    @Mock
    private EmployeeRepository employeeRepo;

    private EmployeeEntity employee;
    private Ticket ticket;
    private Department department;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);

        ticket = new Ticket();
        ticket.setTicketId(1);
        ticket.setStatus("OPEN");

        department = new Department();
        department.setDepartmentId(10);
        department.setName("IT");

        employee = new EmployeeEntity();
        employee.setEmployeeId(101);
        employee.setName("John Doe");
        employee.setTickets(List.of(ticket));
    }

    @Test
    public void testFetchEmployeeTicketsById_Found() {
        when(employeeRepo.findById(101)).thenReturn(Optional.of(employee));

        EmployeeDTO dto = adminService.fetchEmployeeTicketsById(101);
        assertNotNull(dto);
        assertEquals("John Doe", dto.getName());
        assertEquals(1, dto.getTickets().size());
    }

    @Test
    public void testFetchEmployeeTicketsById_NotFound() {
        when(employeeRepo.findById(999)).thenReturn(Optional.empty());

        EmployeeDTO dto = adminService.fetchEmployeeTicketsById(999);
        assertNull(dto);
    }

    @Test
    public void testFetchAllEmployeeTickets() {
        when(employeeRepo.findAll()).thenReturn(List.of(employee));

        List<EmployeeDTO> all = adminService.fetchAllEmployeeTickets();
        assertEquals(1, all.size());
        assertEquals(101, all.get(0).getEmployeeId());
    }

    @Test
    public void testCancelTicketById_Success() {
        when(ticketrepo.findById(1)).thenReturn(Optional.of(ticket));

        adminService.cancelTicketById(1, "User requested cancellation");

        assertEquals("Cancelled", ticket.getStatus());
        assertEquals("User requested cancellation", ticket.getCancelReason());
        verify(ticketrepo, times(1)).save(ticket);
    }

    @Test
    public void testCancelTicketById_NotFound() {
        when(ticketrepo.findById(999)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class, () -> {
            adminService.cancelTicketById(999, "Invalid ticket");
        });
        assertTrue(ex.getMessage().contains("Ticket not found"));
    }

    @Test
    public void testAssignTicketToDepartment_Success() throws InvalidDepartmentException {
        when(ticketrepo.findById(1)).thenReturn(Optional.of(ticket));
        when(departmentrepo.findById(10)).thenReturn(Optional.of(department));

        String result = adminService.assignTicketToDepartment(1, 10);

        assertEquals("ASSIGNED", ticket.getStatus());
        assertEquals(department, ticket.getAssignedToDepartment());
        assertNotNull(ticket.getUpdatedAt());
        assertTrue(result.contains("successfully assigned"));
    }

    @Test
    public void testAssignTicketToDepartment_TicketNotFound() {
        when(ticketrepo.findById(999)).thenReturn(Optional.empty());

        InvalidDepartmentException ex = assertThrows(InvalidDepartmentException.class, () -> {
            adminService.assignTicketToDepartment(999, 10);
        });
        assertEquals("Ticket with ID 999 not found.", ex.getMessage());
    }

    @Test
    public void testAssignTicketToDepartment_DepartmentNotFound() {
        when(ticketrepo.findById(1)).thenReturn(Optional.of(ticket));
        when(departmentrepo.findById(999)).thenReturn(Optional.empty());

        InvalidDepartmentException ex = assertThrows(InvalidDepartmentException.class, () -> {
            adminService.assignTicketToDepartment(1, 999);
        });
        assertEquals("Department with ID 999 not found.", ex.getMessage());
    }
}
