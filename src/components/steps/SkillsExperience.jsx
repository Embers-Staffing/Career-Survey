import React from 'react';
import { useSurvey } from '../../context/SurveyContext';
import { SURVEY_OPTIONS } from '../../constants/surveyOptions';

function SkillsExperience() {
  const { state, dispatch } = useSurvey();

  const handleTechnicalSkillChange = (skill) => {
    const currentSkills = state.skills.technical;
    const newSkills = currentSkills.includes(skill)
      ? currentSkills.filter(s => s !== skill)
      : [...currentSkills, skill];

    dispatch({
      type: 'UPDATE_FIELD',
      section: 'skills',
      field: 'technical',
      value: newSkills
    });
  };

  const handleCertificationChange = (cert) => {
    const currentCerts = state.skills?.certifications || [];
    const updatedCerts = currentCerts.includes(cert)
      ? currentCerts.filter(c => c !== cert)
      : [...currentCerts, cert];

    dispatch({
      type: 'UPDATE_FIELD',
      section: 'skills',
      field: 'certifications',
      value: updatedCerts
    });
  };

  const handleExperienceChange = (field, value) => {
    dispatch({
      type: 'UPDATE_NESTED_FIELD',
      section: 'skills',
      subsection: 'experience',
      field,
      value
    });
  };

  const technicalSkills = [
    {
      id: 'tools',
      label: 'Hand and power tools',
      description: 'Experience with various construction tools'
    },
    {
      id: 'blueprint',
      label: 'Blueprint reading',
      description: 'Ability to interpret construction drawings'
    },
    {
      id: 'math',
      label: 'Construction math and measurements',
      description: 'Understanding of construction calculations'
    },
    {
      id: 'safety',
      label: 'Safety procedures and protocols',
      description: 'Knowledge of safety standards and practices'
    },
    {
      id: 'equipment',
      label: 'Heavy equipment operation',
      description: 'Experience operating construction machinery'
    },
    {
      id: 'software',
      label: 'Computer and software skills',
      description: 'Proficiency in construction-related software'
    }
  ];

  const certificationOptions = [
    'None',
    'OSHA Safety Certification',
    'Equipment Operation License',
    'Trade-specific Certification',
    'Project Management Certification',
    'Other'
  ];

  const experienceTypes = [
    'Residential Construction',
    'Commercial Construction',
    'Industrial Construction',
    'Infrastructure/Heavy Civil',
    'Specialty Trade',
    'Remodeling/Renovation'
  ];

  const roleTypes = [
    'General Labor',
    'Skilled Trade Worker',
    'Equipment Operator',
    'Foreman/Supervisor',
    'Project Manager',
    'Other'
  ];

  return (
    <div className="space-y-8">
      {/* Technical Skills Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Technical Skills</h3>
        <p className="text-gray-600 mb-4">What technical skills do you currently have? (Select all that apply)</p>
        
        <div className="grid gap-4 md:grid-cols-2">
          {technicalSkills.map(skill => {
            const id = `skill-${skill.id}`;
            return (
              <div
                key={skill.id}
                className={`p-4 border rounded-lg cursor-pointer ${
                  state.skills.technical.includes(skill.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'hover:border-gray-400'
                }`}
                onClick={() => handleTechnicalSkillChange(skill.id)}
              >
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id={id}
                    checked={state.skills.technical.includes(skill.id)}
                    onChange={() => handleTechnicalSkillChange(skill.id)}
                    className="mt-1 rounded"
                  />
                  <label htmlFor={id} className="cursor-pointer">
                    <div className="font-medium">{skill.label}</div>
                    <div className="text-sm text-gray-500">{skill.description}</div>
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Work Experience Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Work Experience</h3>
        
        <div className="space-y-6">
          {/* Previous Roles */}
          <div>
            <label className="block text-gray-700 mb-2">
              What role best describes your most recent position?
            </label>
            <select
              value={state.skills.experience?.role || ''}
              onChange={(e) => handleExperienceChange('role', e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Role...</option>
              {roleTypes.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          {/* Type of Construction Experience */}
          <div>
            <label className="block text-gray-700 mb-2">
              What type of construction experience do you have?
              <span className="text-sm text-gray-500 ml-2">(Select all that apply)</span>
            </label>
            <div className="grid gap-3 md:grid-cols-2">
              {experienceTypes.map(type => {
                const id = `exp-${type.toLowerCase().replace(/\s+/g, '-')}`;
                return (
                  <div key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      id={id}
                      checked={state.skills.experience?.types?.includes(type) || false}
                      onChange={() => {
                        const currentTypes = state.skills.experience?.types || [];
                        const newTypes = currentTypes.includes(type)
                          ? currentTypes.filter(t => t !== type)
                          : [...currentTypes, type];
                        handleExperienceChange('types', newTypes);
                      }}
                      className="rounded"
                    />
                    <label htmlFor={id} className="ml-2 cursor-pointer">
                      {type}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Project Size Experience */}
          <div>
            <label className="block text-gray-700 mb-2">
              What size projects have you worked on?
            </label>
            <select
              value={state.skills.experience?.projectSize || ''}
              onChange={(e) => handleExperienceChange('projectSize', e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Project Size...</option>
              <option value="small">Small (Under $500K)</option>
              <option value="medium">Medium ($500K - $5M)</option>
              <option value="large">Large ($5M - $20M)</option>
              <option value="very-large">Very Large (Over $20M)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Certifications</h3>
        <p className="text-gray-600 mb-4">Do you have any construction-related certifications?</p>
        <div className="space-y-2">
          {SURVEY_OPTIONS.certifications.map((cert) => (
            <label key={cert} className="flex items-center">
              <input
                type="checkbox"
                checked={state.skills?.certifications?.includes(cert) || false}
                onChange={() => handleCertificationChange(cert)}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2">{cert}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkillsExperience; 