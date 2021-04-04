const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleID: String
});

// loads schema into mongoose
mongoose.model('users', userSchema);




