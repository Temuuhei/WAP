const Songs = require('../models/songs');
const jwtDecode = require('jwt-decode');

module.exports.getSongs = (req, res, next) => {
    res.status(200).json(Songs.getSongs());
}

module.exports.getMyList = (req, res, next) => {
    let obj = jwtDecode(req.headers.authorization.split(' ')[1]);
    res.status(200).json(Songs.getMySongs(obj.id));
}

module.exports.getSongsByTitle = (req, res, next) => {
    let title = req.params.songTitle;
    res.status(200).json(Songs.searchByTitle(title));
}

module.exports.getInterest = (req, res, next) => {
    let songId = req.params.songId;
    let obj = jwtDecode(req.headers.authorization.split(' ')[1]);
    res.status(200).json(Songs.addMyPlaylist(songId,obj.id));
}

module.exports.saveSong = (req, res, next) => {
    let newSong = req.body;
    const song = new Songs(null, newSong.title, newSong.releasedDate);
    res.status(200).json(song.save());
}

module.exports.deleteSong = (req, res, next) => {
    let obj = jwtDecode(req.headers.authorization.split(' ')[1]);
    res.status(200).json(Songs.delete(req.params.songId, obj.id));
}

