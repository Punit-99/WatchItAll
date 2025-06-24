import mongoose from "mongoose";

const episodeSchema = new mongoose.Schema({
  episodeTitle: { type: String, required: true },
  videoUrl: { type: String, required: true },
  duration: Number,
});

const seasonSchema = new mongoose.Schema({
  seasonNumber: Number,
  episodes: [episodeSchema],
});

const partSchema = new mongoose.Schema({
  partTitle: { type: String, required: true },
  videoUrl: { type: String, required: true },
  duration: Number,
});

const showSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["movie", "webseries"], required: true },
    title: { type: String, required: true },
    description: String,
    genres: [String],
    releaseDate: Date,
    language: String,
    thumbnailUrl: String,
    bannerUrl: String,
    parts: [partSchema], // For movie type
    seasons: [seasonSchema], // For webseries type
  },
  { timestamps: true }
);

export default mongoose.model("Show", showSchema);
