import React from "react";

const ResumeTemplate = ({ resumeData }) => {
    const { personalDetails, objective, skills, education, experience, projects, achievements } = resumeData;

    return (
        <div className="resume-container">
            <div className="header">
                <h1>{personalDetails.fullName}</h1>
                <p>{personalDetails.phone} | {personalDetails.email}</p>
                <p>{personalDetails.address}</p>
            </div>

            <section className="section">
                <h2>Objective</h2>
                <p>{objective}</p>
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
                <h2>Education</h2>
                {education.map((edu, index) => (
                    <div key={index} className="education-item">
                        <p><strong>{edu.degree}</strong>, {edu.institution} ({edu.yearOfGraduation})</p>
                    </div>
                ))}
            </section>

            <section className="section">
                <h2>Experience</h2>
                {experience.map((exp, index) => (
                    <div key={index} className="experience-item">
                        <p><strong>{exp.jobTitle}</strong> at {exp.companyName} ({new Date(exp.startDate).toLocaleDateString()} - {new Date(exp.endDate).toLocaleDateString()})</p>
                        <p>{exp.description}</p>
                    </div>
                ))}
            </section>

            <section className="section">
                <h2>Projects</h2>
                {projects.map((proj, index) => (
                    <div key={index} className="project-item">
                        <p><strong>{proj.projName}</strong>: {proj.projDescription}</p>
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
