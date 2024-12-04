import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import ResumeTemplate from "../components/ResumeTemplate"; // Import the ResumeTemplate component
import html2pdf from "html2pdf.js"; 
import jsPDF from "jspdf";
import "../styles/previewresume.css"
import html2canvas from "html2canvas";

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
        html2canvas(element).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save('resume.pdf');
        });

        // Generate the PDF from the resume HTML
        //html2pdf().from(element).set(options).save();
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
