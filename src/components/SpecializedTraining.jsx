import React from 'react';

const SPECIALIZED_TRAINING = {
  leadership: {
    title: "Leadership Development",
    description: "Advanced management and leadership training",
    programs: [
      {
        name: "Construction Leadership Academy",
        provider: "Construction Management Institute",
        url: "https://www.constructionleadership.ca",
        duration: "6 months",
        format: "Hybrid (online + in-person)",
        modules: [
          "Strategic project leadership",
          "Team management and motivation",
          "Crisis management",
          "Stakeholder communication"
        ],
        outcomes: [
          "Enhanced leadership capabilities",
          "Improved team performance",
          "Better project outcomes",
          "Career advancement preparation"
        ]
      },
      {
        name: "Executive Construction Management",
        provider: "Construction Excellence Center",
        url: "https://www.constructionexec.ca",
        duration: "12 months",
        format: "Part-time executive program",
        modules: [
          "Strategic planning",
          "Financial management",
          "Risk management",
          "Innovation leadership"
        ]
      }
    ]
  },
  technical: {
    title: "Advanced Technical Training",
    description: "Specialized technical skills development",
    programs: [
      {
        name: "Advanced Equipment Operation",
        provider: "Technical Training Institute",
        url: "https://www.constructiontech.ca",
        duration: "3 months",
        format: "Hands-on training",
        modules: [
          "Heavy equipment specialization",
          "Automated systems operation",
          "Maintenance procedures",
          "Safety protocols"
        ],
        certifications: [
          "Advanced Operator Certificate",
          "Equipment Safety Certification",
          "Preventive Maintenance Certificate"
        ]
      },
      {
        name: "New Materials and Methods",
        provider: "Construction Innovation Center",
        url: "https://www.constructioninnovation.ca",
        duration: "4 months",
        format: "Blended learning",
        modules: [
          "Sustainable materials",
          "Advanced installation techniques",
          "Quality control methods",
          "Performance testing"
        ]
      }
    ]
  },
  safety: {
    title: "Advanced Safety Management",
    description: "Comprehensive safety leadership training",
    programs: [
      {
        name: "Construction Safety Leadership",
        provider: "Safety Excellence Institute",
        url: "https://www.constructionsafety.ca",
        duration: "6 months",
        format: "Online with practical assignments",
        modules: [
          "Safety culture development",
          "Risk assessment and control",
          "Incident investigation",
          "Safety program management"
        ],
        certifications: [
          "Advanced Safety Manager Certificate",
          "Safety Program Developer",
          "Incident Investigation Specialist"
        ]
      }
    ]
  },
  sustainability: {
    title: "Sustainable Construction",
    description: "Green building and sustainable practices",
    programs: [
      {
        name: "Green Construction Specialist",
        provider: "Sustainable Building Institute",
        url: "https://www.greenbuilding.ca",
        duration: "4 months",
        format: "Online with projects",
        modules: [
          "LEED principles and practices",
          "Energy efficiency systems",
          "Sustainable materials selection",
          "Waste reduction strategies"
        ],
        certifications: [
          "Green Building Specialist",
          "Sustainability Coordinator",
          "LEED Green Associate"
        ]
      }
    ]
  }
};

function SpecializedTraining() {
  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold text-gray-900">Specialized Training Programs</h3>
      <p className="mt-2 text-gray-600">
        Advanced training programs to develop specialized expertise:
      </p>

      <div className="space-y-8 mt-6">
        {Object.entries(SPECIALIZED_TRAINING).map(([category, section]) => (
          <div key={category} className="border rounded-lg p-6">
            <h4 className="text-lg font-medium text-gray-900">{section.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{section.description}</p>

            <div className="grid gap-4 md:grid-cols-2 mt-4">
              {section.programs.map((program, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <a
                      href={program.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:text-blue-800"
                    >
                      {program.name}
                    </a>
                    <span className="text-sm text-gray-500">{program.duration}</span>
                  </div>

                  <p className="text-sm text-gray-600 mt-1">
                    Provider: {program.provider}
                  </p>
                  <p className="text-sm text-gray-600">
                    Format: {program.format}
                  </p>

                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-900">Program Modules:</p>
                    <ul className="mt-1 text-sm text-gray-600 list-disc list-inside">
                      {program.modules.map((module, mIndex) => (
                        <li key={mIndex}>{module}</li>
                      ))}
                    </ul>
                  </div>

                  {program.outcomes && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-900">Learning Outcomes:</p>
                      <ul className="mt-1 text-sm text-gray-600 list-disc list-inside">
                        {program.outcomes.map((outcome, oIndex) => (
                          <li key={oIndex}>{outcome}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {program.certifications && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-900">Available Certifications:</p>
                      <ul className="mt-1 text-sm text-gray-600 list-disc list-inside">
                        {program.certifications.map((cert, cIndex) => (
                          <li key={cIndex}>{cert}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Pro Tip:</span> Many specialized programs offer flexible scheduling options to accommodate working professionals. Consider programs that align with your career goals and current work commitments.
        </p>
      </div>
    </div>
  );
}

export default SpecializedTraining; 