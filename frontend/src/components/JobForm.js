import React, { useState } from 'react';
import axios from 'axios';

const API_URL_LOCAL = '/api/jobs';

function JobForm({ onJobCreated }) {
  const [jobTitle, setJobTitle] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!jobTitle.trim() || !customerName.trim() || !description.trim()) {
      setError('Job title, customer name, and description are required.');
      return;
    }
    try {
      const response = await axios.post(API_URL_LOCAL, { jobTitle, customerName, description });
      onJobCreated(response.data);
    } catch (err) {
      console.error('Error creating job:', err);
      setError('Failed to create job. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      <h2>Create New Job</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor="jobTitle">Job Title:</label>
        <input
          type="text"
          id="jobTitle"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="customerName">Customer Name:</label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create Job</button>
    </form>
  );
}

export default JobForm;
