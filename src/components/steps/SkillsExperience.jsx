import React from 'react';
import { useSurvey } from '../../context/SurveyContext';

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

  const handleCertificationChange = (value) => {
    dispatch({
      type: 'UPDATE_FIELD',
      section: 'skills',
      field: 'certifications',
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

      {/* Certifications Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Certifications</h3>
        <p className="text-gray-600 mb-4">Do you have any construction-related certifications?</p>
        
        <select
          value={state.skills.certifications}
          onChange={(e) => handleCertificationChange(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Choose...</option>
          {certificationOptions.map(cert => (
            <option key={cert} value={cert}>{cert}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SkillsExperience; 