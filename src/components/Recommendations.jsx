import React from 'react';
import { useSurvey } from '../context/SurveyContext';

function Recommendations() {
  const { state } = useSurvey();

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

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              {!state.skills?.certifications?.includes('OHSR') && (
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <div>
                    <span className="font-medium">OHSR Certification</span>
                    <p className="text-sm text-gray-500">Essential for safety roles and management positions</p>
                  </div>
                </li>
              )}
              {/* Add more dynamic recommendations */}
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

        {/* Add Footer */}
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
  );
}

export default Recommendations; 