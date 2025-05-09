import express from 'express';
import * as JobController from '../controllers/jobController.js'; // Note the .js extension

const router = express.Router();

router.get('/', JobController.getAllJobs);
router.post('/', JobController.createJob);
router.put('/:id/status', JobController.updateJobStatus);

export default router;
