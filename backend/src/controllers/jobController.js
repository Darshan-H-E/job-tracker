import * as JobModel from '../models/jobModel.js'; // Note the .js extension

export const getAllJobs = (req, res) => {
  try {
    const jobs = JobModel.findAllJobs();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve jobs', message: error.message });
  }
};

export const createJob = (req, res) => {
  try {
    const { jobTitle, customerName, description } = req.body;
    if (!jobTitle || !customerName || !description) {
      return res.status(400).json({ error: 'Job title, customer name, and description are required' });
    }
    const newJob = JobModel.createNewJob({ jobTitle, customerName, description });
    console.log('Job created:', newJob);
    res.status(201).json(newJob);
  } catch (error) {
    // Distinguish between client errors (e.g., missing fields handled above) and server errors
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'Failed to create job', message: error.message });
  }
};

export const updateJobStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !JobModel.STATUSES.includes(status)) {
      return res.status(400).json({ error: 'Invalid status provided' });
    }

    const updatedJob = JobModel.updateJobStatusById(id, status);

    if (!updatedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }
    console.log('Job status updated:', updatedJob);
    res.json(updatedJob);
  } catch (error) {
    console.error('Error updating job status:', error);
    res.status(500).json({ error: 'Failed to update job status', message: error.message });
  }
};

