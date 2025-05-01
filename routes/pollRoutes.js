import express from 'express';
import { createPoll, getPolls, updatePollVote, updatePoll, deletePoll } from '../controllers/pollController.js';

const router = express.Router();

router.post('/', createPoll);
router.get('/', getPolls);
router.put('/:pollId/vote/:optionIndex', updatePollVote);
router.put('/:pollId', updatePoll); // Fixed the typo here
router.delete('/:pollId', deletePoll);


export default router;