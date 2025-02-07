import React, { useState } from 'react';
import { useSurvey } from '../context/SurveyContext';
import StepIndicator from './StepIndicator';

function SurveyForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const { state, dispatch } = useSurvey();

  const steps = [
    'Personal Information',
    'Personality Assessment',
    'Skills & Experience',
    'Work Preferences',
    'Goals'
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Construction Career Survey
      </h1>
      <div className="max-w-2xl mx-auto">
        <StepIndicator currentStep={currentStep} totalSteps={steps.length} />
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            {steps[currentStep]}
          </h2>
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`px-4 py-2 rounded ${
                currentStep === 0 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SurveyForm; 