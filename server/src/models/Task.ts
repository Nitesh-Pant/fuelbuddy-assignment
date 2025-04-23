import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true }, // Firebase UID
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Task', taskSchema);
