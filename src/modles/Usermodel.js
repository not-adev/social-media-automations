import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  accounts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SocialMediaAccount',
    },
  ],
  scheduledPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ScheduledPost',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  access_token :{
    type : String 
  } , 
  refresh_token : String  , 
  expires_in : String , 
  scope : String ,
  token_created_at : {
    type :Date
  } 


});

export default mongoose.models.User || mongoose.model('User', userSchema);