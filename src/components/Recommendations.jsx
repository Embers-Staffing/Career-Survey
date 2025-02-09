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
import PDFLayout from './PDFLayout';
import ReactDOM from 'react-dom';
import html2pdf from 'html2pdf.js';
import PrintLayout from './PrintLayout';

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
    // Create print layout
    const printContent = document.createElement('div');
    printContent.style.display = 'none';
    
    // Render print layout
    ReactDOM.render(
      <PrintLayout 
        data={state} 
        recommendations={{
          calculateSalaryRanges,
          getCareerPaths,
          getRecommendedCertifications
        }}
      />, 
      printContent
    );
    
    // Add to document
    document.body.appendChild(printContent);
    
    // Show print layout and trigger print
    printContent.style.display = 'block';
    window.print();
    
    // Cleanup after printing
    document.body.removeChild(printContent);
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      // Create PDF layout
      const pdfContent = document.createElement('div');
      pdfContent.style.width = '210mm';
      pdfContent.style.height = 'auto';
      pdfContent.style.margin = '0';
      pdfContent.style.padding = '0';
      document.body.appendChild(pdfContent);
      
      // Render PDF layout
      ReactDOM.render(
        <PDFLayout 
          data={state} 
          recommendations={{
            calculateSalaryRanges,
            getCareerPaths,
            getRecommendedCertifications
          }}
        />, 
        pdfContent
      );

      // Wait for images to load
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate PDF with better settings
      const opt = {
        margin: [10, 10, 10, 10],
        filename: 'career-recommendations.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: true,
          letterRendering: true,
          imageTimeout: 0,
          onclone: function(clonedDoc) {
            // Ensure images are loaded in cloned document
            clonedDoc.querySelectorAll('img').forEach(img => {
              img.src = img.src;
            });
          }
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true
        },
        pagebreak: { 
          mode: ['avoid-all', 'css', 'legacy'],
          before: '.page-break-before',
          after: '.page-break-after',
          avoid: ['img', '.recommendation-card', '.timeline-section', 'h2', 'h3']
        }
      };

      await html2pdf().set(opt).from(pdfContent).save();

      // Cleanup
      document.body.removeChild(pdfContent);
    } catch (error) {
      console.error('PDF generation error:', error);
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
    const careerGoals = state.goals?.longTerm || [];
    const experience = state.skills?.yearsExperience || 0;
    const currentRole = state.personalInfo?.currentRole || '';

    // Essential Safety Certifications
    const essentialCerts = [
      {
        name: 'WHMIS (Workplace Hazardous Materials Information System)',
        description: 'Essential safety certification required in most Canadian workplaces',
        priority: 'High',
        timeline: '1-2 days',
        cost: '$50-100',
        provider: 'Canadian Centre for Occupational Health and Safety'
      },
      {
        name: 'Construction Safety Training System (CSTS)',
        description: 'Standard construction safety training for Canadian worksites',
        priority: 'High',
        timeline: '6-8 hours',
        cost: '$100-150',
        provider: 'Construction Safety Association'
      },
      {
        name: 'Working at Heights',
        description: 'Required for most construction work in Canada',
        priority: 'High',
        timeline: '1 day',
        cost: '$150-200',
        provider: 'Infrastructure Health & Safety Association'
      },
      {
        name: 'First Aid & CPR',
        description: 'Essential emergency response certification',
        priority: 'Medium',
        timeline: '2 days',
        cost: '$120-180',
        provider: 'Red Cross / St. John Ambulance'
      }
    ];

    // Management Track Certifications
    const managementCerts = [
      {
        name: 'Gold Seal Certification',
        description: 'Recognized management excellence in Canadian construction',
        priority: 'High',
        timeline: '3-5 years',
        cost: '$1,000-1,500',
        provider: 'Canadian Construction Association',
        requirements: '5 years experience required'
      },
      {
        name: 'Project Management Professional (PMP)',
        description: 'Globally recognized project management certification',
        priority: 'Medium',
        timeline: '6 months preparation',
        cost: '$500-700',
        provider: 'Project Management Institute',
        requirements: '4,500 hours leading projects'
      }
    ];

    // Technical Specialization Certifications
    const technicalCerts = [
      {
        name: 'Building Information Modeling (BIM)',
        description: 'Essential for modern construction technology adoption',
        priority: 'Medium',
        timeline: '2-3 months',
        cost: '$800-1,200',
        provider: 'Various accredited institutions'
      },
      {
        name: 'Leadership in Energy and Environmental Design (LEED)',
        description: 'Key for sustainable construction practices',
        priority: 'Medium',
        timeline: '2-4 months',
        cost: '$600-800',
        provider: 'Canada Green Building Council'
      }
    ];

    // Add essential certifications if missing
    essentialCerts.forEach(cert => {
      if (!currentCerts.includes(cert.name)) {
        recommendations.push(cert);
      }
    });

    // Add management certifications if career goals align
    if (careerGoals.includes('management') || currentRole.toLowerCase().includes('supervisor')) {
      managementCerts.forEach(cert => {
        if (!currentCerts.includes(cert.name) && experience >= 3) {
          recommendations.push(cert);
        }
      });
    }

    // Add technical certifications based on experience and goals
    if (experience >= 2 || careerGoals.includes('technical_specialist')) {
      technicalCerts.forEach(cert => {
        if (!currentCerts.includes(cert.name)) {
          recommendations.push(cert);
        }
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
              <p className="text-gray-600">Based on your current experience level and career goals, here are your personalized certification recommendations:</p>
              
              <div className="mt-6 space-y-6">
                {getRecommendedCertifications().map((cert, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-medium text-gray-900">{cert.name}</h4>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        cert.priority === 'High' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {cert.priority} Priority
                      </span>
                    </div>
                    
                    <p className="mt-2 text-gray-600">{cert.description}</p>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Timeline</p>
                        <p className="mt-1 text-gray-900">{cert.timeline}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Estimated Cost</p>
                        <p className="mt-1 text-gray-900">{cert.cost}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-500">Provider</p>
                      <p className="mt-1 text-gray-900">{cert.provider}</p>
                    </div>
                    
                    {cert.requirements && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-500">Requirements</p>
                        <p className="mt-1 text-gray-900">{cert.requirements}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Pro Tip:</strong> Many of these certifications may be eligible for funding or tax credits through various Canadian construction industry programs.
                </p>
              </div>
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