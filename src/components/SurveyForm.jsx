import React from 'react';
import { useSurvey } from '../context/SurveyContext';

function SurveyForm() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Construction Career Survey
      </h1>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <p className="text-lg text-center mb-4">
          Welcome to the Construction Career Survey
        </p>
        {/* Survey form content will go here */}
      </div>
    </div>
  );
}

export default SurveyForm; 