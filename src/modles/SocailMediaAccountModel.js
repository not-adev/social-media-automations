import mongoose from 'mongoose';

const socialMediaAccountSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,

  },
  name: {
    type: String,
  },
  profilePicture: {
    type: String, // URL or path
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  posts : [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ScheduledPost',
      },
    ], 
  access_token: {
    type: String
  },
  refresh_token: String,
  expires_in: String,
  scope: String,
  token_created_at: {
    type: Date
  }
});

export default mongoose.models.SocialMediaAccount || mongoose.model('SocialMediaAccount', socialMediaAccountSchema);