import mongoose from 'mongoose';

const socialMediaAccountSchema = new mongoose.Schema({
  platform: {
    type: String,
    enum: ['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'Other'],
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String, // URL or path
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.models.SocialMediaAccount || mongoose.model('SocialMediaAccount', socialMediaAccountSchema);