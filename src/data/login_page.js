let username;
let password;
var gateway = `ws://${window.location.hostname}/ws`;
var websocket;

window.addEventListener('load', onload);


function onload(event) {
    initWebSocket();
}

function initWebSocket() {
    console.log('Trying to open a WebSocket connection…');
    websocket = new WebSocket(gateway);
    websocket.onopen = onOpen;
    websocket.onclose = onClose;
    websocket.onmessage = onMessage;
}

function onOpen(event) {
    let jsonData = {};
    jsonData['page'] = 'login_page';
    websocket.send(JSON.stringify(jsonData));
    console.log(JSON.stringify(jsonData))
}

function onClose(event) {
    console.log('Connection closed');
    setTimeout(initWebSocket, 2000);
}

function onMessage(event) {
    var myObj = JSON.parse(event.data);
    var keys = Object.keys(myObj);
    console.log(keys);

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key == 'usernameID') {
            username=myObj[key];
            console.log(username);
        }
        if (key == 'passwordID') {
            password=myObj[key];
            console.log(password);
        }
        console.log(myObj[key]);
    }
}

document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;

    // Cek ID dan kata sandi (dummy data, Anda harus menggantinya dengan logika autentikasi yang sesungguhnya)
    if (usernameInput == username && passwordInput == password) {
        window.location.href = "index.html";
    } 
    else {
        alert("Kode yang Anda masukkan salah, silahkan coba lagi.");
    }

    message.style.display = "block";
});

