import React, { useState } from 'react';
import { useSurvey } from '../context/SurveyContext';
import StepIndicator from './StepIndicator';
import PersonalInfo from './steps/PersonalInfo';
import PersonalityAssessment from './steps/PersonalityAssessment';
import SkillsExperience from './steps/SkillsExperience';
import WorkPreferences from './steps/WorkPreferences';
import Goals from './steps/Goals';
import SubmitResponse from './SubmitResponse';

function SurveyForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSubmit, setShowSubmit] = useState(false);
  const { state } = useSurvey();

  const steps = [
    'Personal Information',
    'Personality Assessment',
    'Skills & Experience',
    'Work Preferences',
    'Goals'
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfo />;
      case 1:
        return <PersonalityAssessment />;
      case 2:
        return <SkillsExperience />;
      case 3:
        return <WorkPreferences />;
      case 4:
        return <Goals />;
      default:
        return <div>Step {currentStep + 1}</div>;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowSubmit(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setShowSubmit(false);
    // You might want to reset the form state here as well
  };

  if (showSubmit) {
    return <SubmitResponse onReset={handleReset} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Construction Career Survey
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 font-light">
          Discover Your Path in Construction and Property Development
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <StepIndicator currentStep={currentStep} totalSteps={steps.length} />
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            {steps[currentStep]}
          </h2>
          
          {renderStep()}

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

      <footer className="mt-12 text-center text-gray-600">
        <div className="border-t pt-6">
          <p className="mb-2">© Embers Staffing 2025</p>
          <p className="text-sm">
            Built by{' '}
            <a 
              href="https://bigfootcrane.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              Bigfoot Crane
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default SurveyForm; 