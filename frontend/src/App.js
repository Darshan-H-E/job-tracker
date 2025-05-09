import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import KanbanBoard from './components/KanbanBoard';
import CreateJobPage from './pages/CreateJobPage';
import './App.css';

const API_URL = '/api/jobs';

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(API_URL);
      setJobs(response.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError('Failed to load jobs. Ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleJobCreated = (newJob) => {
    setJobs(prevJobs => [...prevJobs, newJob]);
  };

  const handleJobStatusChange = async (jobId, newStatus) => {
    const originalJobs = [...jobs];
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );
    try {
      await axios.put(`${API_URL}/${jobId}/status`, { status: newStatus });
    } catch (err) {
      console.error('Error updating job status:', err);
      setError(`Failed to update job ${jobId}. Reverting.`);
      setJobs(originalJobs);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>HVAC Job Tracker</h1>
        <Link to="/create-job" className="create-job-button">
          <span className="material-icons">add_circle_outline</span> Create New Job
        </Link>
      </header>
      
      {loading && <p>Loading jobs...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <main>
        <Routes>
          <Route 
            path="/" 
            element={
              !loading && !error && (
                <KanbanBoard jobs={jobs} onJobStatusChange={handleJobStatusChange} />
              )
            } 
          />
          <Route 
            path="/create-job" 
            element={<CreateJobPage onJobCreated={handleJobCreated} />} 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
