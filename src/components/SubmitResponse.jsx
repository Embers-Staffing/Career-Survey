import React, { useState } from 'react';
import { useSurvey } from '../context/SurveyContext';
import { db, auth } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

function SubmitResponse({ onReset }) {
  const { state } = useSurvey();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');

    try {
      const response = {
        ...state,
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        submittedAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'responses'), response);
      setSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      setError('Failed to submit response. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your response has been successfully submitted.
          </p>
          <button
            onClick={onReset}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Start New Survey
          </button>
        </div>
      </div>
    );
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