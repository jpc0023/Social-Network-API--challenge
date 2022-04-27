const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
    /*
    username
    email
    thoughts
    friends
        friendCount virtual
    */

const UserSchema = new Schema (
    {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true, 
        required: true,
        validate: [{
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        }]
    },
    thoughts: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }
    ],
    friends: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', UserSchema);

// I spend WAY to much time looking for the following typo
// module.exports - User;
module.exports = User;