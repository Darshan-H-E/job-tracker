import React from 'react';
import { useNavigate } from 'react-router-dom';
import JobForm from '../components/JobForm';
import './CreateJobPage.css';

const CreateJobPage = ({ onJobCreated }) => {
  const navigate = useNavigate();

  const handleJobCreatedAndNavigate = (newJob) => {
    onJobCreated(newJob);
    navigate('/');
  };

  return (
    <div className="create-job-page">
      <JobForm onJobCreated={handleJobCreatedAndNavigate} />
      <button onClick={() => navigate(-1)} className="back-button">
        Back to Board
      </button>
    </div>
  );
};

export default CreateJobPage;
