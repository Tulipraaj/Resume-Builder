import React, {useState, useEffect} from 'react';
import axios from "axios"
import "../styles/dashboard.css"
import {jwtDecode} from "jwt-decode"

function Dashboard(){
  const [resumeData, setResumeData] = useState({
    personalDetails: { name: "", email: "", phone: "", address: "" },
    skills: [], 
    education: [{ degree: "", institution: "", yearOfGraduation: "" }],
    experience: [{ jobTitle: "", companyName: "", startDate: "", endDate: "", description: "" },],
    projects: [{ projName: "", projDescription: "" }],
    achievements: [""],
  })

  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token)
  const userId = decodedToken.id;


  const handleChange = (e) => {
    const { name, value } = e.target
    setResumeData((prevData) => ({
      ...prevData,
      personalDetails: {
        ...prevData.personalDetails,
        [name] : value,
      },
    }));
  };

  const handleAdd = (arrayName, newValue) => {
    setResumeData((prevData) => ({
      ...prevData,
      [arrayName]: [...prevData[arrayName], newValue],
    }));
  };
  
  const handleArrayChange = (e, arrayName, index, fieldName) => {
    if (!resumeData[arrayName] || !Array.isArray(resumeData[arrayName])) {
      console.error(`Invalid arrayName: ${arrayName}`);
      return;
    }
  
    const updatedArray = [...resumeData[arrayName]];
  
    // Check if it's an array of strings (e.g., achievements)
    if (typeof updatedArray[index] === "string" && !fieldName) {
      updatedArray[index] = e.target.value; // Directly update the string
    } else if (fieldName) {
      updatedArray[index][fieldName] = e.target.value; // Update an object property
    } else {
      console.error(`Invalid operation for array: ${arrayName}`);
      return;
    }
  
    setResumeData({ ...resumeData, [arrayName]: updatedArray });
  };
  
  
  
  const handleRemove = (arrayName, index) => {
    const updatedArray = resumeData[arrayName].filter((_, i) => i !== index); // Remove specific achievement
    setResumeData({ ...resumeData, [arrayName]: updatedArray });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('')
    setError('')

    try{

      const payload = {...resumeData, userId}

      const response = await axios.post(
        "http://localhost:5000/api/resumes/create-or-update",
        payload,
        {
          headers : {
            Authorization: `Bearer ${token}`
          },
        }
      )
      setMessage('Resume saved successfully')
    }catch(err){
      console.error(err);
      setError(err.response?.data?.message || "Failed to save resume details");

      
    }
  }

  const [userName, setUserName] = useState("User");
  useEffect(() => {
    
    // Fetch user details
    const fetchUserDetails = async () => {
      try {
          const resumeDetails = await axios.get(
                `http://localhost:5000/api/resumes/${userId}`,
                {
                  headers: { Authorization: `Bearer ${token}`}
                }
              )
              const resume = resumeDetails.data
      
              if(resume){
                setResumeData(resume)
              }
          
          const response = await axios.get(`http://localhost:5000/api/users/user/${userId}`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          setUserName(response.data.name);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    fetchUserDetails();
  }, [userId, token]);

  return(
    <div className='dashboard-container'>
      <h1>Dashboard</h1>
      <h2>Welcome, {userName}!</h2>
      <form onSubmit={handleSubmit} className="resume-form">
        <div className='form-group'>
          <label htmlFor="fullName">Full Name</label>
          <input 
            type='text'
            id='fullName'
            name='fullName'
            placeholder='Enter your Full Name'
            value={resumeData.personalDetails.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor="email">Email</label>
          <input 
            type='text'
            id='email'
            name='email'
            placeholder='Enter your Email Id'
            value={resumeData.personalDetails.email || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor="phone">Phone</label>
          <input 
            type='text'
            id='phone'
            name='phone'
            placeholder='Enter your Phone number'
            value={resumeData.personalDetails.phone || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor="address">Address</label>
          <input 
            type='text'
            id='address'
            name='address'
            placeholder='Enter your Address'
            value={resumeData.personalDetails.address || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='education'>Education</label>
          {resumeData.education.map((edu, index) => (
            <div key={index} className='array-field'>
              <div>
                <label htmlFor="degree">Degree</label>
                <input 
                  type='text'
                  value={edu.degree}
                  onChange={(e) => handleArrayChange(e, "education", index, "degree")}
                  placeholder='Degree'
                  required
                />

                <label htmlFor="Institution">Institution</label>
                <input 
                  type='text'
                  value={edu.institution}
                  onChange={(e) => handleArrayChange(e, "education", index, "institution")}
                  placeholder='Institution'
                  required
                />

                <label htmlFor="Year of Graduation">Year of Graduation</label>
                <input 
                  type='text'
                  value={edu.yearOfGraduation}
                  onChange={(e) => handleArrayChange(e, "education", index, "yearOfGraduation")}
                  placeholder='Year of Graduation'
                  required
                />

                <button className="remove-button" type='button' onClick={() => handleRemove("education", index)}>
                  Remove
                </button>
              </div>
                
            </div>

          ))}
          <button className="add-button" type='button' onClick={() => handleAdd("education", {degree: "", institution: "", yearOfGraduation:""})}>
            Add Education
          </button>
        </div>

        <div className="form-group">
            <label htmlFor="experience">Experience</label>
            {resumeData.experience.map((exp, index) => (
                <div key={index} className="array-field">

                    <label htmlFor="Jobtitle">Job Title</label> 
                    <input
                        type="text"
                        value={exp.jobTitle}
                        onChange={(e) => handleArrayChange(e, "experience", index, "jobTitle")}
                        placeholder="Job Title"
                        required
                    />

                    <label htmlFor="companyname">Company Name</label>
                    <input
                        type="text"
                        value={exp.companyName}
                        onChange={(e) => handleArrayChange(e, "experience", index, "companyName")}
                        placeholder="Company Name"
                        required
                    />

                    <label htmlFor="startdate">Start Date</label>
                    <input
                        type="date"
                        value={exp.startDate}
                        onChange={(e) => handleArrayChange(e, "experience", index, "startDate")}
                        required
                    />

                    <label htmlFor="enddate">End Date</label>
                    <input
                        type="date"
                        value={exp.endDate}
                        onChange={(e) => handleArrayChange(e, "experience", index, "endDate")}
                        required
                    />

                    <label htmlFor="description">Description</label>
                    <textarea
                        value={exp.description}
                        onChange={(e) => handleArrayChange(e, "experience", index, "description")}
                        placeholder="Description"
                        required
                    />
                    <button className="remove-button" type="button" onClick={() => handleRemove("experience", index)}>
                        Remove
                    </button>
                </div>
            ))}
            <button className="add-button" type="button" onClick={() => handleAdd("experience", { jobTitle: "", companyName: "", startDate: "", endDate: "", description: "" })}>
                Add Experience
            </button>
        </div>

        <div className="form-group">
          <label htmlFor="projects">Projects</label>
          {resumeData.projects.map((project, index) => (
              <div key={index} className="array-field">
                  <label htmlFor="projtitle">Project Title</label>
                  <input
                      type="text"
                      value={project.projName}
                      onChange={(e) => handleArrayChange(e, "projects", index, "projName")}
                      placeholder="Project Title"
                      required
                  />

                  <label htmlFor="projdescription">Project Description</label>
                  <textarea
                      value={project.projDescription}
                      onChange={(e) => handleArrayChange(e, "projects", index, "projDescription")}
                      placeholder="Project Description"
                      required
                  />
                  <button className="remove-button" type="button" onClick={() => handleRemove("projects", index)}>
                      Remove
                  </button>
              </div>
          ))}
          <button className="add-button" type="button" onClick={() => handleAdd("projects", { projName: "", projDescription: "" })}>
              Add Project
          </button>
      </div>

                {/* Achievements */}
      <div className="form-group">
          <label htmlFor="achievements">Achievements</label>
          {resumeData.achievements.map((achievement, index) => (
            <div key={index} className="array-field">
              <input
                type="text"
                value={achievement}
                onChange={(e) => handleArrayChange(e, "achievements", index)}
                placeholder="Achievement"
                required
              />
              <button className="remove-button" type="button" onClick={() => handleRemove("achievements", index)}>
                Remove
              </button>
            </div>
          ))}
          <button className="add-button" type="button" onClick={() => handleAdd("achievements", "")}>
            Add Achievement
          </button>
      </div>


        <div className="form-actions">
            <button className="save-button" type="submit">Save Resume</button>
        </div>
      </form>

            {/* Messages */}
      {message && <div className="message success">{message}</div>}
      {error && <div className="message error">{error}</div>}
    </div>

     

  )
};

export default Dashboard;
