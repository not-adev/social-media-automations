import mongoose from 'mongoose';

const scheduledPostSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  scheduledTime: {
    type: Date,
    required: true,
  },
  platform: {
    type: String,
    enum: ['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'Other'],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.models.ScheduledPost || mongoose.model('ScheduledPost', scheduledPostSchema);