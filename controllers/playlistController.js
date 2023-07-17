const { Chordlist, Playlist, User } = require('../models')
const { Op } = require('sequelize')


// exports.getPlaylistById = (req, res, next) => {
//     const {id} = req.params
//     Playlist.findOne({
//         attribute: ['musicName','youtubeEmbed'],
//         where : {id : id }
//     }).then( rs => {
//         res.json(rs)
//     }).catch(next)
// }

exports.getPlaylistById = async (req, res, next) => {
  try {
      const { id } = req.params;
      const rs = await Playlist.findOne({
          attributes: ['musicName', 'youtubeEmbed'],
          where: { id: id }
      });
      res.json(rs);
  } catch (error) {
      next(error);
  }
};

// exports.createPlaylist = (req, res, next) => {
//     // validation
//     const {input, inputChordlist} = req.body
//     const {musicName, youtubeEmbed} = input
//     Playlist.create({
//         musicName,
//         youtubeEmbed,
//         userId: req.user.id
//     }).then(rs=> {
//         inputChordlist.map(el => el.playlistId = rs.id)
//         Chordlist.bulkCreate(inputChordlist)
//         res.json(rs)
//     })
//     .catch(next)
// }

exports.createPlaylist = async (req, res, next) => {
  let playlist;
  try {
    
    const { input, inputChordlist } = req.body;
    const { musicName, youtubeEmbed } = input;

    // Create the Playlist
    playlist = await Playlist.create({
      musicName,
      youtubeEmbed,
      userId: req.user.id,
    });

    // Attach the playlistId to each chordlist item
    inputChordlist.map((el) => (el.playlistId = playlist.id));

    // Create the chordlist items
    const chordlist = await Chordlist.bulkCreate(inputChordlist);

    res.json({ playlist, chordlist });
  } catch (error) {
    // Delete the playlist if an error occurred during chordlist creation
    if (playlist) {
      await Playlist.destroy({ where: { id: playlist.id } });
    }
    console.error(error);
    next(error);
  }
};

  

// exports.updatePlaylist = (req, res, next) => {
//     const { id } = req.params;
//     Playlist.update(
//       { ...req.body },
//       {
//         where: { id: id },
//       }
//     )
//       .then((rs) => {
//         res.json(rs);
    
//       })
//       .catch(next);
//   };

exports.updatePlaylist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rs = await Playlist.update(
      { ...req.body },
      {
        where: { id: id },
      }
    );
    res.json(rs);
  } catch (error) {
    next(error);
  }
};


  exports.deletePlaylist = (req, res, next) => {
    const {id} = req.params
    Playlist.destroy({
        where : {id : id}
    }).then(rs=> {
        if (rs===0) {
            throw new Error('Cannot Delete!!')
        }
        res.json(rs)
    }).catch(next)
}

// exports.searchPlaylist = (req, res , next) => {
//     const {search} = req.body
//     Playlist.findAll({
//         include:[{
//             model: User, attributes:["username"]
//         }],
//         where:{musicName:{
//             [Op.like]:`%${search}%`
//         }}
//     }).then((rs) => {
//         res.json(rs);
//       })
//       .catch(next);
// }


exports.searchPlaylist = async (req, res, next) => {
    try {
      const { search } = req.body;
      const rs = await Playlist.findAll({
        include: [{
          model: User,
          attributes: ["username"],
        }],
        where: {
          musicName: {
            [Op.like]: `%${search}%`,
          },
        },
      });
      res.json(rs);
    } catch (error) {
      console.error(error); // You can handle the error in a way that suits your application
      next(error);
    }
  };














