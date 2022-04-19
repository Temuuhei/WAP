const Songs = require('../models/songs');

module.exports.getSongs = (req, res, next) => {
    res.status(200).json(Songs.getSongs());
}

module.exports.getMyList = (req, res, next) => {
    res.status(200).json(Songs.getMySongs());
}

module.exports.getSongsByTitle = (req, res, next) => {
    let title = req.params.songTitle;
    res.status(200).json(Songs.searchByTitle(title));
}

module.exports.getInterest = (req, res, next) => {
    let songId = req.params.songId;
    res.status(200).json(Songs.addMyPlaylist(songId));
}

module.exports.saveSong = (req, res, next) => {
    let newSong = req.body;
    const song = new Songs(null, newSong.title, newSong.releasedDate);
    res.status(200).json(song.save());
}

module.exports.deleteSong = (req, res, next) => {
    res.status(200).json(Songs.delete(req.params.songId));
}

