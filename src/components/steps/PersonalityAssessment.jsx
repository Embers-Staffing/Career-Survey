import React from 'react';
import { useSurvey } from '../../context/SurveyContext';

function PersonalityAssessment() {
  const { state, dispatch } = useSurvey();
  
  console.log('PersonalityTraits State:', state.personalityTraits);

  const handleMyersBriggsChange = (category, value) => {
    // Get current values for this category
    const currentValues = state.personalityTraits.myersBriggs[category];
    let newValues;

    // If value is already selected, remove it
    if (currentValues.includes(value)) {
      newValues = currentValues.filter(v => v !== value);
    } else {
      // If selecting a new value, remove any conflicting values
      newValues = currentValues.filter(v => {
        const pairs = { E: 'I', I: 'E', S: 'N', N: 'S', T: 'F', F: 'T', J: 'P', P: 'J' };
        return v !== pairs[value];
      });
      newValues.push(value);
    }

    dispatch({
      type: 'UPDATE_NESTED_FIELD',
      section: 'personalityTraits',
      subsection: 'myersBriggs',
      field: category,
      value: newValues
    });
  };

  const handleHollandCodeChange = (code) => {
    const currentCodes = state.personalityTraits.hollandCode;
    let newCodes;
    
    if (currentCodes.includes(code)) {
      newCodes = currentCodes.filter(c => c !== code);
    } else if (currentCodes.length < 3) {
      newCodes = [...currentCodes, code];
    } else {
      return; // Already has 3 selections
    }

    dispatch({
      type: 'UPDATE_FIELD',
      section: 'personalityTraits',
      field: 'hollandCode',
      value: newCodes
    });
  };

  const myersBriggsQuestions = [
    {
      category: 'attention',
      question: 'How do you prefer to focus your attention?',
      options: [
        { value: 'E', label: 'Externally - energized by social interaction (Extroversion)' },
        { value: 'I', label: 'Internally - energized by quiet reflection (Introversion)' }
      ]
    },
    {
      category: 'information',
      question: 'How do you prefer to take in information?',
      options: [
        { value: 'S', label: 'Through concrete facts and details (Sensing)' },
        { value: 'N', label: 'Through patterns and possibilities (Intuition)' }
      ]
    },
    {
      category: 'decisions',
      question: 'How do you prefer to make decisions?',
      options: [
        { value: 'T', label: 'Based on logic and objective analysis (Thinking)' },
        { value: 'F', label: 'Based on values and people impact (Feeling)' }
      ]
    },
    {
      category: 'lifestyle',
      question: 'How do you prefer to organize your life?',
      options: [
        { value: 'J', label: 'Structured and planned (Judging)' },
        { value: 'P', label: 'Flexible and adaptable (Perceiving)' }
      ]
    }
  ];

  const hollandCodeTypes = [
    {
      code: 'R',
      title: 'Realistic',
      description: 'You enjoy working with your hands, tools, machines, or animals. You value practical things you can see and touch.',
      careers: 'Good for: Trades, Equipment Operation, Technical Work'
    },
    {
      code: 'I',
      title: 'Investigative',
      description: 'You like to solve complex problems, analyze data, and understand how things work.',
      careers: 'Good for: Engineering, Estimation, Technical Planning'
    },
    {
      code: 'A',
      title: 'Artistic',
      description: 'You value creativity, innovation, and unique solutions to problems.',
      careers: 'Good for: Design, BIM Modeling, Virtual Construction'
    },
    {
      code: 'S',
      title: 'Social',
      description: 'You enjoy working with and helping others, teaching, or providing guidance.',
      careers: 'Good for: Safety Training, Team Leadership, Project Coordination'
    },
    {
      code: 'E',
      title: 'Enterprising',
      description: 'You like to lead, persuade others, and make business decisions.',
      careers: 'Good for: Project Management, Business Development, Company Leadership'
    },
    {
      code: 'C',
      title: 'Conventional',
      description: 'You are detail-oriented, organized, and good with numbers and processes.',
      careers: 'Good for: Cost Estimation, Quality Control, Documentation'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Myers-Briggs Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Myers-Briggs Assessment</h3>
        
        <div className="space-y-6">
          {myersBriggsQuestions.map(({ category, question, options }) => (
            <div key={category}>
              <p className="font-medium mb-2">{question}</p>
              <div className="space-y-2">
                {options.map(({ value, label }) => {
                  const id = `mb-${category}-${value}`;
                  return (
                    <div key={value} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={id}
                        name={`mb-${category}`}
                        checked={state.personalityTraits.myersBriggs[category].includes(value)}
                        onChange={() => handleMyersBriggsChange(category, value)}
                        className="rounded"
                      />
                      <label htmlFor={id} className="cursor-pointer">
                        {label}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Holland Code Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Holland Code Assessment
          <span className="text-sm font-normal text-gray-600 ml-2">
            (Select up to 3)
          </span>
        </h3>

        <div className="grid gap-4">
          {hollandCodeTypes.map(type => (
            <div
              key={type.code}
              id={`holland-${type.code}`}
              role="button"
              tabIndex={0}
              aria-pressed={state.personalityTraits.hollandCode.includes(type.code)}
              className={`p-4 border rounded-lg cursor-pointer ${
                state.personalityTraits.hollandCode.includes(type.code)
                  ? 'border-blue-500 bg-blue-50'
                  : state.personalityTraits.hollandCode.length >= 3
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:border-gray-400'
              }`}
              onClick={() => {
                if (state.personalityTraits.hollandCode.length < 3 || 
                    state.personalityTraits.hollandCode.includes(type.code)) {
                  handleHollandCodeChange(type.code);
                }
              }}
            >
              <h4 className="font-medium">
                {type.title} ({type.code})
              </h4>
              <p className="text-sm text-gray-600 mt-1">{type.description}</p>
              <p className="text-sm text-gray-500 mt-1">{type.careers}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PersonalityAssessment; 