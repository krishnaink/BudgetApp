import java.util.ArrayList;

public class Profile {

	private String name;
	private String userName;
	private String password;
	private String email;
	private ArrayList<PersonalDashboard> personalDashboard;

	public Profile(String name, String userName, String password, String email) 
	{
		this.name = name;
		this.userName = userName;
		this.password = password;
		this.email = email;
		this.personalDashboard = new ArrayList<>();
	}

	public String getName() 
	{
		return name;
	}

	public String getUserName() 
	{
		return userName;
	}

	public String getPassword() 
	{
		return password;
	}

	public String getEmail() 
	{
		return email;
	}

	public ArrayList<PersonalDashboard> getPersonalDashboard() 
	{
		return personalDashboard;
	}

	public void setName(String name) 
	{
		this.name = name;
	}

	public void setUserName(String userName) 
	{
		this.userName = userName;
	}

	public void setPassword(String password) 
	{
		this.password = password;
	}

	public void setEmail(String email) 
	{
		this.email = email;
	}

	public void addPersonalDashboard(PersonalDashboard personalDashboard) 
	{
		this.personalDashboard.add(personalDashboard);
	}

	public int numOfPersonalDashboards() 
	{
		return personalDashboard.size();
	}

}
