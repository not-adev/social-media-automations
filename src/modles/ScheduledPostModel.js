import mongoose from "mongoose";

const scheduledPostSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    enum: ['twitter', 'facebook', 'instagram', 'linkedin'],
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  socailAccount_id : {
    type : mongoose.Schema.Types.ObjectId ,
    required : true ,
    ref : 'SocialMediaAccount'
  } , 
  state: {
    type: String,
    enum: ['pending', 'posted','retrying'],
    default: 'pending',
  },
  scheduled_time: {
    type: Date,
  },
  Post_id : {
    type : Number,
    required : false ,

  }
});
scheduledPostSchema.index({ scheduled_time: 1 });
const ScheduledPost = mongoose.models.ScheduledPost 
  || mongoose.model("ScheduledPost", scheduledPostSchema);

export default ScheduledPost;
