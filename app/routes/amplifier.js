let Yamaha = require("yamaha-nodejs");
let yamaha = new Yamaha();

function amplifier(command){
    // command = mute/unmute
    console.log("amplifier command", command);

    switch(command.state){
        case 'on':
            yamaha.powerOn();
            break;

        case 'off':
            yamaha.powerOff();
            break;

        case 'mute':
            yamaha.muteOn();
            break;

        case 'unmute':
            yamaha.muteOff();
            break;
    }
}

module.exports = function(app){
    app.route('/amplifier').post(function(req, res){
        command = req.body;
        amplifier(command);
        res.sendStatus(304);
    });
};