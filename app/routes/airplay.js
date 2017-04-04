let browser = require('airplay').createBrowser();


function airPlay(){
    console.log("hello airplay");
    browser.on('deviceOnline', function(device){
        console.log('device online: ' + device.id);
        device.play('http://host/somevideo.mp4', 0);
    });
    browser.start();
}

module.exports = function(app){
    app.route('/airplay').post(function(req, res){
        airPlay();
        res.sendStatus(304);
    });
};



// function myHandler() {
//   let devices = browser.getDevices();
//   console.log(devices);
// }


// let device = require('airplay').connect(deviceHost);
// device.on('ready', function() {
//   // Ready to accept commands
// });
