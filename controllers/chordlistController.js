const {Chordlist} = require('../models')

exports.getChordlistByPlaylistId = (req, res, next) => {
    const {id} = req.params
    Chordlist.findAll({
        attributes: ['time','chord'],
        where : {playlistId : id }
    }).then( rs => {
        res.json(rs)
    }).catch(next)
}

exports.updateChordlist = (req, res, next) => {
    const inputChordlist = req.body
    const {id} = req.params
    Chordlist.destroy({
        where : {playlistId : id}
      }).then(rs=> {
        inputChordlist.map(el => el.playlistId = id )
        Chordlist.bulkCreate(inputChordlist)
            res.json(rs)
      })
      .catch(next);
  };

  

