const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema (
    /*
    username
    email
    thoughts
    friends
        friendCount virtual
    */
);
