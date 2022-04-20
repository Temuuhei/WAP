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
            // console.log('status ------------->', response);
            if (response.status == 200) {
                return response.json();
            }
            throw new Error('Login is failed ! \n Try again :)')
        }).then(json => {
            console.log('responsehdeeeee --> ', json);
            loadSongs();
            console.log(sessionStorage);
            sessionStorage.setItem('session_id', json.token);
            // window.location.href = "http://localhost:3000/songs/all";
            uname.style.display = 'none';
            pass.style.display = 'none';
            document.getElementById('wlc').style.display = 'none';
            document.getElementById('loginBtn').style.display = 'none';
            document.getElementById('logoutBtn').style.display = 'block'
            document.getElementById('msg').innerHTML = `<h3>${message + ' ' + json.username}</h3>`;
            document.getElementById('msg').style.display = 'block';
        }).catch(err => {
            console.log('ERROR -->', err)
            alert(err);
        })
    };

    document.getElementById('logoutBtn').onclick = function () {
        document.getElementById('loginBtn').style.display = 'inline-block';
        document.getElementById('logoutBtn').style.display = 'none';
        document.getElementById('username').style.display = 'inline-block';
        document.getElementById('password').style.display = 'inline-block';
        document.getElementById('wlc').style.display = 'inline-block';
        document.getElementById('msg').style.display = 'none';
        sessionStorage.clear();
    }
};

function loadSongs() {
    fetch('http://localhost:3000/songs/all', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + sessionStorage.getItem('session_id')
            }
        }).then(function(res){
            console.log('res', res);
            if (res.status == 200) {
                return res.json();
            }
        }).then(function(res) {
            console.log('songs res', res);
            let table = document.getElementById('tableSongs');
            for(let i = 0; i < res.length; i++) {
                let song = res[i];

                let row = table.insertRow(i + 1);
                let cell0 = row.insertCell(0);
                cell0.innerHTML = song.id;
                let cell1 = row.insertCell(1);
                cell1.innerHTML = song.title;
                let cell2 = row.insertCell(2);

                let buttonAdd = document.createElement("button");
                buttonAdd.innerHTML = "Add";
                buttonAdd.onclick = function(){
                    addSong(song.id);
                };
                cell2.appendChild(buttonAdd);   
            }

        }).catch(function(err){
            console.log('songs err', err);
        });


        fetch('http://localhost:3000/songs/myplaylist', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + sessionStorage.getItem('session_id')
            }
        }).then(function(res){
            if (res.status == 200) {
                return res.json();
            }
        }).then(function(res) {
            console.log('playlist res', res);
            let table = document.getElementById('tablePlaylist');
            for(let i = 0; i < res.length; i++) {
                let song = res[i];

                let row = table.insertRow(i + 1);
                let cell0 = row.insertCell(0);
                cell0.innerHTML = song.id;
                let cell1 = row.insertCell(1);
                cell1.innerHTML = song.title;
                let cell2 = row.insertCell(2);

                let buttonAdd = document.createElement("button");
                buttonAdd.innerHTML = "Play";
                cell2.appendChild(buttonAdd);   
            }

        }).catch(function(err){
            console.log('songs err', err);
        });
}

function addSong(id){
    fetch('http://localhost:3000/songs/'+id, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + sessionStorage.getItem('session_id')
        }
    }).then(function(res){
        if (res.status == 200) {
            return res.json();
        }
    }).then(function(res) {
        console.log('songs added res', res);
        fetch('http://localhost:3000/songs/myplaylist', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + sessionStorage.getItem('session_id')
            }
        }).then(function(res){
            if (res.status == 200) {
                return res.json();
            }
        }).then(function(res) {
            console.log('added playlist res', res);
            let table = document.getElementById('tablePlaylist');
            var rowCount = table.rows.length;
            let first = 1;
            for (var i = first; i < rowCount; i++) {
                table.deleteRow(first);
            }
            for(let i = 0; i < res.length; i++) {
                let song = res[i];

                let row = table.insertRow(i + 1);
                let cell0 = row.insertCell(0);
                cell0.innerHTML = song.id;
                let cell1 = row.insertCell(1);
                cell1.innerHTML = song.title;
                let cell2 = row.insertCell(2);

                let buttonAdd = document.createElement("button");
                buttonAdd.innerHTML = "Play";
                cell2.appendChild(buttonAdd);  
            }

        }).catch(function(err){
            console.log('songs err', err);
        });

    }).catch(function(err){
        console.log('songs added err', err);
    });
}