import React from "react";

const ResumeTemplate = ({ resumeData }) => {
    const { personalDetails, objective, skills, education, experience, projects, achievements } = resumeData;

    return (
        <div className="resume-container">
            <div className="header">
                <h1>{personalDetails.fullName}</h1>
                <p>{personalDetails.phone} | {personalDetails.email}</p>
                <p>{personalDetails.address}</p>
                <p>
                    <a href={personalDetails.linkedin} target="_blank">LinkedIn</a>&nbsp;| 
                    &nbsp;<a href={personalDetails.github} target="_blank">GitHub</a>
                </p>
                
            </div>

            <section className="section">
                <h2>Objective</h2>
                <p>{objective}</p>
            </section>

            

            <section className="section">
                <h2>Education</h2>
                {education.map((edu, index) => (
                    <div key={index} className="education-item">
                        <p><strong>{edu.institution}</strong> ({edu.yearOfGraduation})&nbsp;&nbsp;&nbsp;&nbsp;<strong>Score : {edu.percentage}</strong></p>
                        <p>{edu.degree}&nbsp;&nbsp;</p> 
                    </div>
                ))}
            </section>

            <section className="section">
                <h2>Skills</h2>
                <ul>
                    {skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            </section>

            <section className="section">
                <h2>Experience</h2>
                {experience.map((exp, index) => (
                    <div key={index} className="experience-item">
                        <p><strong>{exp.jobTitle} - {exp.companyName} </strong>( {new Date(exp.startDate).toLocaleDateString()} - {new Date(exp.endDate).toLocaleDateString()} )</p>
                        <p>{exp.description}</p>
                    </div>
                ))}
            </section>

            <section className="section">
                <h2>Projects</h2>
                {projects.map((proj, index) => (
                    <div key={index} className="project-item">
                        <p><strong>{proj.projName}</strong></p>
                        <p>{proj.projDescription}</p>
                    </div>
                ))}
            </section>

            <section className="section">
                <h2>Achievements</h2>
                <ul>
                    {achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default ResumeTemplate;
