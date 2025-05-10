import { v2 as cloudinary } from 'cloudinary';
import Album from "../models/album.model.js";
import Song from "../models/song.model.js";

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
      folder: "mern-spotify-clone-app"
    });

    return result.secure_url;
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.imageFile || !req.files.audioFile) {
      return res.status(400).json({ message: `Files required.` });
    }

    const { songName, artist, duration, albumId } = req.body;
    const imageFile = req.files.imageFile;
    const audioFile = req.files.audioFile;

    const songImageUrl = await uploadToCloudinary(imageFile);
    const audioUrl = await uploadToCloudinary(audioFile);

    if (!songName || !artist || !duration) {
      return res.status(400).json({ message: `Song name required.` });
    }
    if (!artist) {
      return res.status(400).json({ message: `Artist required.` });
    }
    if (!duration) {
      return res.status(400).json({ message: `Duration required.` });
    }

    const newSong = new Song({
      songName: songName,
      artist: artist,
      songImageUrl: songImageUrl,
      audioUrl: audioUrl,
      duration: duration,
      albumId: albumId || null
    });

    await newSong.save();

    // if song belongs to an album, update the album's songs array
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, { $push: { songs: newSong._id } });
    }

    res.status(201).json({ success: true });
  } catch (error) {
    error.methodName = createSong.name;
    next(error);
  }
};

const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);

    // if song belongs to an album, update the album's songs array
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, { $pull: { songs: song._id } });
    }

    await Song.findByIdAndDelete(id);

    res.status(200).json({ message: "Song deleted successfully." });
  } catch (error) {
    error.methodName = deleteSong.name;
    next(error);
  }
};

const createAlbum = async (req, res, next) => {
  try {
    
  } catch (error) {
    error.methodName = createAlbum.name;
    next(error);
  }
}

const deleteAlbum = async (req, res, next) => {
  try {
    
  } catch (error) {
    error.methodName = deleteAlbum.name;
    next(error);
  }
}

export { createSong, deleteSong, createAlbum, deleteAlbum };
