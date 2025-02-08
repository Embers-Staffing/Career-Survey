import React from 'react';
import { useSurvey } from '../../context/SurveyContext';

function Goals() {
  const { state, dispatch } = useSurvey();

  const handleGoalChange = (field, value) => {
    dispatch({
      type: 'UPDATE_FIELD',
      section: 'goals',
      field,
      value
    });
  };

  const handleCareerGoalChange = (goal) => {
    const currentGoals = state.goals.careerGoals;
    const newGoals = currentGoals.includes(goal)
      ? currentGoals.filter(g => g !== goal)
      : [...currentGoals, goal];

    handleGoalChange('careerGoals', newGoals);
  };

  const careerGoals = [
    {
      id: 'leadership',
      label: 'Advance to leadership positions',
      description: 'Move into supervisory or management roles'
    },
    {
      id: 'specialist',
      label: 'Become a specialist in my field',
      description: 'Develop deep expertise in a specific area'
    },
    {
      id: 'business',
      label: 'Start my own business',
      description: 'Become an independent contractor or company owner'
    },
    {
      id: 'technology',
      label: 'Work with new technologies',
      description: 'Focus on emerging construction technologies'
    }
  ];

  const advancementOptions = [
    {
      value: 'education',
      label: 'Through formal education and certifications',
      description: 'Structured learning programs and professional certifications'
    },
    {
      value: 'experience',
      label: 'Through hands-on experience and mentorship',
      description: 'Learning on the job and from experienced professionals'
    },
    {
      value: 'both',
      label: 'A combination of both',
      description: 'Balance of formal education and practical experience'
    }
  ];

  const mentorshipTypes = [
    {
      value: 'one-on-one',
      label: 'One-on-one mentorship',
      description: 'Direct guidance from an experienced professional'
    },
    {
      value: 'group',
      label: 'Group mentorship program',
      description: 'Learn with peers under experienced leadership'
    },
    {
      value: 'peer',
      label: 'Peer mentorship',
      description: 'Collaborative learning with colleagues'
    },
    {
      value: 'none',
      label: 'No mentorship needed',
      description: 'Prefer self-directed learning'
    }
  ];

  const salaryRanges = [
    { value: 'entry', label: 'Entry Level ($30,000 - $45,000)' },
    { value: 'mid', label: 'Mid Level ($45,000 - $65,000)' },
    { value: 'senior', label: 'Senior Level ($65,000 - $90,000)' },
    { value: 'expert', label: 'Expert Level ($90,000+)' }
  ];

  return (
    <div className="space-y-8">
      {/* Career Goals Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Career Goals</h3>
        <p className="text-gray-600 mb-4">What are your career goals? (Select up to 3)</p>

        <div className="grid gap-4 md:grid-cols-2">
          {careerGoals.map(goal => (
            <div
              key={goal.id}
              className={`p-4 border rounded-lg cursor-pointer ${
                state.goals.careerGoals.includes(goal.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'hover:border-gray-400'
              }`}
              onClick={() => handleCareerGoalChange(goal.id)}
            >
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id={`goal-${goal.id}`}
                  checked={state.goals.careerGoals.includes(goal.id)}
                  onChange={() => handleCareerGoalChange(goal.id)}
                  className="mt-1 rounded"
                />
                <label htmlFor={`goal-${goal.id}`} className="cursor-pointer">
                  <div className="font-medium">{goal.label}</div>
                  <div className="text-sm text-gray-500">{goal.description}</div>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Career Advancement Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Career Advancement</h3>
        <p className="text-gray-600 mb-4">How do you prefer to advance your career?</p>

        <div className="space-y-3">
          {advancementOptions.map(option => (
            <label
              key={option.value}
              className={`block p-4 border rounded-lg cursor-pointer ${
                state.goals.advancementPreference === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'hover:border-gray-400'
              }`}
            >
              <div className="flex items-start">
                <input
                  type="radio"
                  name="advancement"
                  value={option.value}
                  checked={state.goals.advancementPreference === option.value}
                  onChange={(e) => handleGoalChange('advancementPreference', e.target.value)}
                  className="mt-1"
                />
                <div className="ml-2">
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-gray-500">{option.description}</div>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Mentorship Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Mentorship Preferences</h3>
        <p className="text-gray-600 mb-4">What type of mentorship would you prefer?</p>

        <select
          value={state.goals.mentorshipType}
          onChange={(e) => handleGoalChange('mentorshipType', e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Choose...</option>
          {mentorshipTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>

      {/* Salary Expectations */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Target Salary Range</h3>
        <p className="text-gray-600 mb-4">What is your target salary range?</p>

        <select
          value={state.goals.targetSalary}
          onChange={(e) => handleGoalChange('targetSalary', e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Choose...</option>
          {salaryRanges.map(range => (
            <option key={range.value} value={range.value}>{range.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Goals; 