require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

const weightSchema = new mongoose.Schema({
    date: {
      type: Date,
      default: Date.now(),
      required: 1,
      immutable: 1
    },
    weight: {
      type: Number,
      required: 1
    }
});
  
const Weight = mongoose.model('Weight', weightSchema);

module.exports = Weight;
  