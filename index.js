var wsc = require('websocket').client;
var zlib = require('zlib');
 
var client = new wsc();
 
client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});
 
client.on('connect', function(connection) {
    connection.on('error', function(error) {
        console.log("huobi connection error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('huobi disconnected');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
        else if (message.type === 'binary') {
            zlib.gunzip(message.binaryData, function(err, dezipped) {
                console.log(dezipped.toString());
            });
        }
    });
    console.log("huobi connected");
    connection.sendUTF('{"sub": "market.ethusdt.kline.1min","id": "id10"}');
});
 
client.connect('wss://api.huobipro.com/ws');
