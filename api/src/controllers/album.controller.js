import Album from "../models/album.model.js";
import Song from "../models/song.model.js";

// Get all albums
const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find();

    res.status(200).json(albums);
  } catch (error) {
    error.methodName = getAllAlbums.name;
    next(error);
  }
};

// Get album by id
const getAlbumById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const album = await Album.findById(id).populate("songs");

    if (!album) {
      return res.status(404).json({ message: "Album not found." });
    }

    res.status(200).json(album);
  } catch (error) {
    error.methodName = getAlbumById.name;
    next(error);
  }
};

export { getAllAlbums, getAlbumById };
