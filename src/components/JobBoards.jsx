import React from 'react';

const JOB_BOARDS = {
  general: [
    {
      name: "BuildForce Canada Job Bank",
      url: "https://www.buildforce.ca/en/jobs",
      description: "Construction-specific jobs across Canada",
      icon: "🏗️"
    },
    {
      name: "EllisDon Careers",
      url: "https://www.ellisdon.com/careers/",
      description: "One of Canada's largest construction companies",
      icon: "🏢"
    },
    {
      name: "PCL Careers",
      url: "https://careers.pcl.com/",
      description: "Major construction and contracting company",
      icon: "🏗️"
    }
  ],
  specialized: [
    {
      name: "Canadian Construction Women",
      url: "https://www.cawic.ca/jobs/",
      description: "Jobs and opportunities for women in construction",
      icon: "👷‍♀️"
    },
    {
      name: "Skilled Trades BC",
      url: "https://skilledtradesbc.ca/jobs",
      description: "Trades-specific positions in British Columbia",
      icon: "🔧"
    }
  ],
  government: [
    {
      name: "Government of Canada Job Bank",
      url: "https://www.jobbank.gc.ca/construction",
      description: "Federal government construction job listings",
      icon: "🍁"
    }
  ]
};

function JobBoards() {
  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold text-gray-900">Industry Job Boards</h3>
      <p className="mt-2 text-gray-600">
        Explore construction career opportunities on these trusted platforms:
      </p>

      {Object.entries(JOB_BOARDS).map(([category, boards]) => (
        <div key={category} className="mt-6">
          <h4 className="font-medium text-lg capitalize mb-3">
            {category} Job Boards
          </h4>
          <div className="grid gap-4 md:grid-cols-2">
            {boards.map((board) => (
              <a
                key={board.name}
                href={board.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border rounded-lg hover:border-blue-500 transition-colors duration-200"
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{board.icon}</span>
                  <div>
                    <h5 className="font-medium text-blue-600 hover:text-blue-800">
                      {board.name}
                    </h5>
                    <p className="text-sm text-gray-600 mt-1">
                      {board.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          💡 <span className="font-medium">Pro Tip:</span> Set up job alerts on these platforms to get notified about new opportunities that match your skills and preferences.
        </p>
      </div>
    </div>
  );
}

export default JobBoards; 