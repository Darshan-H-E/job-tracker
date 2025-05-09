// server/server.js
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // Allow requests from frontend (different port)
app.use(express.json()); // To parse JSON request bodies

// In-memory store for jobs
let jobs = [
  { id: uuidv4(), customerName: 'Alice Wonderland', description: 'AC unit not cooling', status: 'Not Yet Started' },
  { id: uuidv4(), customerName: 'Bob The Builder', description: 'Furnace making strange noises', status: 'In Progress' },
  { id: uuidv4(), customerName: 'Charlie Brown', description: 'Thermostat replacement', status: 'Completed' },
];

const STATUSES = ["Not Yet Started", "In Progress", "Completed"];

// GET all jobs
app.get('/api/jobs', (req, res) => {
  res.json(jobs);
});

// POST a new job
app.post('/api/jobs', (req, res) => {
  const { customerName, description } = req.body;

  if (!customerName || !description) {
    return res.status(400).json({ error: 'Customer name and description are required' });
  }

  const newJob = {
    id: uuidv4(),
    customerName,
    description,
    status: 'Not Yet Started', // Default status
  };
  jobs.push(newJob);
  console.log('Job created:', newJob);
  res.status(201).json(newJob);
});

// PUT (update) a job's status
app.put('/api/jobs/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Invalid status provided' });
  }

  const jobIndex = jobs.findIndex(job => job.id === id);

  if (jobIndex === -1) {
    return res.status(404).json({ error: 'Job not found' });
  }

  jobs[jobIndex].status = status;
  console.log('Job status updated:', jobs[jobIndex]);
  res.json(jobs[jobIndex]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
