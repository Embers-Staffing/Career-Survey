import React, { useRef, useState } from 'react';
import { useSurvey } from '../context/SurveyContext';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';
import EducationResources from './EducationResources';

function Recommendations() {
  const { state, dispatch } = useSurvey();
  const contentRef = useRef(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const navigate = useNavigate();

  const handleNewSurvey = () => {
    dispatch({ 
      type: 'RESET_SURVEY',
      payload: {
        personalInfo: {
          firstName: '',
          lastName: '',
          birthYear: '',
          birthMonth: '',
          yearsInConstruction: ''
        },
        personalityTraits: {
          myersBriggs: {
            attention: [],
            information: [],
            decisions: [],
            lifestyle: []
          },
          hollandCode: []
        },
        skills: {
          technical: [],
          certifications: [],
          experience: {
            role: '',
            types: [],
            projectSize: ''
          }
        },
        workPreferences: {
          roles: [],
          technologies: [],
          environment: '',
          travelWillingness: ''
        },
        goals: {
          careerGoals: [],
          advancementPreference: '',
          mentorshipType: '',
          targetSalary: ''
        }
      }
    });

    window.location.href = '/';
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    const element = contentRef.current;

    try {
      // Add PDF-specific styles before capturing
      element.classList.add('pdf-mode');
      
      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: '#ffffff',
        windowWidth: 1200, // Fixed width for consistency
        onclone: (document) => {
          // Adjust clone document styles for PDF
          const clone = document.querySelector('.pdf-mode');
          if (clone) {
            clone.style.padding = '20px';
            clone.style.maxWidth = '1000px';
            clone.style.margin = '0 auto';
          }
        }
      });
      
      // Remove PDF-specific styles after capturing
      element.classList.remove('pdf-mode');
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Add company name and date to header
      pdf.setFontSize(10);
      pdf.setTextColor(128, 128, 128);
      pdf.text('Embers Staffing Solutions', 10, 10);
      pdf.text(new Date().toLocaleDateString(), pdfWidth - 30, 10);
      
      // Add the main content
      pdf.addImage(imgData, 'JPEG', 0, 15, pdfWidth, pdfHeight * 0.9);
      
      // Add page numbers
      const pageCount = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(128, 128, 128);
        pdf.text(
          `Page ${i} of ${pageCount}`,
          pdfWidth / 2,
          pdfHeight - 10,
          { align: 'center' }
        );
      }
      
      pdf.save('career-recommendations.pdf');
    } catch (error) {
      console.error('PDF generation failed:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Helper function to analyze personality type
  const analyzePersonalityType = () => {
    const { myersBriggs } = state.personalityTraits || {};
    if (!myersBriggs) return null;

    const type = Object.values(myersBriggs).join('');
    const recommendations = {
      'ESTJ': {
        roles: ['Project Manager', 'Site Supervisor', 'Safety Coordinator'],
        strengths: ['Leadership', 'Organization', 'Detail-oriented'],
        certifications: ['PMP', 'Gold Seal Certification', 'OHSR']
      },
      'ISTP': {
        roles: ['Skilled Tradesperson', 'Equipment Operator', 'Technical Specialist'],
        strengths: ['Problem-solving', 'Technical aptitude', 'Practical skills'],
        certifications: ['Trade Certification', 'Equipment Operation', 'Technical Certifications']
      },
      // Add more personality type recommendations
    };

    return recommendations[type] || null;
  };

  // Calculate salary ranges based on experience and skills
  const calculateSalaryRanges = () => {
    const yearsExperience = parseInt(state.personalInfo?.yearsInConstruction) || 0;
    const certCount = (state.skills?.certifications?.length || 0);
    
    const baseSalary = {
      entry: '45,000 - 55,000',
      mid: '55,000 - 75,000',
      senior: '75,000 - 100,000',
      expert: '100,000+'
    };

    if (yearsExperience < 2) return baseSalary.entry;
    if (yearsExperience < 5) return baseSalary.mid;
    if (yearsExperience < 10) return baseSalary.senior;
    return baseSalary.expert;
  };

  // Generate career path recommendations
  const getCareerPaths = () => {
    const paths = [
      {
        title: 'Management Track',
        steps: [
          'Site Supervisor (2-3 years experience)',
          'Project Coordinator (3-5 years)',
          'Project Manager (5+ years)',
          'Construction Manager (10+ years)'
        ],
        requiredCerts: ['PMP', 'Gold Seal', 'OHSR'],
        salaryRange: '75,000 - 150,000'
      },
      {
        title: 'Technical Specialist',
        steps: [
          'Trade Certification',
          'Technical Lead',
          'Specialist Contractor',
          'Technical Operations Manager'
        ],
        requiredCerts: ['Trade License', 'Technical Certifications', 'Safety Certifications'],
        salaryRange: '65,000 - 120,000'
      },
      // Add more career paths
    ];

    return paths;
  };

  // Helper function to get missing recommended certifications
  const getRecommendedCertifications = () => {
    const currentCerts = state.skills?.certifications || [];
    const recommendations = [];

    // Check for basic safety certifications
    if (!currentCerts.includes('WHMIS (Workplace Hazardous Materials Information System)')) {
      recommendations.push({
        name: 'WHMIS Certification',
        description: 'Essential safety certification required in most Canadian workplaces'
      });
    }

    if (!currentCerts.includes('Construction Safety Training System (CSTS)')) {
      recommendations.push({
        name: 'CSTS Training',
        description: 'Standard construction safety training for Canadian worksites'
      });
    }

    // Check for role-specific certifications
    if (state.goals?.longTerm?.includes('management')) {
      if (!currentCerts.includes('Gold Seal Certification')) {
        recommendations.push({
          name: 'Gold Seal Certification',
          description: 'Recognized management excellence in Canadian construction'
        });
      }
    }

    // Add Working at Heights if not present
    if (!currentCerts.includes('Working at Heights')) {
      recommendations.push({
        name: 'Working at Heights',
        description: 'Required for most construction work in Canada'
      });
    }

    return recommendations;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Action Buttons */}
        <div className="flex justify-between mb-6 print:hidden">
          <div className="flex gap-4">
            <button
              onClick={handleNewSurvey}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
            >
              <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 4v16m8-8H4" 
                />
              </svg>
              Submit New Survey
            </button>

            <a
              href="https://survey-analytics-onvx.streamlit.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center"
            >
              <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
                />
              </svg>
              View Analytics Dashboard
            </a>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className={`px-4 py-2 rounded-lg flex items-center ${
                isGeneratingPDF 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-500 hover:bg-green-600'
              } text-white`}
            >
              {isGeneratingPDF ? (
                <>
                  <svg 
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Generating PDF...
                </>
              ) : (
                <>
                  <svg 
                    className="w-5 h-5 mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                    />
                  </svg>
                  Download PDF
                </>
              )}
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
            >
              <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" 
                />
              </svg>
              Print
            </button>
          </div>
        </div>

        {/* Content to be printed/downloaded */}
        <div ref={contentRef}>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Your Career Recommendations</h2>
            <p className="mt-4 text-lg text-gray-600">
              Based on your survey responses, here are personalized recommendations for your construction career
            </p>
          </div>

          {/* Personality Analysis */}
          <div className="mt-12 bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900">Personality Analysis</h3>
            <div className="mt-4">
              {analyzePersonalityType() && (
                <>
                  <h4 className="font-medium">Recommended Roles:</h4>
                  <ul className="mt-2 list-disc list-inside">
                    {analyzePersonalityType().roles.map((role, index) => (
                      <li key={index} className="text-gray-600">{role}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* Career Paths */}
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900">Career Progression Paths</h3>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              {getCareerPaths().map((path, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-medium text-lg">{path.title}</h4>
                  <ul className="mt-2 space-y-2">
                    {path.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="text-gray-600">
                        • {step}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <p className="text-sm font-medium">Required Certifications:</p>
                    <p className="text-gray-600">{path.requiredCerts.join(', ')}</p>
                    <p className="mt-2 text-sm font-medium">Salary Range:</p>
                    <p className="text-gray-600">${path.salaryRange}/year</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Training */}
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900">Recommended Training & Certifications</h3>
            <div className="mt-4">
              <p className="text-gray-600">Based on your current experience level and career goals:</p>
              <ul className="mt-4 space-y-2">
                {getRecommendedCertifications().map((cert, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <div>
                      <span className="font-medium">{cert.name}</span>
                      <p className="text-sm text-gray-500">{cert.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Salary Potential */}
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900">Salary Potential</h3>
            <div className="mt-4">
              <p className="text-gray-600">
                Based on your experience and qualifications, your salary range potential is:
              </p>
              <p className="mt-2 text-2xl font-bold text-green-600">
                ${calculateSalaryRanges()}/year
              </p>
              <p className="mt-2 text-sm text-gray-500">
                * Salary ranges are approximate and may vary by location and employer
              </p>
            </div>
          </div>

          {/* Add Education Resources section */}
          <EducationResources />

          {/* Footer */}
          <footer className="mt-12 text-center text-gray-600">
            <div className="border-t pt-6">
              <p className="mb-2">© Embers Staffing 2025</p>
              <p className="text-sm">
                Made with ❤️ by{' '}
                <a 
                  href="https://github.com/ArsCodeAmatoria" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  ArsCodeAmatoria
                </a>
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Recommendations; 