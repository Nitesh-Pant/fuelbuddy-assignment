import mongoose from 'mongoose';

const sharedSchema = new mongoose.Schema({
  sharedBy: { type: String, required: true }, // firebase uid
  sharedTo: { type: String, required: true }, // Firebase UID
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Shared', sharedSchema);
