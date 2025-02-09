import React from 'react';

const CERTIFICATION_PATHS = {
  management: {
    title: "Project Management Path",
    description: "Career progression through management certifications",
    timeline: "2-4 years",
    prerequisites: [
      "High school diploma or equivalent",
      "3-5 years construction experience",
      "Basic safety certifications"
    ],
    steps: [
      {
        level: "Entry Level",
        certifications: [
          {
            name: "Construction Safety Training System (CSTS)",
            duration: "1-2 weeks",
            cost: "$100-200",
            provider: "Construction Safety Association"
          },
          {
            name: "First Level Supervisor Training Program",
            duration: "4-6 weeks",
            cost: "$500-800",
            provider: "Construction Association"
          }
        ]
      },
      {
        level: "Intermediate",
        certifications: [
          {
            name: "Project Management Training Program",
            duration: "3-6 months",
            cost: "$2,000-3,000",
            provider: "Construction Management Association"
          },
          {
            name: "Gold Seal Certification",
            duration: "6-12 months",
            cost: "$1,000-1,500",
            provider: "Canadian Construction Association"
          }
        ]
      },
      {
        level: "Advanced",
        certifications: [
          {
            name: "PMP (Project Management Professional)",
            duration: "6-12 months",
            cost: "$3,000-4,000",
            provider: "Project Management Institute"
          }
        ]
      }
    ]
  },
  technical: {
    title: "Technical Specialist Path",
    description: "Specialized technical certifications progression",
    timeline: "2-3 years",
    prerequisites: [
      "High school diploma or equivalent",
      "Basic construction experience",
      "Math and technical aptitude"
    ],
    steps: [
      {
        level: "Entry Level",
        certifications: [
          {
            name: "Trade Certification",
            duration: "3-4 years",
            cost: "Varies by trade",
            provider: "Provincial Trade Authority"
          }
        ]
      },
      {
        level: "Intermediate",
        certifications: [
          {
            name: "Building Code Certification",
            duration: "6-12 months",
            cost: "$1,500-2,000",
            provider: "Provincial Building Authority"
          }
        ]
      },
      {
        level: "Advanced",
        certifications: [
          {
            name: "Technical Specialist Designation",
            duration: "1-2 years",
            cost: "$2,000-3,000",
            provider: "Industry Association"
          }
        ]
      }
    ]
  },
  safety: {
    title: "Safety Professional Path",
    description: "Safety management and certification progression",
    timeline: "1-3 years",
    prerequisites: [
      "High school diploma or equivalent",
      "Basic safety training",
      "Construction site experience"
    ],
    steps: [
      {
        level: "Entry Level",
        certifications: [
          {
            name: "Occupational Health and Safety Certificate",
            duration: "3-6 months",
            cost: "$800-1,200",
            provider: "Safety Association"
          }
        ]
      },
      {
        level: "Intermediate",
        certifications: [
          {
            name: "Construction Safety Officer (CSO)",
            duration: "6-12 months",
            cost: "$1,500-2,000",
            provider: "Construction Safety Association"
          }
        ]
      },
      {
        level: "Advanced",
        certifications: [
          {
            name: "Canadian Registered Safety Professional (CRSP)",
            duration: "2-3 years",
            cost: "$3,000-4,000",
            provider: "Board of Canadian Registered Safety Professionals"
          }
        ]
      }
    ]
  }
};

function CertificationRoadmaps() {
  return (
    <div id="certification-roadmap" className="mt-8 bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold text-gray-900">Certification Roadmaps</h3>
      <p className="mt-2 text-gray-600">
        Strategic certification paths to advance your construction career:
      </p>

      <div className="space-y-12 mt-6">
        {Object.entries(CERTIFICATION_PATHS).map(([key, path]) => (
          <div key={key} className="border rounded-lg p-6">
            <div className="mb-4">
              <h4 className="text-lg font-medium text-gray-900">{path.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{path.description}</p>
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-medium">Timeline:</span> {path.timeline}
              </p>
            </div>

            <div className="mb-4">
              <h5 className="font-medium text-gray-900">Prerequisites:</h5>
              <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
                {path.prerequisites.map((prereq, index) => (
                  <li key={index}>{prereq}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              {path.steps.map((step, index) => (
                <div key={index} className="border-t pt-4">
                  <h5 className="font-medium text-gray-900">{step.level}</h5>
                  <div className="grid gap-4 md:grid-cols-2 mt-3">
                    {step.certifications.map((cert, certIndex) => (
                      <div key={certIndex} className="bg-gray-50 rounded-lg p-4">
                        <h6 className="font-medium text-gray-900">{cert.name}</h6>
                        <ul className="mt-2 space-y-1 text-sm text-gray-600">
                          <li>Duration: {cert.duration}</li>
                          <li>Cost: {cert.cost}</li>
                          <li>Provider: {cert.provider}</li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Pro Tip:</span> Many employers offer tuition reimbursement or certification support. Check with your HR department about available programs and funding.
        </p>
      </div>
    </div>
  );
}

export default CertificationRoadmaps; 