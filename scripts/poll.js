import mongoose from 'mongoose';
import Poll from './../models/Poll.js';  // Adjust the path as needed
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    // Define some predefined polls
    const predefinedPolls = [
        {
            title: 'Favorite Color',
            pollName: 'Sidebar',
            options: [
                { text: 'Red', index: 0 },
                { text: 'Blue', index: 1 },
                { text: 'Green', index: 2 }
            ]
        },
        {
            title: 'Coding Language',
            pollName: 'Hero1',
            options: [
                { text: 'JavaScript', index: 0 },
                { text: 'Python', index: 1 },
                { text: 'Java', index: 2 }
            ]
        },
        {
            title: 'Best Season',
            pollName: 'Hero2',
            options: [
                { text: 'Spring', index: 0 },
                { text: 'Summer', index: 1 },
                { text: 'Autumn', index: 2 },
            ]
        },
        {
            title: 'Favorite Food',
            pollName: 'Hero3',
            options: [
                { text: 'Pizza', index: 0 },
                { text: 'Burger', index: 1 },
                { text: 'Pasta', index: 2 },
            ]
        }
    ];

    // Delete existing polls
    await Poll.deleteMany({});

    // Insert predefined polls
    for (const pollData of predefinedPolls) {
        const poll = new Poll(pollData);
        await poll.save();
    }

    console.log('Predefined polls added');
    mongoose.disconnect();
}).catch(err => {
    console.error(err);
    mongoose.disconnect();
});
