const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 //
    }
});

//blackList the 86400 is should be expire it in the 24 hours 


module.exports = mongoose.model('BlacklistToken' , blacklistTokenSchema);