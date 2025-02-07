import { createContext, useContext, useReducer } from 'react';

const SurveyContext = createContext();

const initialState = {
  personalInfo: {
    firstName: '',
    lastName: '',
    birthYear: '',
    birthMonth: '',
    yearsInConstruction: ''
  },
  personalityTraits: {
    myersBriggs: {
      attention: [], // Allow multiple selections
      information: [],
      decisions: [],
      lifestyle: []
    },
    hollandCode: [] // Array to store up to 3 selections
  },
  skills: {
    technical: [],
    certifications: ''
  },
  workPreferences: {
    roles: [],
    technologies: [],
    environment: '',
    travelWillingness: ''
  },
  goals: {
    careerGoals: [],
    advancementPreference: '',
    mentorshipType: '',
    targetSalary: ''
  }
};

function surveyReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          [action.field]: action.value
        }
      };
    case 'UPDATE_NESTED_FIELD':
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          [action.subsection]: {
            ...state[action.section][action.subsection],
            [action.field]: action.value
          }
        }
      };
    default:
      return state;
  }
}

export function SurveyProvider({ children }) {
  const [state, dispatch] = useReducer(surveyReducer, initialState);

  return (
    <SurveyContext.Provider value={{ state, dispatch }}>
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurvey() {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
} 