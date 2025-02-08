import React from 'react';

function StepIndicator({ currentStep, totalSteps }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div key={index} className="flex items-center flex-1">
            <div className="relative flex items-center justify-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center 
                text-sm font-semibold transition-colors duration-200
                ${index <= currentStep 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-600'
                }
                ${index < currentStep && 'bg-green-500'}
              `}>
                {index + 1}
              </div>
              <div className="absolute -bottom-6 w-max text-center">
                <span className={`text-xs ${
                  index <= currentStep ? 'text-gray-700' : 'text-gray-400'
                }`}>
                  {[
                    'Personal Info',
                    'Personality',
                    'Skills',
                    'Preferences',
                    'Goals'
                  ][index]}
                </span>
              </div>
            </div>
            {index < totalSteps - 1 && (
              <div className="flex-1 h-[2px] mx-2">
                <div className={`
                  h-full transition-all duration-200
                  ${index < currentStep 
                    ? 'bg-green-500' 
                    : index === currentStep 
                    ? 'bg-blue-500' 
                    : 'bg-gray-200'
                  }
                `} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StepIndicator; 