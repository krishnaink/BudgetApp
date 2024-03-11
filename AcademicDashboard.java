public class AcademicDashboard
{

	private String location;
	private String typeOfStudent;

	private int credits;

	private double tuition;

	private double housingCost;
	private String housingOptions;
	private String roomDescription;

	private String mealPlans;
	private int bonusFunds;
	private double mealPlanCost;


	private double parkingCost;
	private String parkingLocation;
	private String parkingPermit;

	private double semesterCost;

	public AcademicDashboard(String location, String typeOfStudent)
	{
		this.location = location;
		this.typeOfStudent = typeOfStudent;
		this.housingCost = 0;
		this.mealPlanCost = 0;
		this.tuition = 0;
	}



	public void setLocation(String location)
	{
		this.location = location;
	}
	public String getLocation()
	{
		return this.location;
	}
	public void setTypeOfStudent(String typeOfStudent)
	{
		this.typeOfStudent = typeOfStudent;
	}
	public String getTypeOfStudent()
	{
		return this.typeOfStudent;
	}
	public double getSemesterCost()
	{
		return this.semesterCost;
	}
	public void semesterCost()
	{
		this.semesterCost = (this.tuition + this.housingCost + this.mealPlanCost + this.parkingCost);
	}
  


	public  void setParkingLocation(String parkingLocation)
	{
		this.parkingLocation = parkingLocation;
	}
	public String getParkingLocation()
	{
		return this.parkingLocation;
	}

	public void setParkingPermits(String parkingPermit)
	{
		this.parkingPermit = parkingPermit;
	}
	public String getParkingPermits()
	{
		return this.parkingPermit;
	}
  
	public void setParkingCost()
	{
		if(parkingPermit.equalsIgnoreCase("Economy Permits"))
		{
			this.parkingCost = economyPermit();
		}

		else if(parkingPermit.equalsIgnoreCase("General Permits"))
		{
			this.parkingCost = generalPermit();
		}

		else if(parkingPermit.equalsIgnoreCase("Reserved Deck Permits"))
		{
			this.parkingCost = reservedDeckPermit();
		}

		else
		{
			throw new IllegalArgumentException("Invalid Parking Permit");
		}

		semesterCost();
	}

	public double getParkingCost()
	{
		return this.parkingCost;
	}

  
	private double economyPermit()
	{
		if(parkingLocation.equalsIgnoreCase("Fairfax"))
		{
			return 70.00; 
		}
		else if(parkingLocation.equalsIgnoreCase("Fairfax"))
		{
			return 115.00;
		}
		else
		{
			throw new IllegalArgumentException("Invalid Parking Location");
		}
	}

	private double generalPermit()
	{
		return 165.00;
	}

	private double reservedDeckPermit()
	{
		if(parkingLocation.equalsIgnoreCase("Lot J"))
		{
			return 200;
		}
		else if(parkingLocation.equalsIgnoreCase("Lot I"))
		{
			return 215.00;
		}
		else if(parkingLocation.equalsIgnoreCase("Fairfax - Shenandoah"))
		{
			return 265.00;
		}
		else if(parkingLocation.equalsIgnoreCase("Fairfax - Rappahannock"))
		{
			return 240.00;	
		}
		else if(parkingLocation.equalsIgnoreCase("Fairfax - Mason Pond"))
		{
			return 210.00;
		}
		else
		{
			throw new IllegalArgumentException("Invalid Parking Location");
		}
	}

  

  
	public void setBonusFunds(int bonusFunds)
	{
		if( (bonusFunds == 100) || (bonusFunds == 200) || (bonusFunds == 350) || (bonusFunds == 500) )
		{
			this.bonusFunds = bonusFunds;
		}
	}

	public int getBonusFunds()
	{
		return this.bonusFunds;
	}

	public void setMealPlans(String mealPlans)
	{
		this.mealPlans = mealPlans;
	}

	public String getMealPlans()
	{
		return this.mealPlans;
	}
  
	public void setMealPlanCost()
	{
		if(mealPlans.contains("Independence"))
		{
			this.mealPlanCost = indepenceMealPlans();
		}

		else if(mealPlans.contains("Patriot"))
		{
			this.mealPlanCost = patriotMealPlans();
		}

		else if(mealPlans.contains("Liberty"))
		{
			this.mealPlanCost = libertyMealPlan();
		}

		else if(mealPlans.contains("Freedom"))
		{
			this.mealPlanCost = freedomMealPlan();
		}

		else
		{
			throw new IllegalArgumentException("Invalid meal plan");
		}

		semesterCost();
	}

	public double getMealPlanCost()
	{
		return this.mealPlanCost;
	}


	private double indepenceMealPlans()
	{
		if(mealPlans.equalsIgnoreCase("Independence"))
		{
			return (2675.00 + bonusFunds); 
		}
		else if(mealPlans.equalsIgnoreCase("Independence Extended"))
		{
			return (2805.00 + bonusFunds);
		}

		else if(mealPlans.equalsIgnoreCase("Independence Ultimate"))
		{
			return (3240 + bonusFunds);
		}

		else
		{
			throw new IllegalArgumentException("Invalid meal plan");
		}
	}

	private double libertyMealPlan()
	{
		return 2775;
	}

	private double patriotMealPlans()
	{
		if(mealPlans.equalsIgnoreCase("Patriot 25 Meals"))
		{
			return 255 + bonusFunds;
		}

		else if(mealPlans.equalsIgnoreCase("Patriot 55 Meals"))
		{
			return 495 + bonusFunds;
		}

		else if(mealPlans.equalsIgnoreCase("Patriot 85 Meals"))
		{
			return 725 + bonusFunds;
		}

		else
		{
			throw new IllegalArgumentException("Invalid meal plan");
		}
	}

	private double freedomMealPlan()
	{
		if(mealPlans.equalsIgnoreCase("Freedom 350"))
		{
			return 350;
		}
		else if(mealPlans.equalsIgnoreCase("Freedom 500"))
		{
			return 500;
		}
		else if(mealPlans.equalsIgnoreCase("Freedom 750"))
		{
			return 750;
		}
		else if(mealPlans.equalsIgnoreCase("Freedom 1000"))
		{
			return 1000;
		}
		else if(mealPlans.equalsIgnoreCase("Freedom 1500"))
		{
			return 1500;
		}
		else if(mealPlans.equalsIgnoreCase("Freedom 2000"))
		{
			return 2000;
		}
		else
		{
			throw new IllegalArgumentException("Invalid meal plan");
		}
	}


  
	public void setTuition() 
	{
		if(typeOfStudent.equalsIgnoreCase("Undergraduate"))
		{
			if (location.equalsIgnoreCase("In-State") || location.equalsIgnoreCase("Mason Korea In-State")) 
			{
				tuition = calculateInStateTuition();
			} 
			else if (location.equalsIgnoreCase("Out-of-State")) 
			{
				tuition = calculateOutOfStateTuition();
			} 
			else 
			{
				tuition = calculateOtherTuition();
			}
		}

		else
		{
			tuition = calculateGraduateTuition();
		}

		semesterCost();

	}

	public double getTuition()
	{
		return this.tuition;
	}

	public void setCredits(int credits)
	{
		this.credits = credits; 
	}

	public double getCredits()
	{
		return this.credits;
	}
  
	private double calculateInStateTuition() 
	{
		double tuition = 0;

		if (credits < 12) 
		{
			tuition = 420.50 * credits + 155.00 * credits;
		} 
		else if (credits >= 12 && credits <= 15) 
		{
			tuition = 5046.00 + 1860;
		} 
		else 
		{
			tuition = (5046.00) + (credits * 420.50) + 155.00 * credits;
		}
		
		return tuition;
	}

	private double calculateOutOfStateTuition() 
	{
		double tuition = 0;

		if (credits < 12) 
		{
			tuition = 1427.50 * credits + 155.00 * credits;
		} 
		else if (credits >= 12 && credits <= 15) 
		{
			tuition = 17130.00 + 1860;
		} 
		else 
		{
			tuition = (17130.00) + (credits * 1427.50) + 155.00 * credits;
		}

		return tuition;
	}

	private double calculateOtherTuition() 
	{
		double tuition = 0;

		if (credits < 12) 
		{
			tuition = 678.00 * credits + 155.00 * credits;
		} 
		else if (credits >= 12 && credits <= 15) 
		{
			tuition = 8140.00 + 1860;
		} 
		else 
		{
			tuition = (8140.00) + (credits * 678.00) + 155.00 * credits;
		}

		return tuition;
	}

	private double calculateGraduateTuition()
	{
		if(location.equalsIgnoreCase("In-State"))
		{
			return ( (credits * 572.00) + 155.00);
		}

		else if(location.equalsIgnoreCase("Out-of-State"))
		{
			return ( (credits * 1486.50) + 155.00);
		}

		else
		{
			throw new IllegalArgumentException("Invalid Location");
		}
	}


	public void setHousingOptions(String housingOptions)
	{
		this.housingOptions = housingOptions;
	}

	public String getHousingOptions()
	{
		return this.housingOptions;
	}

	public void setRoomDescription(String roomDescription)
	{
		this.roomDescription = roomDescription;
	}

	public String getRoomDescription()
	{
		return roomDescription;
	}
  
	public void setHousingCost() 
	{
		if (housingOptions.equalsIgnoreCase("Traditional Residence Halls")) 
		{
			this.housingCost = calculateTraditionalResidenceHallsCost();
		} 
		else if (housingOptions.equalsIgnoreCase("Suites")) 
		{
			this.housingCost =  calculateSuitesCost();
		} 
		else if (housingOptions.equalsIgnoreCase("Apartments and Townhouses")) 
		{
			this.housingCost =  calculateApartmentsAndTownhousesCost();
		} 
		else if (housingOptions.equalsIgnoreCase("Angel Cabrera Global Center")) 
		{
			this.housingCost =  calculateAngelCabreraGlobalCenterCost();
		} 
		else 
		{
			throw new IllegalArgumentException("Invalid Housing Option");
		}

		semesterCost();
	}

	public double getHousingCost()
	{
		return this.housingCost;
	}

	private double calculateTraditionalResidenceHallsCost() 
	{
		if (roomDescription.equalsIgnoreCase("Single")) 
		{
			return 5510.00;
		} 
		else if (roomDescription.equalsIgnoreCase("Double")) 
		{
			return 4135;
		} 
		else if (roomDescription.equalsIgnoreCase("Triple")) 
		{
			return 3615;
		} 
		else 
		{
			throw new IllegalArgumentException("Invalid Room Description");
		}
	}

	private double calculateSuitesCost() 
	{
		if (roomDescription.equalsIgnoreCase("Single")) 
		{
			return 5910.00;
		} 
		else if (roomDescription.equalsIgnoreCase("Double/Triple")) 
		{
			return 4535;
		} 
		else if (roomDescription.equalsIgnoreCase("Economy Double/Triple")) 
		{
			return 3770;
		} 
		else 
		{
			throw new IllegalArgumentException("Invalid Room Description");
		}
	}

	private double calculateApartmentsAndTownhousesCost() 
	{
		if (roomDescription.equalsIgnoreCase("Apartment Single")) 
		{
			return 7005.00;
		} 
		else if (roomDescription.equalsIgnoreCase("Apartment Double")) 
		{
			return 5635;
		} 
		else if (roomDescription.equalsIgnoreCase("Townhouse Single"))
		{
			return 6400;
		} 
		else if (roomDescription.equalsIgnoreCase("Townhouse Double")) 
		{
			return 5150;
		} 
		else {
			throw new IllegalArgumentException("Invalid Room Description");
		}
	}

	private double calculateAngelCabreraGlobalCenterCost() 
	{
		if (roomDescription.equalsIgnoreCase("Single")) 
		{
			return 6275;
		} 
		else if (roomDescription.equalsIgnoreCase("Double")) 
		{
			return 4815;
		} 
		else if (roomDescription.equalsIgnoreCase("Expanded Triple")) 
		{
			return 3770;
		} 
		else 
		{
			throw new IllegalArgumentException("Invalid Room Description");
		}
	}


  
}