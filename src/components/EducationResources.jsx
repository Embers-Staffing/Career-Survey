import React, { useState } from 'react';
import { EDUCATION_RESOURCES } from '../data/educationResources';

function EducationResources() {
  const [selectedProvince, setSelectedProvince] = useState('britishColumbia');

  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold text-gray-900">Education & Funding Resources</h3>
      
      {/* Province Selector */}
      <div className="mt-4">
        <select 
          value={selectedProvince}
          onChange={(e) => setSelectedProvince(e.target.value)}
          className="w-full md:w-auto p-2 border rounded-md"
        >
          <option value="britishColumbia">British Columbia</option>
          <option value="alberta">Alberta</option>
          <option value="manitoba">Manitoba</option>
        </select>
      </div>

      {/* Programs */}
      <div className="mt-6">
        <h4 className="font-medium text-lg">Available Programs</h4>
        {EDUCATION_RESOURCES[selectedProvince].trades.map((institution) => (
          <div key={institution.name} className="mt-4">
            <h5 className="font-medium">{institution.institution}</h5>
            <div className="grid gap-4 md:grid-cols-2 mt-2">
              {institution.programs.map((program) => (
                <div key={program.name} className="border rounded-lg p-4">
                  <a 
                    href={program.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {program.name}
                  </a>
                  <p className="text-sm text-gray-600 mt-1">Duration: {program.duration}</p>
                  <p className="text-sm text-gray-600">Credential: {program.credentials}</p>
                  {program.funding && (
                    <div className="mt-2">
                      <p className="text-sm font-medium">Available Funding:</p>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {program.funding.map((fund) => (
                          <li key={fund}>{fund}</li>
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

      {/* Funding Options */}
      <div className="mt-8">
        <h4 className="font-medium text-lg">Funding Options</h4>
        <div className="grid gap-4 md:grid-cols-2 mt-4">
          {EDUCATION_RESOURCES[selectedProvince].funding.government.map((fund) => (
            <div key={fund.name} className="border rounded-lg p-4">
              <a 
                href={fund.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {fund.name}
              </a>
              {fund.amount && (
                <p className="text-sm text-gray-600 mt-1">Amount: {fund.amount}</p>
              )}
              {fund.eligibility && (
                <p className="text-sm text-gray-600">
                  Eligibility: {fund.eligibility}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Federal Resources */}
      <div className="mt-8">
        <h4 className="font-medium text-lg">Federal Resources</h4>
        <div className="grid gap-4 md:grid-cols-2 mt-4">
          {EDUCATION_RESOURCES.federal.grants.map((grant) => (
            <div key={grant.name} className="border rounded-lg p-4">
              <a 
                href={grant.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {grant.name}
              </a>
              <p className="text-sm text-gray-600 mt-1">Amount: {grant.amount}</p>
              {grant.eligibility && (
                <p className="text-sm text-gray-600">
                  Eligibility: {grant.eligibility}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EducationResources; 