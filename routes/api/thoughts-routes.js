const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

router
    .route('/:userId')
    .get(getThoughtById)
    .put(updateThought);
    

router
    .route('/:userId/:thoughtId')
    .put(addReaction)
    .delete(deleteThought);

router.route('/:userId/:thoughtId/:reactionId').delete(deleteReaction);

module.exports = router;