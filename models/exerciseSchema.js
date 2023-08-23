require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

const exerciseSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: 1,
    },
    exerciseName: {
        type: String,
        required: 1
    },
    duration: {
        type: Number,
        required: 1
    },
    caloriesBurned: {
        type: Number,
        required: 1
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: String,
        required: 1
    }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;