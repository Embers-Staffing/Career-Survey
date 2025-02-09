import React from 'react';

const FINANCIAL_RESOURCES = {
  retirement: {
    title: "Retirement Planning",
    description: "Long-term financial security resources",
    resources: [
      {
        name: "Construction Industry Pension Plan",
        url: "https://www.constructionpension.ca",
        features: [
          "Industry-specific pension options",
          "Employer contribution matching",
          "Portable benefits between employers",
          "Early retirement options"
        ],
        tools: [
          "Retirement calculator",
          "Contribution planning",
          "Investment options guide",
          "Benefits estimator"
        ]
      },
      {
        name: "Retirement Planning Workshop",
        url: "https://www.constructionretirement.ca",
        topics: [
          "Investment strategies",
          "Tax planning",
          "RRSP optimization",
          "CPP planning"
        ]
      }
    ]
  },
  insurance: {
    title: "Insurance & Benefits",
    description: "Protection for you and your family",
    resources: [
      {
        name: "Construction Benefits Alliance",
        url: "https://www.constructionbenefits.ca",
        coverage: [
          "Health insurance",
          "Dental coverage",
          "Disability insurance",
          "Life insurance"
        ],
        features: [
          "Family coverage options",
          "Flexible benefit plans",
          "Coverage during job transitions",
          "Supplemental insurance options"
        ]
      },
      {
        name: "Professional Liability Insurance",
        url: "https://www.constructioninsurance.ca",
        coverage: [
          "Project liability",
          "Equipment coverage",
          "Personal injury protection",
          "Error and omissions coverage"
        ]
      }
    ]
  },
  taxPlanning: {
    title: "Tax Planning",
    description: "Maximize your earnings through smart tax strategies",
    resources: [
      {
        name: "Construction Tax Guide",
        url: "https://www.constructiontax.ca",
        topics: [
          "Deductible expenses",
          "Tool and equipment claims",
          "Vehicle expenses",
          "Home office deductions"
        ],
        tools: [
          "Expense tracker",
          "Receipt organizer",
          "Tax calculator",
          "Deduction checklist"
        ]
      }
    ]
  },
  financialEducation: {
    title: "Financial Education",
    description: "Build your financial knowledge and skills",
    resources: [
      {
        name: "Construction Financial Literacy Program",
        url: "https://www.constructionfinance.ca",
        courses: [
          "Budgeting basics",
          "Investment fundamentals",
          "Debt management",
          "Financial goal setting"
        ],
        tools: [
          "Budget templates",
          "Savings calculators",
          "Debt reduction planner",
          "Investment guides"
        ]
      },
      {
        name: "Emergency Fund Planning",
        url: "https://www.constructionemergencyfund.ca",
        features: [
          "Savings strategies",
          "Fund size calculator",
          "Automatic savings plans",
          "Emergency preparedness guides"
        ]
      }
    ]
  }
};

function FinancialPlanning() {
  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold text-gray-900">Financial Planning Tools</h3>
      <p className="mt-2 text-gray-600">
        Resources to help secure your financial future in the construction industry:
      </p>

      <div className="space-y-8 mt-6">
        {Object.entries(FINANCIAL_RESOURCES).map(([category, section]) => (
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

                  {resource.tools && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-900">Tools:</p>
                      <ul className="mt-1 text-sm text-gray-600 list-disc list-inside">
                        {resource.tools.map((tool, tIndex) => (
                          <li key={tIndex}>{tool}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {resource.topics && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-900">Topics Covered:</p>
                      <ul className="mt-1 text-sm text-gray-600 list-disc list-inside">
                        {resource.topics.map((topic, topicIndex) => (
                          <li key={topicIndex}>{topic}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {resource.coverage && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-900">Coverage:</p>
                      <ul className="mt-1 text-sm text-gray-600 list-disc list-inside">
                        {resource.coverage.map((item, cIndex) => (
                          <li key={cIndex}>{item}</li>
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
          <span className="font-medium">Pro Tip:</span> Start planning for your financial future early. Take advantage of employer-matched contributions and tax-advantaged savings options.
        </p>
      </div>
    </div>
  );
}

export default FinancialPlanning; 