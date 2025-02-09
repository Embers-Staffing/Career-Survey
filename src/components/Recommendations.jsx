import React, { useRef, useState } from 'react';
import { useSurvey } from '../context/SurveyContext';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';
import EducationResources from './EducationResources';
import JobBoards from './JobBoards';
import ProfessionalAssociations from './ProfessionalAssociations';
import TechnologyTraining from './TechnologyTraining';
import MentorshipPrograms from './MentorshipPrograms';
import CareerTools from './CareerTools';
import IndustryTrends from './IndustryTrends';
import CertificationRoadmaps from './CertificationRoadmaps';
import RegionalInsights from './RegionalInsights';
import SuccessStories from './SuccessStories';
import WorkLifeBalance from './WorkLifeBalance';
import FinancialPlanning from './FinancialPlanning';
import SpecializedTraining from './SpecializedTraining';
import NetworkingEvents from './NetworkingEvents';

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
    try {
      // Show progress message
      const progressDiv = document.createElement('div');
      progressDiv.className = 'fixed top-4 right-4 bg-blue-100 text-blue-800 px-4 py-2 rounded shadow-lg';
      progressDiv.innerHTML = 'Generating PDF...';
      document.body.appendChild(progressDiv);

      const content = contentRef.current;
      if (!content) return;

      // Add PDF mode class for better styling
      content.classList.add('pdf-mode');

      // Scroll to top and wait for content to be fully rendered
      window.scrollTo(0, 0);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get the actual dimensions of the content
      const contentWidth = content.offsetWidth;
      const contentHeight = content.offsetHeight;

      // Improved canvas settings
      const canvas = await html2canvas(content, {
        scale: 2,
        useCORS: true,
        logging: true,
        allowTaint: true,
        foreignObjectRendering: true,
        width: contentWidth,
        height: contentHeight,
        windowWidth: contentWidth,
        windowHeight: contentHeight,
        onclone: (clonedDoc) => {
          const clonedContent = clonedDoc.querySelector('.pdf-mode');
          if (clonedContent) {
            // Make sure content is visible and properly positioned
            clonedContent.style.width = `${contentWidth}px`;
            clonedContent.style.height = `${contentHeight}px`;
            clonedContent.style.position = 'relative';
            clonedContent.style.top = '0';
            clonedContent.style.left = '0';
            clonedContent.style.transform = 'none';
            clonedContent.style.display = 'block';
            clonedContent.style.background = 'white';
            
            // Force all content to be visible
            const elements = clonedContent.querySelectorAll('*');
            elements.forEach(el => {
              el.style.display = 'block';
              el.style.opacity = '1';
              el.style.visibility = 'visible';
              el.style.transform = 'none';
              el.style.background = 'white';
              if (el.tagName.toLowerCase() === 'li') {
                el.style.display = 'list-item';
              }
            });
          }
        }
      });

      // Create PDF with proper dimensions
      const pdf = new jsPDF({
        unit: 'px',
        format: 'a4',
        orientation: 'portrait'
      });

      // Calculate dimensions
      const imgProps = pdf.getImageProperties(canvas.toDataURL('image/jpeg', 1.0));
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Add content to PDF
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 1.0),
        'JPEG',
        0,
        0,
        pdfWidth,
        pdfHeight
      );

      // Add additional pages if needed
      let heightLeft = pdfHeight;
      let position = -pdf.internal.pageSize.getHeight();

      while (heightLeft >= pdf.internal.pageSize.getHeight()) {
        pdf.addPage();
        pdf.addImage(
          canvas.toDataURL('image/jpeg', 1.0),
          'JPEG',
          0,
          position,
          pdfWidth,
          pdfHeight
        );
        heightLeft -= pdf.internal.pageSize.getHeight();
        position -= pdf.internal.pageSize.getHeight();
      }

      // Remove PDF mode class
      content.classList.remove('pdf-mode');

      // Save the PDF
      pdf.save('construction-career-recommendations.pdf');

      // Remove progress indicator
      document.body.removeChild(progressDiv);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Helper function to analyze personality type
  const analyzePersonalityType = () => {
    const { myersBriggs } = state.personalityTraits || {};
    if (!myersBriggs) return null;

    // Combine MBTI preferences
    const type = {
      attention: myersBriggs.attention[0] || '',
      information: myersBriggs.information[0] || '',
      decisions: myersBriggs.decisions[0] || '',
      lifestyle: myersBriggs.lifestyle[0] || ''
    };

    // Get full type string
    const typeString = `${type.attention}${type.information}${type.decisions}${type.lifestyle}`;

    const recommendations = {
      'ESTJ': {
        roles: ['Project Manager', 'Site Supervisor', 'Construction Manager'],
        strengths: ['Organization', 'Leadership', 'Practical decision-making'],
        workStyle: 'You excel in structured environments and are natural at managing teams and projects.'
      },
      'ISTJ': {
        roles: ['Quality Control Manager', 'Safety Inspector', 'Technical Specialist'],
        strengths: ['Attention to detail', 'Reliability', 'Systematic approach'],
        workStyle: 'You thrive in roles requiring precision and methodical work processes.'
      },
      'ENFJ': {
        roles: ['Training Coordinator', 'HR Manager', 'Team Leader'],
        strengths: ['People management', 'Communication', 'Team building'],
        workStyle: 'You excel at developing others and creating positive work environments.'
      },
      'ISTP': {
        roles: ['Skilled Tradesperson', 'Equipment Operator', 'Technical Lead'],
        strengths: ['Problem-solving', 'Technical aptitude', 'Adaptability'],
        workStyle: 'You excel in hands-on roles requiring technical expertise and quick thinking.'
      }
      // Add more personality types as needed
    };

    return recommendations[typeString] || {
      roles: ['Various construction roles'],
      strengths: ['Adaptability', 'Learning capacity', 'Professional growth'],
      workStyle: 'Your unique combination of traits can be valuable across different construction roles.'
    };
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
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Action Buttons */}
        <div className="flex justify-between mb-8 print:hidden">
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

        {/* Main Content */}
        <div className="space-y-8 mb-12" ref={contentRef}>
          {/* Title */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Your Career Recommendations</h2>
            <p className="mt-4 text-lg text-gray-600">
              Based on your survey responses, here are personalized recommendations for your construction career
            </p>
          </div>

          {/* Personality Analysis */}
          <div id="personality-analysis" className="mt-12 bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900">Personality Analysis</h3>
            <div className="mt-4">
              {analyzePersonalityType() && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Recommended Roles:</h4>
                    <ul className="mt-2 list-disc list-inside">
                      {analyzePersonalityType().roles.map((role, index) => (
                        <li key={index} className="text-gray-600">{role}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Key Strengths:</h4>
                    <ul className="mt-2 list-disc list-inside">
                      {analyzePersonalityType().strengths.map((strength, index) => (
                        <li key={index} className="text-gray-600">{strength}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium">Work Style:</h4>
                    <p className="mt-2 text-gray-600">{analyzePersonalityType().workStyle}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Add Success Stories after Regional Insights */}
          <IndustryTrends />
          <RegionalInsights />
          <SuccessStories />
          <FinancialPlanning />
          <CertificationRoadmaps />

          {/* Career Paths */}
          <div id="career-paths" className="mt-8 bg-white rounded-lg shadow p-6">
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
          <div id="salary-potential" className="mt-8 bg-white rounded-lg shadow p-6">
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

          {/* Technology Training */}
          <TechnologyTraining />
          
          {/* Specialized Training */}
          <SpecializedTraining />
          
          {/* Industry Events */}
          <NetworkingEvents />
          
          {/* Mentorship Programs */}
          <MentorshipPrograms />
          
          {/* Work-Life Balance */}
          <WorkLifeBalance />
          
          {/* Financial Planning */}
          <FinancialPlanning />
          
          {/* Professional Associations */}
          <ProfessionalAssociations />
          
          {/* Job Boards */}
          <JobBoards />
          
          {/* Education Resources */}
          <EducationResources />
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-600 pb-8">
          <div className="border-t pt-8">
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
  );
}

export default Recommendations; 