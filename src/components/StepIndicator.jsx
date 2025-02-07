import React from 'react';

function StepIndicator({ currentStep, totalSteps }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index < currentStep ? 'bg-green-500 text-white' : 
              index === currentStep ? 'bg-blue-500 text-white' : 
              'bg-gray-200'
            }`}>
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div className={`h-1 w-16 ${
                index < currentStep ? 'bg-green-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StepIndicator; 