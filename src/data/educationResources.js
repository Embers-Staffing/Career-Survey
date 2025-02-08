export const EDUCATION_RESOURCES = {
  britishColumbia: {
    trades: [
      {
        institution: "BCIT",
        programs: [
          {
            name: "Construction Management Degree",
            link: "https://www.bcit.ca/programs/construction-management-bachelor-of-construction-management-full-time-8630bconm/",
            duration: "4 years",
            credentials: "Bachelor's Degree",
            funding: [
              "StudentAid BC",
              "BC Access Grant",
              "BCIT Entrance Awards"
            ]
          },
          {
            name: "Carpentry Apprenticeship",
            link: "https://www.bcit.ca/programs/carpentry-apprenticeship-steel-wood-frame-construction-apprenticeship/",
            duration: "4 levels",
            credentials: "Red Seal",
            funding: [
              "BC Apprenticeship Grant",
              "Canada Apprentice Loan"
            ]
          }
        ]
      },
      {
        institution: "Vancouver Island University",
        programs: [/* Programs */]
      }
    ],
    funding: {
      government: [
        {
          name: "BC Access Grant",
          link: "https://studentaidbc.ca/grants-loans/grants-bursaries/bc-access-grant",
          amount: "Up to $4,000 per year",
          eligibility: "Low to middle income students"
        },
        {
          name: "BC Apprenticeship Services Grant",
          link: "https://www.workbc.ca/employer-resources/funding-and-programs/bc-apprenticeship-services",
          amount: "Up to $5,000",
          eligibility: "Employers hiring apprentices"
        }
      ],
      studentLoans: [
        {
          name: "StudentAid BC",
          link: "https://studentaidbc.ca/",
          description: "Provincial and federal student loans",
          features: [
            "Interest-free while in school",
            "Repayment assistance programs",
            "Grants available"
          ]
        }
      ]
    }
  },

  alberta: {
    trades: [
      {
        institution: "SAIT",
        programs: [
          {
            name: "Bachelor of Construction Project Management",
            link: "https://www.sait.ca/programs-and-courses/degrees/bachelor-of-construction-project-management",
            duration: "4 years",
            credentials: "Bachelor's Degree",
            funding: [
              "Alberta Student Aid",
              "SAIT Awards"
            ]
          }
        ]
      },
      {
        institution: "NAIT",
        programs: [/* Programs */]
      }
    ],
    funding: {
      government: [
        {
          name: "Alberta Student Grant",
          link: "https://studentaid.alberta.ca/grants/",
          amount: "Up to $375 per month",
          eligibility: "Full-time students with financial need"
        },
        {
          name: "Apprenticeship Training Award",
          link: "https://tradesecrets.alberta.ca/financial-assistance/grants/",
          amount: "$1,000",
          eligibility: "Apprentices in technical training"
        }
      ]
    }
  },

  manitoba: {
    trades: [
      {
        institution: "Red River College Polytechnic",
        programs: [
          {
            name: "Construction Management Degree",
            link: "https://www.rrc.ca/construction/",
            duration: "4 years",
            credentials: "Bachelor's Degree"
          }
        ]
      }
    ],
    funding: {
      government: [
        {
          name: "Manitoba Student Aid",
          link: "https://www.edu.gov.mb.ca/msa/",
          description: "Grants and loans for Manitoba students"
        },
        {
          name: "ACCESS Bursary Program",
          link: "https://www.edu.gov.mb.ca/msa/access-program.html",
          eligibility: "Indigenous students, newcomers, and single parents"
        }
      ]
    }
  },

  federal: {
    grants: [
      {
        name: "Canada Student Grant",
        link: "https://www.canada.ca/en/services/benefits/education/student-aid/grants-loans.html",
        amount: "Up to $6,000 per year",
        type: "Need-based"
      },
      {
        name: "Apprenticeship Incentive Grant",
        link: "https://www.canada.ca/en/employment-social-development/services/apprentices/grants.html",
        amount: "$1,000 per year, up to $2,000",
        eligibility: "Registered apprentices"
      }
    ],
    loans: [
      {
        name: "Canada Apprentice Loan",
        link: "https://www.canada.ca/en/employment-social-development/services/apprentices/loan.html",
        amount: "Up to $4,000 per period",
        features: [
          "Interest-free until training completion",
          "No payments while in training"
        ]
      }
    ],
    taxCredits: [
      {
        name: "Tradesperson's Tools Deduction",
        description: "Deduct costs of eligible tools",
        maxAmount: "$500"
      }
    ]
  }
}; 