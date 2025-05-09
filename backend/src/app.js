// server/src/app.js
import express from 'express';
import cors from 'cors';
import path from 'path'; // Node.js path module
import { fileURLToPath } from 'url'; // To work with __dirname in ES modules

import jobRoutes from './routes/jobRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve Static Files from React Build
const clientBuildPath = path.join(__dirname, '..', '..', 'frontend', 'build');
app.use(express.static(clientBuildPath));

app.use('/api/jobs', jobRoutes);

// Catch-all for Client-Side Routing
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Simple error handler (can be expanded)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;
