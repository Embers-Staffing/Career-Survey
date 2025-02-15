import { BrowserRouter as Router } from 'react-router-dom';
import { SurveyProvider } from './context/SurveyContext';
import SurveyForm from './components/SurveyForm';

function App() {
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