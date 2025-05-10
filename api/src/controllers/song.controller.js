import Song from "../models/song.model.js";

// Get all songs
const getAllSongs = async (req, res, next) => {
  try {
    // -1 = descending (latest -> oldest)
    // 1 = ascending (oldest -> latest)
    const songs = await Song.find().sort({ createdAt: -1 });

    res.status(200).json(songs);
  } catch (error) {
    error.methodName = getAllSongs.name;
    next(error);
  }
};

// Get featured songs
const getFeaturedSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      {
        $project: {
          _id: 1,
          songName: 1,
          artist: 1,
          songImageUrl: 1,
          audioUrl: 1
        }
      },
      {
        $sample: {
          size: 6
        }
      }
    ]);

    res.status(200).json(songs);
  } catch (error) {
    error.methodName = getFeaturedSongs.name;
    next(error);
  }
};

// Get made for you songs
const getMadeForYouSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      {
        $project: {
          _id: 1,
          songName: 1,
          artist: 1,
          songImageUrl: 1,
          audioUrl: 1
        }
      },
      {
        $sample: {
          size: 4
        }
      }
    ]);

    res.status(200).json(songs);
  } catch (error) {
    error.methodName = getMadeForYouSongs.name;
    next(error);
  }
};

// Get trending songs
const getTrendingSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      {
        $project: {
          _id: 1,
          songName: 1,
          artist: 1,
          songImageUrl: 1,
          audioUrl: 1
        }
      },
      {
        $sample: {
          size: 4
        }
      }
    ]);

    res.status(200).json(songs);
  } catch (error) {
    error.methodName = getTrendingSongs.name;
    next(error);
  }
};

// Get songs by id
const getSongById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id).populate("albumId");

    if (!song) {
      return res.status(404).json({ message: "Song not found." });
    }

    res.status(200).json(song);
  } catch (error) {
    error.methodName = getSongById.name;
    next(error);
  }
};

export { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs, getSongById };
