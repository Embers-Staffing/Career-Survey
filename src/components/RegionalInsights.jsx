import React from 'react';

const MARKET_INSIGHTS = {
  BC: {
    title: "British Columbia",
    overview: "Strong construction market with focus on infrastructure and sustainable building",
    growthSectors: [
      {
        name: "Infrastructure Development",
        projects: [
          "Transit expansion projects",
          "Highway improvements",
          "Port modernization",
          "Healthcare facilities"
        ],
        outlook: "High growth expected through 2025"
      },
      {
        name: "Green Building",
        projects: [
          "Net-zero commercial buildings",
          "Sustainable residential developments",
          "Energy retrofit projects",
          "Clean energy infrastructure"
        ],
        outlook: "Rapidly expanding sector"
      }
    ],
    demandSkills: [
      {
        category: "Technical",
        skills: [
          "Sustainable construction practices",
          "BIM technology",
          "Clean energy systems",
          "Seismic requirements"
        ]
      },
      {
        category: "Management",
        skills: [
          "Project management",
          "Environmental compliance",
          "Risk management",
          "Stakeholder engagement"
        ]
      }
    ],
    marketOutlook: {
      shortTerm: "Strong demand in urban centers",
      longTerm: "Sustained growth expected",
      opportunities: [
        "Green building specialists",
        "Infrastructure project managers",
        "Technology integration experts",
        "Sustainability consultants"
      ]
    }
  },
  Alberta: {
    title: "Alberta",
    overview: "Diverse construction market with energy sector influence",
    growthSectors: [
      {
        name: "Energy Infrastructure",
        projects: [
          "Clean energy facilities",
          "Pipeline infrastructure",
          "Industrial facilities",
          "Energy storage projects"
        ],
        outlook: "Steady growth with focus on sustainability"
      },
      {
        name: "Commercial Development",
        projects: [
          "Office renovations",
          "Retail developments",
          "Industrial parks",
          "Mixed-use projects"
        ],
        outlook: "Moderate growth expected"
      }
    ],
    demandSkills: [
      {
        category: "Technical",
        skills: [
          "Industrial construction",
          "Energy systems",
          "Safety management",
          "Environmental compliance"
        ]
      },
      {
        category: "Management",
        skills: [
          "Project coordination",
          "Contract management",
          "Quality control",
          "Team leadership"
        ]
      }
    ],
    marketOutlook: {
      shortTerm: "Recovery in commercial sector",
      longTerm: "Diversification of construction types",
      opportunities: [
        "Energy construction specialists",
        "Commercial project managers",
        "Safety professionals",
        "Quality control experts"
      ]
    }
  },
  Manitoba: {
    title: "Manitoba",
    overview: "Stable market with focus on infrastructure renewal",
    growthSectors: [
      {
        name: "Public Infrastructure",
        projects: [
          "Healthcare facilities",
          "Educational institutions",
          "Transportation infrastructure",
          "Municipal projects"
        ],
        outlook: "Consistent growth projected"
      },
      {
        name: "Residential Development",
        projects: [
          "Multi-family housing",
          "Urban renewal projects",
          "Affordable housing",
          "Community facilities"
        ],
        outlook: "Steady demand expected"
      }
    ],
    demandSkills: [
      {
        category: "Technical",
        skills: [
          "Civil construction",
          "Project planning",
          "Cost estimation",
          "Building systems"
        ]
      },
      {
        category: "Management",
        skills: [
          "Public project management",
          "Stakeholder communication",
          "Budget control",
          "Schedule management"
        ]
      }
    ],
    marketOutlook: {
      shortTerm: "Focus on public sector projects",
      longTerm: "Stable growth trajectory",
      opportunities: [
        "Infrastructure specialists",
        "Residential construction managers",
        "Cost estimators",
        "Project coordinators"
      ]
    }
  }
};

function RegionalInsights() {
  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold text-gray-900">Regional Market Insights</h3>
      <p className="mt-2 text-gray-600">
        Current market trends and opportunities by region:
      </p>

      <div className="space-y-8 mt-6">
        {Object.entries(MARKET_INSIGHTS).map(([region, data]) => (
          <div key={region} className="border rounded-lg p-6">
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900">{data.title}</h4>
              <p className="text-gray-600 mt-1">{data.overview}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h5 className="font-medium text-gray-900 mb-3">Growth Sectors</h5>
                {data.growthSectors.map((sector, index) => (
                  <div key={index} className="mb-4 bg-gray-50 rounded-lg p-4">
                    <h6 className="font-medium text-gray-900">{sector.name}</h6>
                    <p className="text-sm text-gray-600 mt-1">{sector.outlook}</p>
                    <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                      {sector.projects.map((project, pIndex) => (
                        <li key={pIndex}>{project}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div>
                <h5 className="font-medium text-gray-900 mb-3">In-Demand Skills</h5>
                {data.demandSkills.map((category, index) => (
                  <div key={index} className="mb-4 bg-gray-50 rounded-lg p-4">
                    <h6 className="font-medium text-gray-900">{category.category}</h6>
                    <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                      {category.skills.map((skill, sIndex) => (
                        <li key={sIndex}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div className="mt-6">
                  <h5 className="font-medium text-gray-900 mb-3">Market Outlook</h5>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Short-term:</span> {data.marketOutlook.shortTerm}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">Long-term:</span> {data.marketOutlook.longTerm}
                    </p>
                    <div className="mt-3">
                      <p className="text-sm font-medium">Key Opportunities:</p>
                      <ul className="mt-1 text-sm text-gray-600 list-disc list-inside">
                        {data.marketOutlook.opportunities.map((opp, oIndex) => (
                          <li key={oIndex}>{opp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Pro Tip:</span> Consider regional market trends when planning your career progression and identifying opportunities for specialization.
        </p>
      </div>
    </div>
  );
}

export default RegionalInsights; 