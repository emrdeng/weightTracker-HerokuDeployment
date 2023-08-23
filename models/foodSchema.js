require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

const foodSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: 1,
    },
    foodName: {
        type: String,
        required: 1
    },
    grams: {
        type: Number,
        required: 1
    },
    calories: {
        type: Number,
        required: 1
    },
    protein: {
        type: Number,
        required: 1
    },
    carbs: {
        type: Number,
        required: 1
    },
    fat: {
        type: Number,
        required: 1
    },
    calProtein: {
        type: Number,
        required: 1
    },
    calCarbs: {
        type: Number,
        required: 1
    },
    calFat: {
        type: Number,
        required: 1
    },
    calOther: {
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

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;