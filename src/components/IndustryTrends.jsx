import React from 'react';

const INDUSTRY_TRENDS = {
  technologies: {
    title: "Emerging Technologies",
    description: "Key technological trends shaping the construction industry",
    trends: [
      {
        name: "Green Building Technologies",
        description: "Sustainable construction methods and materials",
        impact: "High",
        timeframe: "Current",
        examples: [
          "Net-zero building designs",
          "Sustainable materials",
          "Energy-efficient systems",
          "Waste reduction technologies"
        ]
      },
      {
        name: "Digital Construction",
        description: "Digital tools and processes transforming construction",
        impact: "High",
        timeframe: "Current-Future",
        examples: [
          "BIM integration",
          "Digital twin technology",
          "Mobile project management",
          "Cloud collaboration tools"
        ]
      },
      {
        name: "Automation and Robotics",
        description: "Automated construction processes and robotics",
        impact: "Medium",
        timeframe: "Emerging",
        examples: [
          "Prefabrication automation",
          "Construction robots",
          "Autonomous equipment",
          "3D printing construction"
        ]
      }
    ]
  },
  skills: {
    title: "In-Demand Skills",
    description: "Growing skill requirements in construction",
    trends: [
      {
        name: "Digital Literacy",
        description: "Essential digital skills for modern construction",
        impact: "High",
        timeframe: "Immediate",
        examples: [
          "Project management software",
          "Mobile applications",
          "Data analysis",
          "Digital documentation"
        ]
      },
      {
        name: "Sustainability Expertise",
        description: "Knowledge of sustainable construction practices",
        impact: "High",
        timeframe: "Current-Future",
        examples: [
          "Green building standards",
          "Environmental regulations",
          "Sustainable materials",
          "Energy efficiency"
        ]
      }
    ]
  },
  marketTrends: {
    title: "Market Developments",
    description: "Current and emerging market trends",
    trends: [
      {
        name: "Modular Construction",
        description: "Prefabrication and modular building methods",
        impact: "High",
        timeframe: "Current",
        examples: [
          "Off-site construction",
          "Modular components",
          "Rapid assembly",
          "Quality control"
        ]
      },
      {
        name: "Infrastructure Renewal",
        description: "Focus on infrastructure modernization",
        impact: "High",
        timeframe: "Long-term",
        examples: [
          "Transportation projects",
          "Urban development",
          "Smart city integration",
          "Sustainable infrastructure"
        ]
      }
    ]
  }
};

function IndustryTrends() {
  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold text-gray-900">Industry Trends</h3>
      <p className="mt-2 text-gray-600">
        Stay ahead of the curve with these key industry trends and developments:
      </p>

      <div className="space-y-8 mt-6">
        {Object.entries(INDUSTRY_TRENDS).map(([category, section]) => (
          <div key={category}>
            <h4 className="font-medium text-lg text-gray-900">{section.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{section.description}</p>

            <div className="grid gap-4 md:grid-cols-2 mt-4">
              {section.trends.map((trend) => (
                <div key={trend.name} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium text-gray-900">{trend.name}</h5>
                      <p className="text-sm text-gray-600 mt-1">{trend.description}</p>
                    </div>
                    <span className={`
                      text-sm px-2 py-1 rounded-full
                      ${trend.impact === 'High' ? 'bg-green-100 text-green-800' : 
                        trend.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-blue-100 text-blue-800'}
                    `}>
                      {trend.timeframe}
                    </span>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-medium mb-1">Key Developments:</p>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {trend.examples.map((example, index) => (
                        <li key={index}>{example}</li>
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
          <span className="font-medium">Pro Tip:</span> Focus on developing skills in emerging technologies and sustainable practices to stay competitive in the evolving construction industry.
        </p>
      </div>
    </div>
  );
}

export default IndustryTrends; 