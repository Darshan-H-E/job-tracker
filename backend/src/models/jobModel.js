import { v4 as uuidv4 } from 'uuid';

// In-memory store for jobs
let jobs = [
  { id: uuidv4(), jobTitle: 'AC Maintenance', customerName: 'Alice Wonderland', description: 'AC unit not cooling, perform annual check.', status: 'Not Yet Started' },
  { id: uuidv4(), jobTitle: 'Furnace Repair', customerName: 'Bob The Builder', description: 'Furnace making strange noises, suspect igniter issue.', status: 'In Progress' },
  { id: uuidv4(), jobTitle: 'Thermostat Upgrade', customerName: 'Charlie Brown', description: 'Replace old thermostat with a smart one.', status: 'Completed' },
];

export const STATUSES = ["Not Yet Started", "In Progress", "Completed"];

export const findAllJobs = () => {
  return jobs;
};

export const findJobById = (id) => {
  return jobs.find(job => job.id === id);
};

export const createNewJob = (jobData) => {
  const { jobTitle, customerName, description } = jobData;
  if (!jobTitle || !customerName || !description) {
    throw new Error('Job title, customer name, and description are required for creation.');
  }
  const newJob = {
    id: uuidv4(),
    jobTitle,
    customerName,
    description,
    status: STATUSES[0],
  };
  jobs.push(newJob);
  return newJob;
};

export const updateJobStatusById = (id, newStatus) => {
  if (!newStatus || !STATUSES.includes(newStatus)) {
    throw new Error('Invalid status provided for update.');
  }
  const jobIndex = jobs.findIndex(job => job.id === id);
  if (jobIndex === -1) {
    return null;
  }
  jobs[jobIndex].status = newStatus;
  return jobs[jobIndex];
};
