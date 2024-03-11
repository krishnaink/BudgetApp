public class Savings
{
  
	private double percentage;
	private String name;
	private boolean recurring;
	private String frequency;


	public Savings(double percentage, double targetAmount, String name, String frequency)
	{
		setPercentage(percentage);
		setName(name);
		setFrequency(frequency);
	}

	public double getPercentage()
	{
		return percentage;
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



	public void setPercentage(double percentage)
	{
		this.percentage = percentage;
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