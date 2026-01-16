import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  university: String,
  city: String,
  address: String,
  distanceMiles: Number,
  price: Number,
  trueCost: Number,
  trustScore: Number,
  rating: Number,
  type: String,
  bedrooms: Number,
  bathrooms: Number,
  sqft: Number,
  amenities: [String],
  image: String,
  verified: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Property", propertySchema);