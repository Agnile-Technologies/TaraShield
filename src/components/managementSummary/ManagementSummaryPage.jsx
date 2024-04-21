import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

const ManagementSummaryPage = () => {
  const [summaryData, setSummaryData] = useState({
    projectDetails: {},
    identifiedRisks: [],
    securityGoals: [],
    riskTreatmentDecisions: [],
  });

  const project = useSelector((state) => state.project.currentProject);
  const risks = useSelector((state) => state.riskAssessments.risks);
  const securityGoals = useSelector((state) => state.securityGoals.securityGoals);

  useEffect(() => {
    setSummaryData({
      projectDetails: project || {},
      identifiedRisks: risks,
      securityGoals: securityGoals,
      riskTreatmentDecisions: risks.map((risk) => ({
        name: risk.name,
        treatment: risk.treatmentDecision,
      })),
    });
  }, [project, risks, securityGoals]);

  const exportPDF = () => {
    try {
      const doc = new jsPDF();
      doc.text('Management Summary Report', 10, 10);
      doc.text(`Project Name: ${summaryData.projectDetails?.name || 'N/A'}`, 10, 20);
      // Adding dynamic content for risks
      let yPos = 30;
      doc.text('Identified Risks:', 10, yPos);
      summaryData.identifiedRisks.forEach((risk, index) => {
        yPos += 10;
        doc.text(`${index + 1}. ${risk.name} - Impact: ${risk.impact}, Probability: ${risk.probability}`, 10, yPos);
      });
      doc.save('management-summary.pdf');
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("An error occurred while exporting the PDF. Please try again.");
    }
  };

  const exportDocx = () => {
    try {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Management Summary Report',
                    bold: true,
                  }),
                ],
              }),
              new Paragraph(`Project Name: ${summaryData.projectDetails?.name || 'N/A'}`),
              new Paragraph('Identified Risks:'),
              ...summaryData.identifiedRisks.map(risk =>
                new Paragraph({
                  children: [
                    new TextRun(`Risk Name: ${risk.name || 'N/A'}, Impact: ${risk.impact || 'N/A'}, Probability: ${risk.probability || 'N/A'}`),
                  ],
                })
              ),
              new Paragraph('Security Goals:'),
              ...summaryData.securityGoals.map(goal =>
                new Paragraph({
                  children: [
                    new TextRun(`Goal Name: ${goal.name || 'N/A'}, Description: ${goal.description || 'N/A'}`),
                  ],
                })
              ),
              new Paragraph('Risk Treatment Decisions:'),
              ...summaryData.riskTreatmentDecisions.map(decision =>
                new Paragraph({
                  children: [
                    new TextRun(`Risk Name: ${decision.name || 'N/A'}, Treatment: ${decision.treatment || 'N/A'}`),
                  ],
                })
              ),
            ],
          },
        ],
      });

      Packer.toBlob(doc).then(blob => {
        saveAs(blob, 'management-summary.docx');
      }).catch(error => {
        console.error("Error exporting DOCX:", error);
        alert("An error occurred while exporting the DOCX. Please try again.");
      });
    } catch (error) {
      console.error("Error creating DOCX document:", error);
      alert("An error occurred while creating the DOCX document. Please try again.");
    }
  };

  return (
    <div>
      <h1>Management Summary</h1>
      <h2>Project Details</h2>
      <p>Name: {summaryData.projectDetails?.name || 'N/A'}</p>
      <h2>Identified Risks</h2>
      {summaryData.identifiedRisks.map((risk, index) => (
        <div key={index}>
          <p>Risk Name: {risk.name || 'N/A'}</p>
          <p>Impact: {risk.impact || 'N/A'}</p>
          <p>Probability: {risk.probability || 'N/A'}</p>
        </div>
      ))}
      <h2>Security Goals</h2>
      {summaryData.securityGoals.map((goal, index) => (
        <div key={index}>
          <p>Goal Name: {goal.name || 'N/A'}</p>
          <p>Description: {goal.description || 'N/A'}</p>
        </div>
      ))}
      <h2>Risk Treatment Decisions</h2>
      {summaryData.riskTreatmentDecisions.map((decision, index) => (
        <div key={index}>
          <p>Risk Name: {decision.name || 'N/A'}</p>
          <p>Treatment: {decision.treatment || 'N/A'}</p>
        </div>
      ))}
      <button onClick={exportPDF}>Export as PDF</button>
      <button onClick={exportDocx}>Export as DOCX</button>
    </div>
  );
};

export default ManagementSummaryPage;