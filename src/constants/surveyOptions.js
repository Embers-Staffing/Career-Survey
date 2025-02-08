export const SURVEY_OPTIONS = {
  months: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  years: Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i),
  myersBriggs: {
    attention: [
      { id: 'E', label: 'Externally - energized by social interaction (Extroversion)' },
      { id: 'I', label: 'Internally - energized by quiet reflection (Introversion)' }
    ],
    information: [
      { id: 'S', label: 'Through concrete facts and details (Sensing)' },
      { id: 'N', label: 'Through patterns and possibilities (Intuition)' }
    ],
    decisions: [
      { id: 'T', label: 'Based on logic and objective analysis (Thinking)' },
      { id: 'F', label: 'Based on values and people impact (Feeling)' }
    ],
    lifestyle: [
      { id: 'J', label: 'Structured and planned (Judging)' },
      { id: 'P', label: 'Flexible and adaptable (Perceiving)' }
    ]
  },
  hollandCode: [
    {
      code: 'R',
      title: 'Realistic',
      description: 'You enjoy working with your hands, tools, machines, or animals. You value practical things you can see and touch.',
      careers: 'Good for: Trades, Equipment Operation, Technical Work'
    },
    // ... Add other Holland Code options
  ],
  technicalSkills: [
    'Hand and power tools',
    'Blueprint reading',
    'Construction math and measurements',
    'Safety procedures and protocols',
    'Heavy equipment operation',
    'Computer and software skills'
  ],
  constructionRoles: [
    'Tradesperson (e.g., electrician, plumber, carpenter)',
    'Heavy Machinery Operator',
    'Construction Technology Specialist (drones, VR, AI)',
    'Cost Estimator/Quantity Surveyor',
    'Project Management'
  ],
  certifications: [
    'WHMIS (Workplace Hazardous Materials Information System)',
    'First Aid/CPR',
    'Fall Protection',
    'Working at Heights',
    'Confined Space Entry',
    'Construction Safety Training System (CSTS)',
    'Traffic Control Person (TCP)',
    'Equipment Operation',
    'Project Management Professional (PMP)',
    'Gold Seal Certification',
    'Red Seal Trade Certification',
    'Other'
  ],
  // ... Add other option sets
}; 