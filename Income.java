
public class Income
{
  
  private double earnings;
  private String name;
  private boolean recurring;

  private String frequency;
 

  public Income(double earnings, String name, String frequency)
  {
    setEarnings(earnings);
    setName(name);
    setFrequency(frequency);
    setRecurring();
  }

  public double getEarnings()
  {
    return earnings;
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

  
  public void setEarnings(double earnings)
  {
	this.earnings = earnings;
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
