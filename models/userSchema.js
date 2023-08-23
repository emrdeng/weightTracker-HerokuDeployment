require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: 1,
      uniqueCaseInsensitive: 1,
    },
    googleId: String,
    provider: String,
    gender: String,
    age: Number,
    feet: Number,
    inches: Number,
    height: Number,
    activityLevel: String,
    weight: [{ type: Schema.Types.ObjectId, ref: 'Weight' }],
    food: [{ type: Schema.Types.ObjectId, ref: 'Food' }],
    exercise: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
    bmr: Number,
    createdAt:{
      type: Date,
      default: Date.now(),
      immutable: 1,
    }
});
  
const User = mongoose.model('User', userSchema);

module.exports = User;
  