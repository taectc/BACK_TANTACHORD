const express = require('express')
const router = express.Router()
const chordlistController = require('../controllers/chordlistController')


router.get('/:id', chordlistController.getChordlistByPlaylistId)
router.put('/:id', chordlistController.updateChordlist)


module.exports = router