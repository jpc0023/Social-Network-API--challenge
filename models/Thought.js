const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema (
    /*
    thoughtText
    createdAt
    username
    reactions
        reactionCount
    */
);

const ReactionSchema = new Schema (
    /*
    reactionId
    reactionBody
    username
    createdAt
    */
);