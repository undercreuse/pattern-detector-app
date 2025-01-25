import React from 'react';
import PatternDetector from './components/PatternDetector';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <h1 className="max-w-7xl mx-auto py-6 px-4 text-3xl font-bold text-gray-900">
          Pattern Detector
        </h1>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <PatternDetector />
      </main>
    </div>
  );
}

export default App;