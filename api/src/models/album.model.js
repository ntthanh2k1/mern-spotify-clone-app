import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
  albumName: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  albumImageUrl: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number,
    required: true
  },
  songs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song"
  }]
}, {
  timestamps: true
});

const Album = mongoose.model("Album", albumSchema);

export default Album;
