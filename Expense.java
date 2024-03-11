
public class Expense
{

  private double cost;
  private String name;
  private boolean recurring;
  private String frequency;
 
  public Expense(double cost, String name, String frequency)
  {
    setCost(cost);
    setName(name);
    setFrequency(frequency);
    setRecurring();
  }

  
  public double getCost()
  {
    return cost;
  }

  
  public String getName()
  {
    return name;
  }

  
  public boolean getRecurring()
  {
    return recurring;
  }

  public String getFrequency()
  {
    return frequency;
  }

  
  public void setCost(double cost)
  {
    this.cost = cost;
  }
  
  public void setName(String name)
  {
    this.name = name;
  }

  public void setRecurring()
  {
    if(frequency == null)
    {
      recurring = false;
    }

    else
    {
      recurring = true;
    }
  }

  public void setFrequency(String frequency)
  {
    if(frequency.equalsIgnoreCase("monthly"))
    {
      this.frequency = frequency;
    }

    else if(frequency.equalsIgnoreCase("yearly"))
    {
      this.frequency = frequency;
    }

    else if(frequency.equalsIgnoreCase("weekly"))
    {
      this.frequency = frequency;
    }

    else if(frequency.equalsIgnoreCase("daily"))
    {
      this.frequency = frequency;
    }
    else 
    {
      this.frequency = null;
    }
  }

}
