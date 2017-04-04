let wol = require('node-wol');
let config = require('../config/config');

function wakeOnLan(){
    console.log(config.PHYSICAL_ADDR);
    // wol.wake(config.physical_addr);
}

module.exports = function(app){
    app.route('/wakeonlan').get(function(req, res){
        wakeOnLan();
        res.sendStatus(304);
    });
};

// let magicPacket = wol.createMagicPacket('');
