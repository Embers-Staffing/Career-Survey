import React from 'react';

const PROFESSIONAL_ASSOCIATIONS = {
  national: [
    {
      name: "Canadian Construction Association (CCA)",
      url: "https://www.cca-acc.com/",
      description: "National voice of the construction industry",
      benefits: [
        "Industry advocacy",
        "Professional development",
        "Gold Seal Certification",
        "Industry standards and guides"
      ]
    },
    {
      name: "Canadian Home Builders' Association",
      url: "https://www.chba.ca/",
      description: "Representing residential construction",
      benefits: [
        "Industry updates",
        "Training programs",
        "Networking events",
        "Market insights"
      ]
    }
  ],
  provincial: {
    BC: [
      {
        name: "BC Construction Association",
        url: "https://www.bccassn.com/",
        description: "Provincial construction industry association",
        benefits: [
          "Regional advocacy",
          "Local networking",
          "Training resources",
          "Job board access"
        ]
      },
      {
        name: "Vancouver Regional Construction Association",
        url: "https://www.vrca.ca/",
        description: "Greater Vancouver construction network",
        benefits: [
          "Local events",
          "Education programs",
          "Industry connections",
          "Business resources"
        ]
      }
    ],
    Alberta: [
      {
        name: "Alberta Construction Association",
        url: "https://www.albertaconstruction.net/",
        description: "Voice of Alberta's construction industry",
        benefits: [
          "Provincial advocacy",
          "Safety programs",
          "Industry resources",
          "Member directory"
        ]
      }
    ],
    Manitoba: [
      {
        name: "Manitoba Heavy Construction Association",
        url: "https://www.mhca.mb.ca/",
        description: "Heavy construction industry association",
        benefits: [
          "Industry representation",
          "Safety certification",
          "Equipment rental rates",
          "Training programs"
        ]
      }
    ]
  },
  specialized: [
    {
      name: "Canadian Association of Women in Construction",
      url: "https://www.cawic.ca/",
      description: "Supporting women in construction",
      benefits: [
        "Mentorship programs",
        "Scholarships",
        "Networking events",
        "Professional development"
      ]
    },
    {
      name: "Mechanical Contractors Association of Canada",
      url: "https://mcac.ca/",
      description: "Mechanical construction sector association",
      benefits: [
        "Technical resources",
        "Industry standards",
        "Education programs",
        "National conference"
      ]
    }
  ]
};

function ProfessionalAssociations() {
  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold text-gray-900">Professional Associations</h3>
      <p className="mt-2 text-gray-600">
        Join these professional associations to advance your career and stay connected with the industry:
      </p>

      {/* National Associations */}
      <div className="mt-6">
        <h4 className="font-medium text-lg mb-3">National Associations</h4>
        <div className="grid gap-4 md:grid-cols-2">
          {PROFESSIONAL_ASSOCIATIONS.national.map((association) => (
            <div key={association.name} className="border rounded-lg p-4">
              <a
                href={association.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:text-blue-800"
              >
                {association.name}
              </a>
              <p className="text-sm text-gray-600 mt-1">{association.description}</p>
              <div className="mt-2">
                <p className="text-sm font-medium">Member Benefits:</p>
                <ul className="text-sm text-gray-600 list-disc list-inside mt-1">
                  {association.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Provincial Associations */}
      <div className="mt-6">
        <h4 className="font-medium text-lg mb-3">Provincial Associations</h4>
        {Object.entries(PROFESSIONAL_ASSOCIATIONS.provincial).map(([province, associations]) => (
          <div key={province} className="mt-4">
            <h5 className="font-medium text-gray-700 mb-2">{province}</h5>
            <div className="grid gap-4 md:grid-cols-2">
              {associations.map((association) => (
                <div key={association.name} className="border rounded-lg p-4">
                  <a
                    href={association.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:text-blue-800"
                  >
                    {association.name}
                  </a>
                  <p className="text-sm text-gray-600 mt-1">{association.description}</p>
                  <div className="mt-2">
                    <p className="text-sm font-medium">Member Benefits:</p>
                    <ul className="text-sm text-gray-600 list-disc list-inside mt-1">
                      {association.benefits.map((benefit, index) => (
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

      {/* Specialized Associations */}
      <div className="mt-6">
        <h4 className="font-medium text-lg mb-3">Specialized Associations</h4>
        <div className="grid gap-4 md:grid-cols-2">
          {PROFESSIONAL_ASSOCIATIONS.specialized.map((association) => (
            <div key={association.name} className="border rounded-lg p-4">
              <a
                href={association.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:text-blue-800"
              >
                {association.name}
              </a>
              <p className="text-sm text-gray-600 mt-1">{association.description}</p>
              <div className="mt-2">
                <p className="text-sm font-medium">Member Benefits:</p>
                <ul className="text-sm text-gray-600 list-disc list-inside mt-1">
                  {association.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Pro Tip:</span> Many associations offer student memberships at reduced rates. Consider joining early in your career to maximize networking and learning opportunities.
        </p>
      </div>
    </div>
  );
}

export default ProfessionalAssociations; 