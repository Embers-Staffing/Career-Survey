import React from 'react';

const WELLNESS_RESOURCES = {
  mentalHealth: {
    title: "Mental Health Support",
    description: "Resources for maintaining mental wellbeing in construction",
    resources: [
      {
        name: "Construction Industry Helpline",
        url: "https://www.constructionhelpline.ca",
        services: [
          "24/7 confidential support",
          "Crisis counseling",
          "Mental health resources",
          "Stress management tools"
        ],
        contact: "1-800-XXX-XXXX"
      },
      {
        name: "Addiction Support Network",
        url: "https://www.constructionaddictionsupport.ca",
        services: [
          "Confidential addiction counseling",
          "Recovery programs",
          "Peer support groups",
          "Family support services"
        ],
        contact: "1-855-XXX-XXXX",
        additionalInfo: "Industry-specific programs understanding construction workplace challenges"
      }
    ]
  },
  addictionSupport: {
    title: "Addiction Recovery Resources",
    description: "Specialized support for addiction recovery in construction",
    resources: [
      {
        name: "Construction Workers Recovery Program",
        url: "https://www.constructionrecovery.ca",
        services: [
          "Substance abuse treatment",
          "Work-compatible recovery programs",
          "Return-to-work support",
          "Long-term recovery maintenance"
        ],
        features: [
          "Industry-specific approach",
          "Flexible scheduling for working professionals",
          "Confidential treatment options",
          "Connection with peers in recovery"
        ]
      },
      {
        name: "Industry Recovery Alliance",
        url: "https://www.industryrecovery.ca",
        services: [
          "Assessment and referral",
          "Treatment placement",
          "Aftercare planning",
          "Workplace reintegration"
        ],
        features: [
          "Understanding of job site challenges",
          "Support for maintaining employment",
          "Connection to industry-friendly treatment centers",
          "Ongoing support network"
        ]
      }
    ]
  },
  workLifeBalance: {
    title: "Work-Life Balance Strategies",
    description: "Tools and resources for maintaining healthy work-life balance",
    resources: [
      {
        name: "Construction Wellness Program",
        url: "https://www.constructionwellness.ca",
        strategies: [
          "Schedule management techniques",
          "Family time protection strategies",
          "Stress reduction methods",
          "Healthy lifestyle habits"
        ],
        tools: [
          "Work schedule templates",
          "Boundary-setting guides",
          "Self-care planning tools",
          "Family activity resources"
        ]
      }
    ]
  },
  physicalHealth: {
    title: "Physical Health Resources",
    description: "Support for maintaining physical health in construction",
    resources: [
      {
        name: "Construction Ergonomics Program",
        url: "https://www.constructionergonomics.ca",
        services: [
          "Injury prevention training",
          "Ergonomic assessments",
          "Physical therapy referrals",
          "Fitness programs"
        ],
        tools: [
          "Stretching guides",
          "Proper lifting techniques",
          "Equipment usage best practices",
          "Recovery exercises"
        ]
      }
    ]
  }
};

function WorkLifeBalance() {
  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold text-gray-900">Work-Life Balance & Wellness Resources</h3>
      <p className="mt-2 text-gray-600">
        Support services and resources for maintaining health and balance in construction:
      </p>

      <div className="space-y-8 mt-6">
        {Object.entries(WELLNESS_RESOURCES).map(([category, section]) => (
          <div key={category} className="border rounded-lg p-6">
            <h4 className="text-lg font-medium text-gray-900">{section.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{section.description}</p>

            <div className="grid gap-4 md:grid-cols-2 mt-4">
              {section.resources.map((resource, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:text-blue-800"
                  >
                    {resource.name}
                  </a>

                  {resource.services && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-900">Services:</p>
                      <ul className="mt-1 text-sm text-gray-600 list-disc list-inside">
                        {resource.services.map((service, sIndex) => (
                          <li key={sIndex}>{service}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {resource.features && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-900">Features:</p>
                      <ul className="mt-1 text-sm text-gray-600 list-disc list-inside">
                        {resource.features.map((feature, fIndex) => (
                          <li key={fIndex}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {resource.contact && (
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Contact:</span> {resource.contact}
                    </p>
                  )}

                  {resource.additionalInfo && (
                    <p className="mt-2 text-sm text-gray-600 italic">
                      {resource.additionalInfo}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Important Note:</span> All support services are completely confidential. Seeking help is a sign of strength, not weakness. Your career and wellbeing matter.
        </p>
      </div>
    </div>
  );
}

export default WorkLifeBalance; 