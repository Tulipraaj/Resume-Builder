import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import ResumeTemplate from "../components/ResumeTemplate"; // Import the ResumeTemplate component
import html2pdf from "html2pdf.js"; 
import "../styles/previewresume.css"

function PreviewResumePage() {
    const [resumeData, setResumeData] = useState(null);

    useEffect(() => {
        const storedResumeData = Cookies.get("resumeData");

        if (storedResumeData) {
            setResumeData(JSON.parse(storedResumeData));
        }
    }, []);

    const handleDownloadResume = () => {
        const element = document.getElementById("resume"); // Get the resume HTML element
        const options = {
            margin: 0.5,
            filename: "resume.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };

        // Generate the PDF from the resume HTML
        html2pdf().from(element).set(options).save();
    };

    if (!resumeData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="footer">
                <button className="download-button" onClick={handleDownloadResume}>
                    Download Resume
                </button>
            </div>
            
            {/* Render the resume template with the resumeData */}
            <div id="resume">
                <ResumeTemplate resumeData={resumeData} />
            </div>
        </div>
    );
}

export default PreviewResumePage;
