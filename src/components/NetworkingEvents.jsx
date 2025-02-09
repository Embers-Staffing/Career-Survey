import React from 'react';

const INDUSTRY_EVENTS = {
  conferences: {
    title: "Industry Conferences",
    description: "Major construction industry gatherings",
    events: [
      {
        name: "Canadian Construction Innovation Forum",
        date: "March 15-17, 2024",
        location: "Vancouver Convention Centre",
        url: "https://www.constructioninnovation.ca/forum2024",
        type: "In-person",
        highlights: [
          "Industry leaders keynotes",
          "Technology showcases",
          "Networking sessions",
          "Innovation awards"
        ],
        registration: {
          deadline: "February 28, 2024",
          cost: "$695 early bird",
          includes: [
            "Conference materials",
            "Networking events",
            "Lunch and refreshments",
            "Digital resources access"
          ]
        }
      },
      {
        name: "Construction Technology Summit",
        date: "June 8-10, 2024",
        location: "Virtual Event",
        url: "https://www.constructiontech.ca/summit2024",
        type: "Virtual",
        highlights: [
          "Digital transformation trends",
          "Virtual networking rooms",
          "Online exhibitions",
          "On-demand content"
        ]
      }
    ]
  },
  tradeshows: {
    title: "Trade Shows & Exhibitions",
    description: "Equipment and technology exhibitions",
    events: [
      {
        name: "BuildEx Vancouver",
        date: "February 7-8, 2024",
        location: "Vancouver Convention Centre",
        url: "https://www.buildexvancouver.com",
        type: "In-person",
        highlights: [
          "Product demonstrations",
          "Industry suppliers",
          "Educational seminars",
          "Career opportunities"
        ],
        registration: {
          deadline: "January 31, 2024",
          cost: "$25 pre-registration",
          includes: [
            "Exhibition access",
            "Seminar attendance",
            "Industry meetups",
            "Show directory"
          ]
        }
      }
    ]
  },
  workshops: {
    title: "Professional Development Workshops",
    description: "Focused skill-building sessions",
    events: [
      {
        name: "Leadership Development Series",
        date: "Monthly - First Thursday",
        location: "Various Locations + Virtual",
        url: "https://www.constructionleadership.ca/workshops",
        type: "Hybrid",
        highlights: [
          "Interactive sessions",
          "Case studies",
          "Peer learning",
          "Mentorship opportunities"
        ],
        registration: {
          cost: "$195 per session",
          includes: [
            "Workshop materials",
            "Networking lunch",
            "Certificate of completion",
            "Follow-up resources"
          ]
        }
      }
    ]
  },
  networking: {
    title: "Networking Meetups",
    description: "Industry networking opportunities",
    events: [
      {
        name: "Construction Professionals Network",
        date: "Quarterly",
        location: "Major Canadian Cities",
        url: "https://www.constructionnetwork.ca/events",
        type: "In-person",
        highlights: [
          "Industry discussions",
          "Career opportunities",
          "Informal networking",
          "Professional connections"
        ],
        registration: {
          cost: "Free for members",
          includes: [
            "Networking session",
            "Light refreshments",
            "Industry updates",
            "Member directory access"
          ]
        }
      }
    ]
  }
};

function NetworkingEvents() {
  return (
    <div id="industry-events" className="mt-8 bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold text-gray-900">Industry Events Calendar</h3>
      <p className="mt-2 text-gray-600">
        Upcoming networking and professional development opportunities:
      </p>

      <div className="space-y-8 mt-6">
        {Object.entries(INDUSTRY_EVENTS).map(([category, section]) => (
          <div key={category} className="border rounded-lg p-6">
            <h4 className="text-lg font-medium text-gray-900">{section.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{section.description}</p>

            <div className="grid gap-4 md:grid-cols-2 mt-4">
              {section.events.map((event, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:text-blue-800"
                    >
                      {event.name}
                    </a>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      {event.type}
                    </span>
                  </div>

                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Date:</span> {event.date}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Location:</span> {event.location}
                    </p>
                  </div>

                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-900">Event Highlights:</p>
                    <ul className="mt-1 text-sm text-gray-600 list-disc list-inside">
                      {event.highlights.map((highlight, hIndex) => (
                        <li key={hIndex}>{highlight}</li>
                      ))}
                    </ul>
                  </div>

                  {event.registration && (
                    <div className="mt-3 p-3 bg-white rounded border">
                      <p className="text-sm font-medium text-gray-900">Registration Details:</p>
                      <p className="text-sm text-gray-600">Cost: {event.registration.cost}</p>
                      {event.registration.deadline && (
                        <p className="text-sm text-gray-600">
                          Deadline: {event.registration.deadline}
                        </p>
                      )}
                      <div className="mt-2">
                        <p className="text-sm font-medium">Includes:</p>
                        <ul className="mt-1 text-sm text-gray-600 list-disc list-inside">
                          {event.registration.includes.map((item, iIndex) => (
                            <li key={iIndex}>{item}</li>
                          ))}
                        </ul>
                      </div>
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
          <span className="font-medium">Pro Tip:</span> Many events offer early bird discounts and student rates. Plan ahead and register early to secure the best rates and ensure your spot.
        </p>
      </div>
    </div>
  );
}

export default NetworkingEvents; 