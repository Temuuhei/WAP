window.onload = function () {
    console.log('window onloading !')
    const message = "Welcome :)";

    
    document.getElementById('loginBtn').onclick = function () {
        let uname = document.getElementById('username');
        let pass = document.getElementById('password');

        fetch('http://localhost:3000/login/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                username: uname.value,
                password: pass.value
            })
        }).then((response) => {
            if (response.status == 200) {
                return response.json();
            }
            throw new Error('Login is failed ! \n Try again :)')
        }).then(json => {
            sessionStorage.setItem('session_id', json.token);
            loadSongs();
            uname.style.display = 'none';
            pass.style.display = 'none';
            document.getElementById('wlc').style.display = 'none';
            document.getElementById('loginBtn').style.display = 'none';
            document.getElementById('logoutBtn').style.display = 'block';
            document.getElementById('search').style.display = 'inline';
            document.getElementById('searchBtn').style.display = 'inline';
            document.getElementById('msg').innerHTML = `<h3>${message + ' ' + json.username}</h3>`;
            document.getElementById('msg').style.display = 'block';
            document.getElementById('div_songs').style.display = 'block';
            document.getElementById('div_playlist').style.display = 'block';
            document.getElementById('you_interest').style.display = 'block';
            document.getElementById('your_playlist').style.display = 'block';
        }).catch(err => {
            console.log('ERROR -->', err)
            alert(err);
        })
    };

    document.getElementById('logoutBtn').onclick = function () {
        document.getElementById('loginBtn').style.display = 'inline-block';
        document.getElementById('logoutBtn').style.display = 'none';
        document.getElementById('search').style.display = 'none';
        document.getElementById('searchBtn').style.display = 'none';
        document.getElementById('div_songs').style.display = 'none';
        document.getElementById('div_playlist').style.display = 'none';
        document.getElementById('you_interest').style.display = 'none';
        document.getElementById('your_playlist').style.display = 'none';
        document.getElementById('username').style.display = 'inline-block';
        document.getElementById('password').style.display = 'inline-block';
        document.getElementById('wlc').style.display = 'inline-block';
        document.getElementById('msg').style.display = 'none';
        document.getElementById('a1').style.display = 'none';
        sessionStorage.clear();
    }

    document.getElementById('searchBtn').onclick = function () {
        let searchTxt = document.getElementById('search').value;
        console.log('input------', searchTxt);
        fetch('http://localhost:3000/songs/all/' + searchTxt, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + sessionStorage.getItem('session_id')
            }
        }).then(function (res) {
            console.log('res', res);
            if (res.status == 200) {
                return res.json();
            }
        }).then(function (res) {
            console.log('songs search res', res);
            let table = document.getElementById('tableSongs');
            var rowCount = table.rows.length;
            let first = 1;
            for (var i = first; i < rowCount; i++) {
                table.deleteRow(first);
            }
            for (let i = 0; i < res.length; i++) {
                let song = res[i];
                let row = table.insertRow(i + 1);
                let cell0 = row.insertCell(0);
                cell0.innerHTML = song.id;
                let cell1 = row.insertCell(1);
                cell1.innerHTML = song.title;
                let cell2 = row.insertCell(2);
                cell2.innerHTML = song.releasedDate;
    
                let cell3 = row.insertCell(3);
    
                let buttonAdd = document.createElement("button");
                buttonAdd.innerHTML = "Add";
                buttonAdd.onclick = function () {
                    addSong(song.id);
                };
                cell3.appendChild(buttonAdd);
            }
    
        }).catch(function (err) {
            console.log('songs err', err);
        });
    
    }
};

function loadSongs() {
    fetch('http://localhost:3000/songs/all', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + sessionStorage.getItem('session_id')
        }
    }).then(function (res) {
        console.log('res', res);
        if (res.status == 200) {
            return res.json();
        }
    }).then(function (res) {
        console.log('songs res', res);
        let searchTxt = document.getElementById('search').value;
        let table = document.getElementById('tableSongs');
        var rowCount = table.rows.length;
        let first = 1;
        for (var i = first; i < rowCount; i++) {
            table.deleteRow(first);
        }
        for (let i = 0; i < res.length; i++) {
            let song = res[i];
            let row = table.insertRow(i + 1);
            let cell0 = row.insertCell(0);
            cell0.innerHTML = song.id;
            let cell1 = row.insertCell(1);
            cell1.innerHTML = song.title;
            let cell2 = row.insertCell(2);
            cell2.innerHTML = song.releasedDate;

            let cell3 = row.insertCell(3);

            let buttonAdd = document.createElement("button");
            buttonAdd.innerHTML = "Add";
            buttonAdd.onclick = function () {
                addSong(song.id);
            };
            cell3.appendChild(buttonAdd);
        }
    }).catch(function (err) {
        console.log('songs err', err);
    });


    fetch('http://localhost:3000/songs/myplaylist', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + sessionStorage.getItem('session_id')
        }
    }).then(function (res) {
        if (res.status == 200) {
            return res.json();
        }
    }).then(function (res) {
        console.log('playlist res', res);
        let table = document.getElementById('tablePlaylist');
        var rowCount = table.rows.length;
        let first = 1;
        for (var i = first; i < rowCount; i++) {
            table.deleteRow(first);
            console.log('deleting');
        }
        for (let i = 0; i < res.length; i++) {
            let song = res[i];
            
            let row = table.insertRow(i + 1);
            let cell0 = row.insertCell(0);
            cell0.innerHTML = song.id;
            let cell1 = row.insertCell(1);
            cell1.innerHTML = song.title;
            let cell2 = row.insertCell(2);
            cell2.innerHTML = song.releasedDate;

            let cell3 = row.insertCell(3);

            let buttonRmv = document.createElement("button");
            let buttonPlay = document.createElement("button");
            buttonPlay.innerHTML = "Play";
            buttonRmv.innerHTML = "-"
            cell3.appendChild(buttonPlay);
            cell3.appendChild(buttonRmv);
            buttonPlay.onclick = function() {
                playSong(song.link);
            };
            buttonRmv.onclick = function () {
                deleteSong(song.id);
            };
        }

    }).catch(function (err) {
        console.log('songs err', err);
    });
}

function addSong(id) {
    fetch('http://localhost:3000/songs/' + id, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + sessionStorage.getItem('session_id')
        }
    }).then(function (res) {
        if (res.status == 200) {
            return res.json();
        }
    }).then(function (res) {
        console.log('songs added res', res);
        fetch('http://localhost:3000/songs/myplaylist', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + sessionStorage.getItem('session_id')
            }
        }).then(function (res) {
            if (res.status == 200) {
                return res.json();
            }
        }).then(function (res) {
            console.log('added playlist res', res);
            let table = document.getElementById('tablePlaylist');
            var rowCount = table.rows.length;
            let first = 1;
            for (var i = first; i < rowCount; i++) {
                table.deleteRow(first);
            }
            for (let i = 0; i < res.length; i++) {
                let song = res[i];

                let row = table.insertRow(i + 1);
                let cell0 = row.insertCell(0);
                cell0.innerHTML = song.id;
                let cell1 = row.insertCell(1);
                cell1.innerHTML = song.title;
                let cell2 = row.insertCell(2);
                cell2.innerHTML = song.releasedDate;

                let cell3 = row.insertCell(3);

                let buttonPlay = document.createElement("button");
                let buttonRmv = document.createElement("button");
                buttonPlay.innerHTML = "Play";
                buttonRmv.innerHTML = "-";
                cell3.appendChild(buttonPlay);
                cell3.appendChild(buttonRmv);
                buttonRmv.onclick = function () {
                    deleteSong(song.id);
                };
                buttonPlay.onclick = function() {
                    playSong(song.link);
                };
                
            }

        }).catch(function (err) {
            console.log('songs err', err);
        });

    }).catch(function (err) {
        console.log('songs added err', err);
    });
}

function deleteSong(id) {
    console.log('DELETE function is heree');
    fetch('http://localhost:3000/songs/myplaylist/' + id, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + sessionStorage.getItem('session_id')
        }
    }).then(function (res) {
        if (res.status == 200) {
            return res.json();
        }
    }).then(function (res) {
        console.log('songs delete res', res);
        fetch('http://localhost:3000/songs/myplaylist', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + sessionStorage.getItem('session_id')
            }
        }).then(function (res) {
            if (res.status == 200) {
                return res.json();
            }
        }).then(function (res) {
            console.log('delete playlist res', res);
            let table = document.getElementById('tablePlaylist');
            var rowCount = table.rows.length;
            let first = 1;
            for (var i = first; i < rowCount; i++) {
                table.deleteRow(first);
            }
            for (let i = 0; i < res.length; i++) {
                let song = res[i];

                let row = table.insertRow(i + 1);
                let cell0 = row.insertCell(0);
                cell0.innerHTML = song.id;
                let cell1 = row.insertCell(1);
                cell1.innerHTML = song.title;
                let cell2 = row.insertCell(2);
                cell2.innerHTML = song.releasedDate;

                let cell3 = row.insertCell(3);

                let buttonPlay = document.createElement("button");
                let buttonRmv = document.createElement("button");
                buttonPlay.innerHTML = "Play";
                buttonRmv.innerHTML = "-"
                buttonRmv.onclick = function () {
                    deleteSong(song.id);
                };
                buttonPlay.onclick = function() {
                    playSong(song.link);
                }
                cell3.appendChild(buttonPlay);
                cell3.appendChild(buttonRmv);
            }

        }).catch(function (err) {
            console.log('songs err', err);
        });

    }).catch(function (err) {
        console.log('songs deleted err', err);
    });
};

function playSong(link) {
    console.log('playing this link', link);
    let audio = document.getElementById('a1');
    console.log('Play songing');
    audio.style.display = 'block';
    audio.src = link;
    audio.load();
    audio.play();

};

