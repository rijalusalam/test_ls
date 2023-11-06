const dataConnection = document.getElementById('DATA_CONNECTION');
const wifiConnection = document.querySelector('.button-drop-down-wifi');
const wifiConfiguration1 = document.querySelector('.wifi_setting1');
const wifiConfiguration2 = document.querySelector('.wifi_setting2');
const wifiConfiguration3 = document.querySelector('.wifi_setting3');
const inputDeviceName = document.getElementById('deviceName');
const inputDeploymentLocation = document.getElementById('deploymentLocation');
const inputProductionNumber = document.getElementById('productionNumber');
const inputUsernameID = document.getElementById('usernameID');
const inputPasswordID = document.getElementById('passwordID');
const inputDATA_CONNECTION = document.getElementById('DATA_CONNECTION');
const inputDeviceIP = document.getElementById('deviceIP');
const inputIpServer = document.getElementById('ipServer');
const inputIpGateway = document.getElementById('ipGateway');
const inputButton_qc = document.getElementById('button_qc');
const inputWifiConfiguration = document.getElementById('wifiConfiguration');
const inputWifiIP = document.getElementById('wifiIP');
const inputWifiGateway = document.getElementById('wifiGateway');
const inputWifiSSID = document.getElementById('wifiSSID');
const inputWifiPASSWORD = document.getElementById('wifiPASSWORD');
const inputSaveButton = document.getElementById('saveButton_');
const switchElement = document.getElementById("button_qc");


let inputDeviceNameVal;
let inputDeploymentLocationVal;
let inputProductionNumberVal;
let inputUsernameIDVal;
let inputPasswordIDVal;
let inputDATA_CONNECTIONVal;
let inputDeviceIPVal;
let inputIpServerVal;
let inputIpGatewayVal;
let inputButton_qcVal;
let inputWifiConfigurationVal;
let inputWifiIPVal;
let inputWifiGatewayVal;
let inputWifiSSIDVal;
let inputWifiPASSWORDVal;
let inputSaveButtonVal;
let chartPage_Val;



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
    jsonData['page'] = 'config_page';
    websocket.send(JSON.stringify(jsonData));
    console.log(JSON.stringify(jsonData))
}

function onClose(event) {
    console.log('Connection closed');
    setTimeout(initWebSocket, 2000);
}

switchElement.checked = Number('0');
// Function that receives the message from the ESP32 with the readings
function onMessage(event) {
    var myObj = JSON.parse(event.data);
    var keys = Object.keys(myObj);
    console.log(keys);

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key == 'button_qc') {
            switchElement.checked = Number(myObj[key]);
            if (Number(myObj[key]) === 1) {
                chartPage_Val = 1;
                console.log("chart =1 ");
            }
            else if (Number(myObj[key]) === 0) {
                chartPage_Val = 0;
                console.log("chart =0 ");
            }
            console.log("button bosss");
            console.log(myObj[key])
        }
        else {
            document.getElementById(key).value = myObj[key];
        }
        console.log(myObj[key]);
    }
}

dataConnection.addEventListener('change', () => {
    switch (dataConnection.value) {
        case 'Ethernet':
            wifiConfiguration1.style.display = 'block';
            wifiConfiguration2.style.display = 'block';
            wifiConfiguration3.style.display = 'block';
            break;
        case 'Wifi':
            wifiConfiguration1.style.display = 'none';
            wifiConfiguration2.style.display = 'none';
            wifiConfiguration3.style.display = 'none';
            break;
    }
});

function update(header, value) {
    let jsonData = {};
    jsonData[header] = document.getElementById(header).value;
    if (header == 'button_qc') {
        jsonData[header] = switchElement.checked;
    }
    websocket.send(JSON.stringify(jsonData));
    console.log(JSON.stringify(jsonData))
}


inputWifiConfiguration.addEventListener('input', () => {
    inputWifiConfigurationVal = inputWifiConfiguration.value;
    console.log(inputWifiConfigurationVal);
});

inputSaveButton.addEventListener('click', () => {
    let confirmation = confirm("Are you sure to Save the Settings ?")
    if (confirmation) {
        let jsonData = {};
        jsonData['saveButton'] = 'save';
        websocket.send(JSON.stringify(jsonData));
        console.log(JSON.stringify(jsonData));
        alert("Data Has Been Saved !! \n Please Reload your Login Page!!");
        window.location.href = "login_page.html";
    }
    else {

    }
});
document.getElementById("chart_page").addEventListener('click', () => {
    if (chartPage_Val === 1)
        window.location.href = "chart.html";
    else if(chartPage_Val === 0)
        alert("Please Turn ON the QC Feature");
});

document.getElementById("home_page").addEventListener('click', () => {
    location.reload();
});



