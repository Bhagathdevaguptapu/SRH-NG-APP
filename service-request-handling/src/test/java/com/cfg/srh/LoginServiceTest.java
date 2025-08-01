package com.cfg.srh;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.Optional;

import com.cfg.srh.entities.AdminEntity;
import com.cfg.srh.entities.EmployeeEntity;
import com.cfg.srh.repository.AdminRepository;
import com.cfg.srh.repository.EmployeeRepository;
import com.cfg.srh.services.LoginService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class LoginServiceTest {

    @InjectMocks
    private LoginService loginService;

    @Mock
    private AdminRepository adminRepo;

    @Mock
    private EmployeeRepository employeeRepo;

    private AdminEntity admin;
    private EmployeeEntity employee;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);

        admin = new AdminEntity();
        admin.setEmail("admin@example.com");
        admin.setPassword("admin123");

        employee = new EmployeeEntity();
        employee.setEmail("emp@example.com");
        employee.setPassword("emp123");
    }


    @Test
    public void testLoginAdmin_Success() {
        when(adminRepo.findByEmail("admin@example.com")).thenReturn(Optional.of(admin));

        String result = loginService.loginAdmin("admin@example.com", "admin123");

        assertEquals("Admin login successful", result);
    }

    @Test
    public void testLoginAdmin_IncorrectPassword() {
        when(adminRepo.findByEmail("admin@example.com")).thenReturn(Optional.of(admin));

        String result = loginService.loginAdmin("admin@example.com", "wrongpassword");

        assertEquals("Admin login failed: Incorrect password", result);
    }

    @Test
    public void testLoginAdmin_NotFound() {
        when(adminRepo.findByEmail("notfound@example.com")).thenReturn(Optional.empty());

        String result = loginService.loginAdmin("notfound@example.com", "any");

        assertEquals("Admin not found in the database", result);
    }


    @Test
    public void testEmployeeLogin_Success() {
        when(employeeRepo.findByEmail("emp@example.com")).thenReturn(Optional.of(employee));

        String result = loginService.employeeLogin("emp@example.com", "emp123");

        assertEquals("Employee login successful", result);
    }

    @Test
    public void testEmployeeLogin_IncorrectPassword() {
        when(employeeRepo.findByEmail("emp@example.com")).thenReturn(Optional.of(employee));

        String result = loginService.employeeLogin("emp@example.com", "wrong");

        assertEquals("Employee login failed: Incorrect password", result);
    }

    @Test
    public void testEmployeeLogin_NotFound() {
        when(employeeRepo.findByEmail("missing@example.com")).thenReturn(Optional.empty());

        String result = loginService.employeeLogin("missing@example.com", "anything");

        assertEquals("Employee not found in the database", result);
    }
}
