import Album from "../models/album.model.js";
import Song from "../models/song.model.js";
import User from "../models/user.model.js";

const getAllStats = async (req, res, next) => {
  try {
    // const totalUsers = await User.countDocuments();
    // const totalSongs = await Song.countDocuments();
    // const totalAlbums = await Album.countDocuments();
    // // sql query:
    // // select count(artist)
    // // from (
    // //   select artist
    // //   from songs
    // //   union
    // //   select artist
    // //   from albums
    // // )
    // const uniqueArtists = Song.aggregate([
    //   {
    //     $unionWith: {
    //       coll: "albums",
    //       pipeline: []
    //     }
    //   },
    //   {
    //     $group: {
    //       _id: "$artist"
    //     }
    //   },
    //   {
    //     $count: "count"
    //   }
    // ]);

    const [totalUsers, totalSongs, totalAlbums, uniqueArtists] = Promise.all([
      User.countDocuments(),
      Song.countDocuments(),
      Album.countDocuments(),
      Song.aggregate([
        {
          $unionWith: {
            coll: "albums",
            pipeline: []
          }
        },
        {
          $group: {
            _id: "$artist"
          }
        },
        {
          $count: "count"
        }
      ])
    ]);

    res.status(200).json({
      totalUsers,
      totalSongs,
      totalAlbums,
      totalArtists: uniqueArtists[0]?.count || 0
    });
  } catch (error) {
    error.methodName = getAllStats.name;
    next(error);
  }
};

export { getAllStats };