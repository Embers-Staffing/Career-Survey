import React, { useState } from 'react';
import { useSurvey } from '../context/SurveyContext';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import Recommendations from './Recommendations';

function SubmitResponse({ onReset }) {
  const { state } = useSurvey();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');

    try {
      const submissionData = {
        submittedAt: new Date().toISOString(),
        ...state
      };

      const docRef = await addDoc(collection(db, 'responses'), submissionData);
      console.log('Document written with ID:', docRef.id);
      setShowRecommendations(true);
    } catch (error) {
      console.error('Submission error:', error);
      setError(`Failed to submit: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (showRecommendations) {
    return <Recommendations />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Submit Response</h2>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-600 rounded text-sm">
            {error}
          </div>
        )}
        <div className="space-y-4">
          <p className="text-gray-600">
            Please review your responses before submitting. Once submitted, you cannot edit your responses.
          </p>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className={`w-full py-2 px-4 rounded ${
              submitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            {submitting ? 'Submitting...' : 'Submit Response'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubmitResponse; 