const res = require('express/lib/resonse');
const { Thought } = require('../models');

// getAllThoughts,
// getThoughtById,
// createThought,
// updateThought,
// deleteThought,
// addReaction,
// deleteReaction

const thoughtController = {

    getAllThoughts(req, res) {
        User.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
            .then(dbThoughtsData => res.json(dbThoughtsData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
        }   );
    },

    getThoughtById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({ 
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    createThought({ body }, res) {
        User.create(body)
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => res.status(400).json(err));
    },

    updateThought({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {new: true, runValidators: true })
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteThought({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err));
    },

    addReaction({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            {$push: { friends: body }},
            { new: true, runValidators: true }
        )
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.json(err));
    },

    deleteReaction({ params }, res) {
        User.findOneAndDelete({ _id: params.userId })
            .then(deletedReaction => {
                if (!deletedReaction) {
                    return res.status(400).json({ message: 'No reaction with this id! '});
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { friends: params.userId }},
                    { new: true }
                );
            })
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(400).json({ message: 'No thought found with this id! '});
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.json(err));
    }


}