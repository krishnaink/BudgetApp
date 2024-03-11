import org.junit.Test;
import static org.junit.Assert.*;

import java.util.ArrayList;

public class P2Tester {

    
    @Test
    public void testAddCourse() {
        AcademicDashboard academicDashboard = new AcademicDashboard();
        Course course = new Course("Test Course");
        academicDashboard.addCourse(course);
        assertEquals(1, academicDashboard.getCourses().size());
    }

    @Test
    public void testAddAssignment() {
        AcademicDashboard academicDashboard = new AcademicDashboard();
        Assignment assignment = new Assignment("Test Assignment", 50);
        academicDashboard.addAssignment(assignment);
        assertEquals(1, academicDashboard.getAssignments().size());
    }

    @Test
    public void testAddTest() {
        AcademicDashboard academicDashboard = new AcademicDashboard();
        Test test = new Test("Test Test", 100);
        academicDashboard.addTest(test);
        assertEquals(1, academicDashboard.getTests().size());
    }

    @Test
    public void testExpenseConstructor() {
        Expense expense = new Expense(50.0, "Test Expense");
        assertNotNull(expense);
    }

    @Test
    public void testIncomeConstructor() {
        Income income = new Income(100.0, "Test Income", "monthly");
        assertNotNull(income);
    }

    @Test
    public void testAddExpense() {
        PersonalDashboard dashboard = new PersonalDashboard("Test Dashboard");
        Expense expense = new Expense(50.0, "Test Expense");
        dashboard.addExpense(expense);
        assertEquals(1, dashboard.numOfExpenses());
    }

    @Test
    public void testAddIncome() {
        PersonalDashboard dashboard = new PersonalDashboard("Test Dashboard");
        Income income = new Income(100.0, "Test Income", "monthly");
        dashboard.addIncome(income);
        assertEquals(1, dashboard.numOfIncomes());
    }

    @Test
    public void testAddSavings() {
        PersonalDashboard dashboard = new PersonalDashboard("Test Dashboard");
        Savings savings = new Savings(10.0, 10.0, "Test Savings", "monthly");
        dashboard.addSavings(savings);
        assertEquals(1, dashboard.getSavings().size());
    }

    @Test
    public void testAddAcademicDashboard() {
        StudentProfile profile = new StudentProfile("Test Name", "Test User", "password", "test@example.com", "Undergraduate", "In-State");
        AcademicDashboard academicDashboard = new AcademicDashboard();
        profile.addAcademicDashboard(academicDashboard);
        assertEquals(1, profile.getAcademicDashboard().size());
    }

    @Test
    public void testSetRecurring() {
        Savings savings = new Savings(10.0, 10.0, "Test Savings", "monthly");
        assertTrue(savings.getRecurring());
    }

    @Test
    public void testSetTypeOfStudent() {
        StudentProfile profile = new StudentProfile("Test Name", "Test User", "password", "test@example.com", "Undergraduate", "In-State");
        assertEquals("Undergraduate", profile.getTypeOfStudent());
    }

    @Test
    public void testSetLocation() {
        StudentProfile profile = new StudentProfile("Test Name", "Test User", "password", "test@example.com", "Undergraduate", "In-State");
        assertEquals("In-State", profile.getLocation());
    }
}
