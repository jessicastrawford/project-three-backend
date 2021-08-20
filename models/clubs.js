import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const clubSchema = new mongoose.Schema({
  clubName: { type: String, required: true },
  logo: { type: String, required: true },
  mainImage: { type: String, required: true },
  imageTwo: { type: String, required: true },
  imageThree: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  stadiumInfo: { type: String, required: true },

  pubs: [{
    pubName: { type: String, required: true },
    comments: [commentsSchema],
    userRating: { type: Number, required: true, min: 1, max: 5 },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    description: { type: String, required: true, maxlength: 350 },
    image: { type: String, required: true },
  }],
})

const commentsSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, maxlength: 350 },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  {
    timestamps: true,
  }
)

clubSchema.plugin(mongooseUniqueValidator)

const Club = mongoose.model('Club', clubSchema)

export default Club