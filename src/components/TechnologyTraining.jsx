import React from 'react';

const TECH_RESOURCES = {
  BIM: {
    title: "Building Information Modeling (BIM)",
    description: "Digital representation of physical and functional characteristics of buildings",
    platforms: [
      {
        name: "LinkedIn Learning - Revit Courses",
        url: "https://www.linkedin.com/learning/topics/revit",
        type: "Online Course",
        cost: "Subscription-based",
        features: [
          "Self-paced learning",
          "Industry expert instructors",
          "Practice exercises",
          "Course completion certificates"
        ]
      },
      {
        name: "Autodesk Certified Professional",
        url: "https://www.autodesk.com/certification/all-certifications",
        type: "Certification",
        cost: "$250-500",
        features: [
          "Industry-recognized certification",
          "Exam preparation resources",
          "Digital badge",
          "Professional network access"
        ]
      }
    ]
  },
  drones: {
    title: "Drone Technology",
    description: "Unmanned aerial systems for construction surveying and monitoring",
    platforms: [
      {
        name: "Transport Canada Drone Certification",
        url: "https://tc.canada.ca/en/aviation/drone-safety/getting-drone-pilot-certificate",
        type: "Certification",
        cost: "$10-250",
        features: [
          "Basic or advanced operations certificate",
          "Flight safety training",
          "Regulatory compliance",
          "Required for commercial operations"
        ]
      },
      {
        name: "DJI Enterprise Training",
        url: "https://enterprise.dji.com/training",
        type: "Manufacturer Training",
        cost: "Varies",
        features: [
          "Hardware-specific training",
          "Flight planning",
          "Data collection",
          "Industry applications"
        ]
      }
    ]
  },
  projectManagement: {
    title: "Construction Project Management Software",
    description: "Digital tools for project planning, scheduling, and collaboration",
    platforms: [
      {
        name: "Procore Certification",
        url: "https://www.procore.com/certification",
        type: "Software Certification",
        cost: "Free",
        features: [
          "Project management fundamentals",
          "Software proficiency",
          "Best practices",
          "Industry-recognized certification"
        ]
      },
      {
        name: "PlanGrid Construction Training",
        url: "https://construction.autodesk.com/products/autodesk-plangrid",
        type: "Software Training",
        cost: "Included with subscription",
        features: [
          "Document management",
          "Field collaboration",
          "As-built creation",
          "Mobile app usage"
        ]
      }
    ]
  },
  emergingTech: {
    title: "Emerging Technologies",
    description: "New and upcoming technologies in construction",
    platforms: [
      {
        name: "Construction Technology Academy",
        url: "https://constructech.com/",
        type: "Online Learning",
        cost: "Subscription-based",
        features: [
          "AR/VR applications",
          "IoT in construction",
          "AI and machine learning",
          "Robotics and automation"
        ]
      }
    ]
  }
};

function TechnologyTraining() {
  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold text-gray-900">Technology Training Resources</h3>
      <p className="mt-2 text-gray-600">
        Stay competitive with training in construction technology:
      </p>

      <div className="space-y-8 mt-6">
        {Object.entries(TECH_RESOURCES).map(([key, category]) => (
          <div key={key}>
            <h4 className="font-medium text-lg text-gray-900">{category.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{category.description}</p>

            <div className="grid gap-4 md:grid-cols-2 mt-4">
              {category.platforms.map((platform) => (
                <div key={platform.name} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:text-blue-800"
                    >
                      {platform.name}
                    </a>
                    <span className="text-sm text-gray-500">{platform.cost}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{platform.type}</p>
                  <div className="mt-3">
                    <p className="text-sm font-medium mb-1">Features:</p>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {platform.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
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
          <span className="font-medium">Pro Tip:</span> Many employers offer reimbursement for technology training and certifications. Check with your HR department about available programs.
        </p>
      </div>
    </div>
  );
}

export default TechnologyTraining; 