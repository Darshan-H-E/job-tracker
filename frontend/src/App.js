import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobForm from './components/JobForm';
import KanbanBoard from './components/KanbanBoard';
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
      <h1 id="page-title">HVAC Job Tracker</h1>
      <JobForm onJobCreated={handleJobCreated} />
      
      {loading && <p>Loading jobs...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {!loading && !error && (
        <KanbanBoard jobs={jobs} onJobStatusChange={handleJobStatusChange} />
      )}
    </div>
  );
}

export default App;
