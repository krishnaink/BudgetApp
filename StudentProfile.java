import java.util.ArrayList;

public class StudentProfile extends Profile {

	private String typeOfStudent;
	private String location;
	private ArrayList<AcademicDashboard> academicDashboard;

	public StudentProfile(String name, String userName, String password, String email, String typeOfStudent, String location) {
		super(name, userName, password, email);
		setTypeOfStudent(typeOfStudent);
		setLocation(location);
		this.academicDashboard = new ArrayList<>();
	}

	public String getTypeOfStudent() 
	{
		return typeOfStudent;
	}

	public String getLocation() 
	{
		return location;
	}

	public void setTypeOfStudent(String typeOfStudent) {
		if (typeOfStudent.equalsIgnoreCase("Undergraduate") || typeOfStudent.equalsIgnoreCase("Graduate")) 
		{
			this.typeOfStudent = typeOfStudent;
		} 
		else 
		{
			throw new IllegalArgumentException("Invalid type of student");
		}
	}

	public void setLocation(String location) {
		if (location.equalsIgnoreCase("In-State") || location.equalsIgnoreCase("Out-of-State") || 
		location.equalsIgnoreCase("In-State Mason Korea") || location.equalsIgnoreCase("Out-of-State Mason Korea"))
		{
			this.location = location;
		} 
		else 
		{
			throw new IllegalArgumentException("Invalid location");
		}
	}

	public void addAcademicDashboard(AcademicDashboard academicDashboard) 
	{
		this.academicDashboard.add(academicDashboard);
	}
}
