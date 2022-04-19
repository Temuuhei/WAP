let songs = [
    {
        "id": 1,
        "title": "Ka Mixtape-5",
        "releasedDate": "2022-04-17"
    },
    {
        "id": 2,
        "title": "Ka Mixtape-4",
        "releasedDate": "2022-04-17"
    },
    {
        "id": 3,
        "title": "Ka Mixtape-3",
        "releasedDate": "2022-04-17"
    }
];

// let songs = [];
let myPlayList = [];
let idSequences = 0;

module.exports = class Song {
    constructor(id, title, releasedDate) {
        this.id = id;
        this.title = title;
        this.releasedDate = releasedDate;
    }

    static getSongs() {
        return songs;
    }

    static getMySongs() {
        console.log('get my songs!');
        return myPlayList;
    }

    static searchByTitle(title) {
        return songs.filter(song => song.title.toLowerCase().includes(title.toLowerCase()));
    }

    static addMyPlaylist(addedSong) {
        let songId = myPlayList.findIndex(song => song.id == addedSong);
        if (songId > -1) {
            console.log('This song is already in your play list !');
        } else {
            let newfavsong = songs.findIndex(song => song.id == addedSong);
            myPlayList.push(songs[newfavsong]);
        }
        return myPlayList;
    }

    save() {
        this.id = idSequences + 1;
        songs.push(this);
        ++idSequences;
        return this;
    }

    static delete(deleteSong) {
        let songId = myPlayList.findIndex(song => song.id == deleteSong);
        if(songId > -1) {
            myPlayList.splice(songId, 1);
        } else {
            console.log('This song not found in your play list !');
        }
        return myPlayList;
    }
}