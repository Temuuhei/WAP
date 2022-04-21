const { request } = require("express");

let songs = [
    {
        "id": 1,
        "title": "Nomad x Ka - Bratan.mp4",
        "releasedDate": "2022-04-17",
        "link": "music/Nomad x Ka - Bratan.mp4"
    },
    {
        "id": 2,
        "title": "Stefun ft.NMN - Zusem Zurkh",
        "releasedDate": "2022-04-17",
        "link": "music/Stefun ft.NMN - Zusem Zurkh.mp4"
    },
    {
        "id": 3,
        "title": "ThunderZ - Haranhui",
        "releasedDate": "2022-04-17",
        "link": "music/ThunderZ - Haranhui.mp4"
    }
];

// let songs = [];
let myPlayList = [
    // {
    //     "uid": 1,
    //     "songs": [{
    //         "id": 1,
    //         "title": "Ka Mixtape-1",
    //         "releasedDate": "2022-04-17"
    //     }]
    // },
    // {
    //     "uid": 2,
    //     "songs": [{
    //         "id": 2,
    //         "title": "Stefun ft.NMN - Zusem Zurkh",
    //         "releasedDate": "2022-04-17",
    //         "link": "music/Stefun ft.NMN - Zusem Zurkh.mp4"
    //     }]
    // }
];
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

    static getMySongs(userId) {
        console.log('aaaaaaaaaaaaaaaaa', userId);
        let index = myPlayList.findIndex(u => u.uid == userId);
        if (index > -1) {
            return myPlayList[index].songs;
        }
        else {
            console.log('not found my songs');
        }
    }

    static searchByTitle(title) {
        return songs.filter(song => song.title.toLowerCase().includes(title.toLowerCase()));
    }

    static addMyPlaylist(addedSong, userId) {
        let index = myPlayList.findIndex(u => u.uid == userId);
        if (index > -1) {
            let songId = myPlayList[index].songs.findIndex(song => song.id == addedSong);
            if (songId > -1) {
                console.log('This song is already in your play list !');
            } else {
                let newfavsong = songs.findIndex(song => song.id == addedSong);
                myPlayList[index].songs.push(songs[newfavsong]);
            }
        }
        else {
            let newObj = {
                uid: userId,
                songs: []
            }
            let newfavsong = songs.findIndex(song => song.id == addedSong);
            newObj.songs.push(songs[newfavsong]);
            myPlayList.push(newObj);
        }

        return myPlayList;
    }

    save() {
        this.id = idSequences + 1;
        songs.push(this);
        ++idSequences;
        return this;
    }

    static delete(deleteSong, userId) {
        let index = myPlayList.findIndex(u => u.uid == userId);
        if (index > -1) {
            let songId = myPlayList[index].songs.findIndex(song => song.id == deleteSong);
            if (songId > -1) {
                myPlayList[index].songs.splice(songId, 1);
            } else {
                console.log('This song not found in your play list !');
            }
        }

        return myPlayList;
    }
}