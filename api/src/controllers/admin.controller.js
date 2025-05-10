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

// Check admin
const checkAdmin = async (req, res, next) => {
  try {
    res.status(200).json({ admin: true });
  } catch (error) {
    error.methodName = checkAdmin.name;
    next(error);
  }
};

// Songs management
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

    res.status(201).json({ message: "Song created successfully." });
  } catch (error) {
    error.methodName = createSong.name;
    next(error);
  }
};

const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);

    if (!song) {
      return res.status(404).json({ message: "Song not found." });
    }

    // if song belongs to an album, update the album's songs array
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, { $pull: { songs: song._id } });
    }

    await song.remove();

    res.status(200).json({ message: "Song deleted successfully." });
  } catch (error) {
    error.methodName = deleteSong.name;
    next(error);
  }
};

// Albums management
const createAlbum = async (req, res, next) => {
  try {
    const { albumName, artist, releaseYear } = req.body;
    const { imageFile } = req.files;

    const imageUrl = await uploadToCloudinary(imageFile);

    const newAlbum = new Album({
      albumName: albumName,
      artist: artist,
      albumImageUrl: imageUrl,
      releaseYear: releaseYear
    });

    await newAlbum.save();

    res.status(201).json({ message: "Album created successfully." });
  } catch (error) {
    error.methodName = createAlbum.name;
    next(error);
  }
}

const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    const album = await Album.findById(id);

    if (!album) {
      return res.status(404).json({ message: "Album not found." });
    }

    // Remove albumId from all songs assigned to the album.
    const songs = await Song.find({ albumId: album._id });

    for (const song of songs) {
      song.albumId = null;
      await song.save();
    }

    await album.remove();

    res.status(200).json({ message: "Album deleted successfully." });
  } catch (error) {
    error.methodName = deleteAlbum.name;
    next(error);
  }
}

export { checkAdmin, createSong, deleteSong, createAlbum, deleteAlbum };
