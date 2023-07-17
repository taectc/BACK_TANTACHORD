const express = require('express')
const router = express.Router()
const playlistController = require('../controllers/playlistController')
const authenticate = require('../middlewares/authenticate')


router.get('/:id', playlistController.getPlaylistById)
router.post('/',authenticate, playlistController.createPlaylist)
router.delete('/:id', playlistController.deletePlaylist)
router.put('/:id', playlistController.updatePlaylist)
router.post('/search', playlistController.searchPlaylist)


module.exports = router