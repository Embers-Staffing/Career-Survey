import React from 'react';
import { useSurvey } from '../../context/SurveyContext';

function WorkPreferences() {
  const { state, dispatch } = useSurvey();

  const handlePreferenceChange = (field, value) => {
    dispatch({
      type: 'UPDATE_FIELD',
      section: 'workPreferences',
      field,
      value
    });
  };

  const handleMultiSelectChange = (field, value) => {
    const currentValues = state.workPreferences[field];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];

    handlePreferenceChange(field, newValues);
  };

  const constructionRoles = [
    {
      id: 'tradesperson',
      label: 'Tradesperson',
      description: 'Electrician, plumber, carpenter, etc.'
    },
    {
      id: 'operator',
      label: 'Heavy Machinery Operator',
      description: 'Operating construction equipment and vehicles'
    },
    {
      id: 'tech-specialist',
      label: 'Construction Technology Specialist',
      description: 'Working with drones, VR, AI systems'
    },
    {
      id: 'estimator',
      label: 'Cost Estimator/Quantity Surveyor',
      description: 'Project cost analysis and estimation'
    },
    {
      id: 'project-manager',
      label: 'Project Management',
      description: 'Overseeing construction projects'
    }
  ];

  const technologies = [
    {
      id: 'drones',
      label: 'Drone mapping and surveying',
      description: 'Aerial photography and site mapping'
    },
    {
      id: 'vr-ar',
      label: 'Virtual/Augmented Reality',
      description: 'VR/AR for design and training'
    },
    {
      id: 'bim',
      label: 'Building Information Modeling (BIM)',
      description: '3D modeling and project coordination'
    },
    {
      id: 'ai-automation',
      label: 'AI and automation',
      description: 'Smart systems and automated processes'
    }
  ];

  const environments = [
    {
      value: 'outdoor',
      label: 'Primarily outdoor work',
      description: 'Most time spent on construction sites'
    },
    {
      value: 'indoor',
      label: 'Primarily indoor work',
      description: 'Office or indoor facility work'
    },
    {
      value: 'mixed',
      label: 'Mix of indoor and outdoor work',
      description: 'Balance between site and office work'
    }
  ];

  const travelOptions = [
    { value: 'no', label: 'No travel - work at one location' },
    { value: 'local', label: 'Local travel within the region' },
    { value: 'regional', label: 'Regional travel (occasional overnight stays)' },
    { value: 'extensive', label: 'Extensive travel (frequent stays away)' }
  ];

  return (
    <div className="space-y-8">
      {/* Preferred Roles Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Preferred Roles</h3>
        <p className="text-gray-600 mb-4">Which construction roles interest you the most? (Choose up to three)</p>

        <div className="grid gap-4 md:grid-cols-2">
          {constructionRoles.map(role => (
            <div
              key={role.id}
              className={`p-4 border rounded-lg cursor-pointer ${
                state.workPreferences.roles.includes(role.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'hover:border-gray-400'
              }`}
              onClick={() => handleMultiSelectChange('roles', role.id)}
            >
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id={`role-${role.id}`}
                  checked={state.workPreferences.roles.includes(role.id)}
                  onChange={() => handleMultiSelectChange('roles', role.id)}
                  className="mt-1 rounded"
                />
                <label htmlFor={`role-${role.id}`} className="cursor-pointer">
                  <div className="font-medium">{role.label}</div>
                  <div className="text-sm text-gray-500">{role.description}</div>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technologies Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Technologies</h3>
        <p className="text-gray-600 mb-4">Which construction technologies interest you? (Select all that apply)</p>

        <div className="grid gap-4 md:grid-cols-2">
          {technologies.map(tech => (
            <div
              key={tech.id}
              className={`p-4 border rounded-lg cursor-pointer ${
                state.workPreferences.technologies.includes(tech.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'hover:border-gray-400'
              }`}
              onClick={() => handleMultiSelectChange('technologies', tech.id)}
            >
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id={`tech-${tech.id}`}
                  checked={state.workPreferences.technologies.includes(tech.id)}
                  onChange={() => handleMultiSelectChange('technologies', tech.id)}
                  className="mt-1 rounded"
                />
                <label htmlFor={`tech-${tech.id}`} className="cursor-pointer">
                  <div className="font-medium">{tech.label}</div>
                  <div className="text-sm text-gray-500">{tech.description}</div>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Work Environment Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Work Environment</h3>
        <p className="text-gray-600 mb-4">What type of work environment do you prefer?</p>

        <div className="space-y-3">
          {environments.map(env => (
            <label
              key={env.value}
              className={`block p-4 border rounded-lg cursor-pointer ${
                state.workPreferences.environment === env.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'hover:border-gray-400'
              }`}
            >
              <div className="flex items-start">
                <input
                  type="radio"
                  name="environment"
                  value={env.value}
                  checked={state.workPreferences.environment === env.value}
                  onChange={(e) => handlePreferenceChange('environment', e.target.value)}
                  className="mt-1"
                />
                <div className="ml-2">
                  <div className="font-medium">{env.label}</div>
                  <div className="text-sm text-gray-500">{env.description}</div>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Travel Willingness Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Travel Requirements</h3>
        <p className="text-gray-600 mb-4">Are you willing to travel for work?</p>

        <select
          value={state.workPreferences.travelWillingness}
          onChange={(e) => handlePreferenceChange('travelWillingness', e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Choose...</option>
          {travelOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default WorkPreferences; 