// window.addEventListener('load', getReadings);

var gateway = `ws://${window.location.hostname}/ws`;
var websocket;
let jsonData = {};

window.addEventListener('load', onload);

var chartT = new Highcharts.Chart({
    chart: {
        renderTo: 'chart-temperature'
    },
    series: [
        {
            name: 'Temperature #1',
            type: 'line',
            color: '#101D42',
            marker: {
                symbol: 'circle',
                radius: 3,
                fillColor: '#101D42',
            }
        },
        {
            name: 'Temperature #2',
            type: 'line',
            color: '#00A6A6',
            marker: {
                symbol: 'square',
                radius: 3,
                fillColor: '#00A6A6',
            }
        },
        {
            name: 'Temperature #3',
            type: 'line',
            color: '#8B2635',
            marker: {
                symbol: 'triangle',
                radius: 3,
                fillColor: '#8B2635',
            }
        },
        {
            name: 'Temperature #4',
            type: 'line',
            color: '#71B48D',
            marker: {
                symbol: 'triangle-down',
                radius: 3,
                fillColor: '#71B48D',
            }
        },
    ],
    title: {
        text: undefined
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { second: '%H:%M:%S' }
    },
    yAxis: {
        title: {
            text: 'Temperature Celsius Degrees'
        }
    },
    credits: {
        enabled: false
    }
});


function plotTemperature(jsonValue) {

    var keys = Object.keys(jsonValue);
    console.log(keys);
    console.log(keys.length);

    for (var i = 0; i < keys.length; i++) {
        var x = (new Date()).getTime();
        console.log(x);
        const key = keys[i];
        var y = Number(jsonValue[key]);
        console.log(y);

        if (chartT.series[i].data.length > 100) {
            chartT.series[i].addPoint([x, y], true, true, true);
        } else {
            chartT.series[i].addPoint([x, y], true, false, true);
        }

    }
}



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


function update(header, value) {
    jsonData[header] = document.getElementById(header).value;
}

// When websocket is established, call the getReadings() function
function onOpen(event) {
    let jsonData = {};
    jsonData['page'] = 'chart_page';
    websocket.send(JSON.stringify(jsonData));
    console.log(JSON.stringify(jsonData))
}

function onClose(event) {
    console.log('Connection closed');
    setTimeout(initWebSocket, 2000);
}

var myButton = document.getElementById('myButton');
myButton.addEventListener('click', () => {
    websocket.send(JSON.stringify(jsonData));
    console.log(JSON.stringify(jsonData))
});


myButton.style.display = 'inline-block';
myButton.style.padding = '10px 20px';
myButton.style.backgroundColor = '#0074D9';
myButton.style.color = '#fff';
myButton.style.textDecoration = 'none';
myButton.style.borderRadius = '5px';
myButton.style.transition = 'background-color 0.3s';


myButton.addEventListener('mouseover', function () {
    myButton.style.backgroundColor = '#0056a1';
});

myButton.addEventListener('mouseout', function () {
    myButton.style.backgroundColor = '#0074D9';
});

inputSaveButton.addEventListener('click', () => {
    let jsonData = {};
    jsonData['saveButton'] = 'save';
    websocket.send(JSON.stringify(jsonData));
    console.log(JSON.stringify(jsonData))
    location.reload();
});



// Function that receives the message from the ESP32 with the readings
function onMessage(event) {
    var myObj = JSON.parse(event.data);
    let plotJson = {};
    var keys = Object.keys(myObj);
    console.log(keys);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        document.getElementById(key).innerHTML = myObj[key];
        console.log(myObj[key]);
        console.log("property:" + key);
        if (key == 'imuAngle') {
            console.log('imuAngle:' + myObj[key]);
            plotJson['imuAngle'] = myObj[key];
        }
        if (key == 'tickAngle') {
            console.log('imuAngle:' + myObj[key]);
            plotJson['tickAngle'] = myObj[key];
            plotTemperature(plotJson);
        }
    }
}
