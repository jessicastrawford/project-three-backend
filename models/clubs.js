import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, maxlength: 350 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
)

const pubSchema = new mongoose.Schema(
  {
    pubName: { type: String, required: true },
    comments: [commentSchema],
    userRating: { type: Number, required: true, min: 1, max: 5 },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    description: { type: String, required: true, maxlength: 350 },
    image: { type: String, required: true },
    addedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  }
)

const clubSchema = new mongoose.Schema({
  clubName: { type: String, required: true },
  league: { type: String, required: true },
  logo: { type: String, required: true },
  mainImage: { type: String, required: true },
  imageTwo: { type: String, required: true },
  imageThree: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  stadiumInfo: { type: String, required: true },
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },

  pubs: [pubSchema],
})

clubSchema.plugin(mongooseUniqueValidator)

const Club = mongoose.model('Club', clubSchema)

export default Club