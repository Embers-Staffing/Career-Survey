import { BrowserRouter as Router } from 'react-router-dom';
import { SurveyProvider } from './context/SurveyContext';
import Auth from './components/Auth';
import SurveyForm from './components/SurveyForm';

function App() {
  return (
    <SurveyProvider>
      <Router>
        <Auth>
          <div className="min-h-screen bg-gray-100">
            <SurveyForm />
          </div>
        </Auth>
      </Router>
    </SurveyProvider>
  );
}

export default App; 