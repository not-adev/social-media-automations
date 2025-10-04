import mongoose from 'mongoose';

const socialMediaAccountSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name : {
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
});

export default mongoose.models.SocialMediaAccount || mongoose.model('SocialMediaAccount', socialMediaAccountSchema);