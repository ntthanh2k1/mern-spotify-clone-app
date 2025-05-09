import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  songName: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  songImageUrl: {
    type: String,
    required: true
  },
  audioUrl: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  albumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Album"
  }
}, {
  timestamps: true
});

const Song = mongoose.model("Song", songSchema);

export default Song;
