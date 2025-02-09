import React from 'react';

const MENTORSHIP_PROGRAMS = {
  industry: [
    {
      name: "Canadian Construction Association Mentoring Program",
      url: "https://www.cca-acc.com/mentoring",
      type: "Industry-Wide",
      format: "Structured 12-month program",
      description: "Connects experienced construction professionals with emerging leaders",
      benefits: [
        "One-on-one guidance",
        "Career development planning",
        "Industry networking",
        "Leadership skill development"
      ]
    },
    {
      name: "Gold Seal Mentorship",
      url: "https://www.goldsealcertification.com/mentorship",
      type: "Certification-Focused",
      format: "6-month program",
      description: "Supports candidates pursuing Gold Seal Certification",
      benefits: [
        "Exam preparation",
        "Project management guidance",
        "Industry best practices",
        "Professional development"
      ]
    }
  ],
  specialized: [
    {
      name: "Women in Construction Mentorship",
      url: "https://www.cawic.ca/mentorship",
      type: "Women-Focused",
      format: "Flexible duration",
      description: "Supporting women's advancement in construction",
      benefits: [
        "Career guidance",
        "Leadership development",
        "Industry networking",
        "Work-life balance strategies"
      ]
    },
    {
      name: "Indigenous Mentorship in Construction",
      url: "https://www.indigenousconstructioncareers.ca/mentorship",
      type: "Indigenous-Focused",
      format: "Ongoing support",
      description: "Supporting Indigenous professionals in construction",
      benefits: [
        "Cultural support",
        "Career advancement",
        "Community connection",
        "Professional development"
      ]
    }
  ],
  apprenticeship: [
    {
      name: "Red Seal Apprenticeship Mentoring",
      url: "https://www.red-seal.ca/mentorship",
      type: "Trade-Specific",
      format: "Duration of apprenticeship",
      description: "Supporting apprentices through their Red Seal journey",
      benefits: [
        "Skills development",
        "Trade certification preparation",
        "Safety training",
        "Career progression planning"
      ]
    }
  ],
  peer: [
    {
      name: "Construction Peer Network",
      url: "https://constructionpeernetwork.ca",
      type: "Peer-to-Peer",
      format: "Ongoing participation",
      description: "Connect with peers in similar roles and career stages",
      benefits: [
        "Shared learning experiences",
        "Problem-solving support",
        "Industry networking",
        "Resource sharing"
      ]
    }
  ]
};

function MentorshipPrograms() {
  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold text-gray-900">Mentorship Programs</h3>
      <p className="mt-2 text-gray-600">
        Accelerate your career growth through structured mentorship opportunities:
      </p>

      <div className="space-y-8 mt-6">
        {Object.entries(MENTORSHIP_PROGRAMS).map(([category, programs]) => (
          <div key={category}>
            <h4 className="font-medium text-lg text-gray-900 capitalize">
              {category.replace('_', ' ')} Mentorship
            </h4>

            <div className="grid gap-4 md:grid-cols-2 mt-4">
              {programs.map((program) => (
                <div key={program.name} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <a
                      href={program.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:text-blue-800"
                    >
                      {program.name}
                    </a>
                    <span className="text-sm text-gray-500">{program.type}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{program.format}</p>
                  <p className="text-sm text-gray-600 mt-1">{program.description}</p>
                  <div className="mt-3">
                    <p className="text-sm font-medium mb-1">Program Benefits:</p>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {program.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Pro Tip:</span> Consider both formal and informal mentorship opportunities. Many successful construction professionals credit mentorship as a key factor in their career advancement.
        </p>
      </div>
    </div>
  );
}

export default MentorshipPrograms; 