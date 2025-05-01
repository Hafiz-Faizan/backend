import Poll from '../models/Poll.js';

export const createPoll = async (req, res) => {
    try {
        const { title, pollName, options } = req.body;
        const pollOptions = options.map((option, index) => ({
            text: option.text,
            votes: 0,
            index
        }));
        console.log('poll', req.body);
        const poll = new Poll({ title, pollName, options: pollOptions });
        await poll.save();
        res.status(201).json(poll);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getPolls = async (req, res) => {
    try {
        const polls = await Poll.find();
        res.json(polls);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePollVote = async (req, res) => {
    try {
        const { pollId, optionIndex } = req.params;


        // Find the poll and increment the vote count for the specified option
        const updatedPoll = await Poll.findOneAndUpdate(
            { _id: pollId, 'options.index': optionIndex },
            { $inc: { 'options.$.votes': 1 } },
            { new: true }
        );

        if (!updatedPoll) {
            return res.status(404).json({ message: "Poll not found or invalid option index" });
        }

        res.json(updatedPoll);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updatePoll = async (req, res) => {
    try {
        const { pollId } = req.params;
        const { title, options } = req.body;

        console.log('Received update request:', { pollId, title, options });

        // Ensure options have index values
        const updatedOptions = options.map((option, index) => ({
            ...option,
            index
        }));

        console.log('Updated options with indices:', updatedOptions);

        const updatedPoll = await Poll.findByIdAndUpdate(
            pollId,
            { title, options: updatedOptions },
            { new: true }
        );
        console.log('Updated poll result:', updatedPoll);

        if (!updatedPoll) {
            return res.status(404).json({ message: "Poll not found" });
        }

        res.json(updatedPoll);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// In pollController.js
export const deletePoll = async (req, res) => {
    try {
        const { pollId } = req.params;
        const deletedPoll = await Poll.findByIdAndDelete(pollId);
        if (!deletedPoll) {
            return res.status(404).json({ message: "Poll not found" });
        }
        res.json({ message: "Poll deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
