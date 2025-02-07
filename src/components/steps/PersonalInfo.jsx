import React from 'react';
import { useSurvey } from '../../context/SurveyContext';
import { SURVEY_OPTIONS } from '../../constants/surveyOptions';

function PersonalInfo() {
  const { state, dispatch } = useSurvey();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const handleChange = (field, value) => {
    dispatch({
      type: 'UPDATE_FIELD',
      section: 'personalInfo',
      field,
      value
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            value={state.personalInfo.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            value={state.personalInfo.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Birth Year
          </label>
          <select
            value={state.personalInfo.birthYear}
            onChange={(e) => handleChange('birthYear', e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Year</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Birth Month
          </label>
          <select
            value={state.personalInfo.birthMonth}
            onChange={(e) => handleChange('birthMonth', e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Month</option>
            {SURVEY_OPTIONS.months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Years in Construction
        </label>
        <select
          value={state.personalInfo.yearsInConstruction}
          onChange={(e) => handleChange('yearsInConstruction', e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select Experience</option>
          <option value="new">New to Construction</option>
          {Array.from({ length: 40 }, (_, i) => i + 1).map(year => (
            <option key={year} value={year}>{year} year{year === 1 ? '' : 's'}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default PersonalInfo; 