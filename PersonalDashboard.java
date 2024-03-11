import java.util.ArrayList;

public class PersonalDashboard {

    private String financialStatus;
    private double balance;
    private double totalIncome;
    private double totalExpenses;
    private double totalSavings;
    private String dashboardName;
    private ArrayList<Income> incomes;
    private ArrayList<Expense> expenses;
    private ArrayList<Savings> savings;

    public PersonalDashboard(String dashboardName) {
      this.dashboardName = dashboardName;
      this.totalIncome = 0;
      this.totalExpenses = 0;
      this.totalSavings = 0;
      this.balance = 0;
      this.financialStatus = "balance";
      this.incomes = new ArrayList<>();
      this.expenses = new ArrayList<>();
      this.savings = new ArrayList<>();
    }

    // Getters and setters for attributes

    public String getFinancialStatus() {
      return financialStatus;
    }

    public String getDashboardName() {
      return dashboardName;
    }

    public void setDashboardName(String dashboardName) {
      this.dashboardName = dashboardName;
    }

    public ArrayList<Income> getIncomes() {
      return incomes;
    }

    public ArrayList<Expense> getExpenses() {
      return expenses;
    }

    public ArrayList<Savings> getSavings() {
      return savings;
    }

    public void addExpense(Expense otherExpense) {
      expenses.add(otherExpense);
      totalExpenses += otherExpense.getCost();
      setFinancialStatus();
    }

    public void addIncome(Income otherIncome) {
      incomes.add(otherIncome);
      totalIncome += otherIncome.getEarnings();
      setFinancialStatus();
    }

    public void addSavings(Savings otherSavings) {
      if (totalSavings + otherSavings.getPercentage() <= 100) {
        savings.add(otherSavings);
        totalSavings += otherSavings.getPercentage();
        setFinancialStatus();
      } 
      else {
        throw new IllegalArgumentException("You have reached the maximum savings limit of 100%");
      }
    }

    private void setFinancialStatus() {
      balance = totalIncome * (1 - totalSavings / 100) - totalExpenses;
      
      if (balance > 0) {
        financialStatus = "profit";
      } 
      else if (balance < 0) {
        financialStatus = "loss";
      } 
      else {
        financialStatus = "balance";
      }
    }

    public int numOfExpenses() {
      return expenses.size();
    }

    public int numOfIncomes() {
      return incomes.size();
    }
}
