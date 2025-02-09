import React from 'react';

const SUCCESS_STORIES = {
  management: [
    {
      title: "From Apprentice to Project Manager",
      timeline: "5 years",
      background: "Started as an electrical apprentice with basic certifications",
      keySteps: [
        "Completed Red Seal certification in 2 years",
        "Took evening project management courses",
        "Participated in mentorship program",
        "Earned Gold Seal certification"
      ],
      challenges: [
        "Balancing work and education",
        "Building leadership skills",
        "Learning business aspects"
      ],
      advice: "Focus on both technical skills and soft skills. Take advantage of every learning opportunity, even if it seems small.",
      outcome: "Now managing multi-million dollar projects and mentoring new professionals"
    },
    {
      title: "Safety Specialist Success",
      timeline: "4 years",
      background: "Began as a general laborer with safety interests",
      keySteps: [
        "Obtained safety certifications",
        "Volunteered for safety committee",
        "Completed OHS diploma program",
        "Achieved CRSP designation"
      ],
      challenges: [
        "Developing communication skills",
        "Building credibility",
        "Managing resistance to change"
      ],
      advice: "Start with small improvements and build trust. Document everything and learn from incidents.",
      outcome: "Currently Head of Safety for a major construction company"
    }
  ],
  technical: [
    {
      title: "Technology Innovation Leader",
      timeline: "6 years",
      background: "Started in traditional construction methods",
      keySteps: [
        "Learned BIM software independently",
        "Led pilot projects with new technology",
        "Obtained digital construction certifications",
        "Developed training programs"
      ],
      challenges: [
        "Overcoming technology resistance",
        "Keeping up with rapid changes",
        "Implementing new systems"
      ],
      advice: "Stay curious and be willing to experiment. Share knowledge and help others adapt to new technologies.",
      outcome: "Now leading digital transformation initiatives across multiple projects"
    }
  ],
  entrepreneurial: [
    {
      title: "Successful Specialty Contractor",
      timeline: "8 years",
      background: "Began as a skilled tradesperson",
      keySteps: [
        "Mastered trade skills",
        "Took business management courses",
        "Built industry network",
        "Started small projects independently"
      ],
      challenges: [
        "Securing initial contracts",
        "Managing business growth",
        "Building a reliable team"
      ],
      advice: "Build strong relationships and maintain high quality standards. Start small and grow sustainably.",
      outcome: "Owns a successful specialty contracting company with 30+ employees"
    }
  ]
};

function SuccessStories() {
  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold text-gray-900">Success Stories</h3>
      <p className="mt-2 text-gray-600">
        Real career journeys from construction professionals:
      </p>

      <div className="space-y-8 mt-6">
        {Object.entries(SUCCESS_STORIES).map(([category, stories]) => (
          <div key={category} className="space-y-6">
            {stories.map((story, index) => (
              <div key={index} className="border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{story.title}</h4>
                    <p className="text-sm text-gray-600">Timeline: {story.timeline}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {category.charAt(0).toUpperCase() + category.slice(1)} Path
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-gray-900">Background</h5>
                    <p className="text-sm text-gray-600 mt-1">{story.background}</p>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900">Key Steps</h5>
                    <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                      {story.keySteps.map((step, stepIndex) => (
                        <li key={stepIndex}>{step}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900">Challenges Overcome</h5>
                    <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                      {story.challenges.map((challenge, challengeIndex) => (
                        <li key={challengeIndex}>{challenge}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900">Professional Advice</h5>
                    <p className="text-sm text-gray-600 mt-1">{story.advice}</p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <h5 className="font-medium text-green-900">Outcome</h5>
                    <p className="text-sm text-green-800 mt-1">{story.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Pro Tip:</span> Learn from others' experiences and adapt their strategies to your own career journey. Success often follows similar patterns.
        </p>
      </div>
    </div>
  );
}

export default SuccessStories; 