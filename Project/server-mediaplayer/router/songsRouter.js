const express = require('express');
const router = express.Router();
const controllerSongs = require('../controller/songController');
const controllerUser = require('../controller/userController');

router.route("/all/")
    .get(controllerSongs.getSongs)
    .post(controllerUser.authenticate);
router.route('/myplaylist/')
    .post(controllerUser.authenticate)
    .get(controllerSongs.getMyList);



// router.get('/all/', controllerSongs.getSongs);
router.get('/all/:songTitle', controllerSongs.getSongsByTitle);
// router.get('/myplaylist/', controllerSongs.getMyList);
router.put('/:songId', controllerSongs.getInterest);
router.post('/', controllerSongs.saveSong);
router.delete('/myplaylist/:songId', controllerSongs.deleteSong);



module.exports = router;