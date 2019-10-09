import mongoose, {Schema}  from 'mongoose';

const commentSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        body: {
            type: Stirng,
            required: true
        },
        kudos: [
            {
              type: Schema.Types.ObjectId,
              ref: 'User',
            },
          ],
        booo: [
            {
              type: Schema.Types.ObjectId,
              ref: 'User',
            },
          ], 
    },
    {timestamps: true},
);
module.exports = mongoose.model('Comment', commentSchema);