import React from 'react';

const CAREER_TOOLS = {
  resumeResources: {
    title: "Resume & Portfolio Tools",
    description: "Build a compelling professional profile",
    tools: [
      {
        name: "Construction Resume Builder",
        url: "https://www.constructionresumebuilder.ca",
        type: "Resume Template",
        features: [
          "Industry-specific templates",
          "Skills highlighting",
          "Project showcase section",
          "Certification emphasis"
        ],
        tips: "Focus on quantifiable achievements and specific project details"
      },
      {
        name: "Digital Portfolio Platform",
        url: "https://www.constructionportfolio.com",
        type: "Portfolio Builder",
        features: [
          "Project galleries",
          "Before/after showcases",
          "Safety record display",
          "Certification badges"
        ],
        tips: "Include high-quality project photos and detailed descriptions"
      }
    ]
  },
  interviewPrep: {
    title: "Interview Preparation",
    description: "Prepare for construction industry interviews",
    tools: [
      {
        name: "Construction Interview Guide",
        url: "https://www.constructioninterviewguide.ca",
        type: "Interview Resource",
        features: [
          "Common interview questions",
          "Scenario-based responses",
          "Technical question preparation",
          "Safety knowledge assessment"
        ],
        tips: "Practice explaining your problem-solving approach with specific examples"
      },
      {
        name: "Salary Negotiation Tools",
        url: "https://www.constructionpay.ca",
        type: "Negotiation Resource",
        features: [
          "Industry salary data",
          "Benefits comparison",
          "Negotiation scripts",
          "Market rate analysis"
        ],
        tips: "Research local market rates and highlight your certifications"
      }
    ]
  },
  skillAssessment: {
    title: "Skill Assessment Tools",
    description: "Evaluate and track your professional development",
    tools: [
      {
        name: "Construction Skills Matrix",
        url: "https://www.constructionskills.ca",
        type: "Assessment Tool",
        features: [
          "Self-assessment templates",
          "Skill gap analysis",
          "Development planning",
          "Progress tracking"
        ],
        tips: "Update your assessment quarterly to track progress"
      },
      {
        name: "Technical Skills Evaluator",
        url: "https://www.techskills.construction",
        type: "Technical Assessment",
        features: [
          "Trade-specific assessments",
          "Equipment operation checklists",
          "Safety knowledge tests",
          "Digital competency evaluation"
        ],
        tips: "Use results to identify areas for additional training"
      }
    ]
  },
  networking: {
    title: "Professional Networking",
    description: "Build and maintain professional connections",
    tools: [
      {
        name: "Construction Network Hub",
        url: "https://www.constructionnetwork.ca",
        type: "Networking Platform",
        features: [
          "Industry events calendar",
          "Professional groups",
          "Project showcases",
          "Job notifications"
        ],
        tips: "Regularly engage with industry content and discussions"
      }
    ]
  }
};

function CareerTools() {
  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold text-gray-900">Career Development Tools</h3>
      <p className="mt-2 text-gray-600">
        Essential resources to help you build and advance your construction career:
      </p>

      <div className="space-y-8 mt-6">
        {Object.entries(CAREER_TOOLS).map(([category, section]) => (
          <div key={category}>
            <h4 className="font-medium text-lg text-gray-900">{section.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{section.description}</p>

            <div className="grid gap-4 md:grid-cols-2 mt-4">
              {section.tools.map((tool) => (
                <div key={tool.name} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:text-blue-800"
                    >
                      {tool.name}
                    </a>
                    <span className="text-sm text-gray-500">{tool.type}</span>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-medium mb-1">Key Features:</p>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {tool.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">Tip:</span> {tool.tips}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Pro Tip:</span> Keep your professional materials updated and tailored to your target role. Regular updates to your portfolio and skills assessment will help track your career progression.
        </p>
      </div>
    </div>
  );
}

export default CareerTools; 