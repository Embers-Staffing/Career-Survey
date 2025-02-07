import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import { SurveyProvider } from './context/SurveyContext';
import SurveyForm from './components/SurveyForm';

function App() {
  useEffect(() => {
    netlifyIdentity.init();
  }, []);

  return (
    <SurveyProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <SurveyForm />
        </div>
      </Router>
    </SurveyProvider>
  );
}

export default App; 