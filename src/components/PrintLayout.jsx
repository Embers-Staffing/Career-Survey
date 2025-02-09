import React from 'react';

function PrintLayout({ data, recommendations }) {
  return (
    <div className="print-document">
      {/* Header */}
      <header className="print-header">
        <img 
          src="/embers-logo.png" 
          alt="Embers Staffing" 
          className="print-logo"
          style={{
            width: '200px',
            marginBottom: '20px',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        />
        <h1>Construction Career Recommendations</h1>
        <div className="print-date">Generated on: {new Date().toLocaleDateString()}</div>
      </header>

      {/* Personal Summary */}
      <section className="print-section">
        <h2>Career Profile</h2>
        <div className="profile-grid">
          <div className="profile-item">
            <h3>Experience Level</h3>
            <p>{data.personalInfo?.yearsInConstruction || 0} Years in Construction</p>
          </div>
          <div className="profile-item">
            <h3>Career Goal</h3>
            <p>{data.goals?.shortTerm?.[0] || 'Not specified'}</p>
          </div>
          <div className="profile-item">
            <h3>Target Salary</h3>
            <p>${recommendations.calculateSalaryRanges()}/year</p>
          </div>
        </div>
      </section>

      {/* Career Path */}
      <section className="print-section">
        <h2>Recommended Career Path</h2>
        <div className="career-progression">
          {recommendations.getCareerPaths()[0]?.steps.map((step, index) => (
            <div key={index} className="progression-step">
              <div className="step-marker">{index + 1}</div>
              <div className="step-content">
                <h4>{step}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Priority Actions */}
      <section className="print-section">
        <h2>Priority Actions</h2>
        <div className="actions-grid">
          {recommendations.getRecommendedCertifications()
            .filter(cert => cert.priority === 'High')
            .map((cert, index) => (
              <div key={index} className="action-item">
                <h4>{cert.name}</h4>
                <p>{cert.description}</p>
                <div className="action-details">
                  <span>Timeline: {cert.timeline}</span>
                  <span>Cost: {cert.cost}</span>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Development Timeline */}
      <section className="print-section">
        <h2>Development Timeline</h2>
        <div className="timeline-container">
          <div className="timeline-phase">
            <h3>Immediate (0-3 months)</h3>
            <ul>
              {recommendations.getRecommendedCertifications()
                .filter(cert => cert.priority === 'High')
                .slice(0, 2)
                .map((cert, index) => (
                  <li key={index}>{cert.name}</li>
                ))}
            </ul>
          </div>
          <div className="timeline-phase">
            <h3>Short-term (3-6 months)</h3>
            <ul>
              {recommendations.getRecommendedCertifications()
                .filter(cert => cert.priority === 'High')
                .slice(2)
                .map((cert, index) => (
                  <li key={index}>{cert.name}</li>
                ))}
            </ul>
          </div>
          <div className="timeline-phase">
            <h3>Medium-term (6-12 months)</h3>
            <ul>
              {recommendations.getRecommendedCertifications()
                .filter(cert => cert.priority === 'Medium')
                .map((cert, index) => (
                  <li key={index}>{cert.name}</li>
                ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="print-footer">
        <p>© Embers Staffing Solutions</p>
        <p>This personalized career plan is based on your assessment responses</p>
      </footer>
    </div>
  );
}

export default PrintLayout; 