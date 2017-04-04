//STARTUP NODE SERVER
let express         = require('express');
let app             = express();
let bodyParser      = require('body-parser');
let clapDetector    = require('clap-detector');


//SETTING HEADERS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:63343');
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//LOAD IN ROUTES
require('./routes/amplifier')(app);
require('./routes/twitter')(app);
require('./routes/hueLamps')(app);
// require('./routes/chromecast')(app);
require('./routes/wakeOnLan')(app);

//STARTING SERVER
let port = process.env.PORT || 9000;
let server = app.listen(port);
let io          = require('socket.io')(server);

console.log('Magic happens on port ' + port);




//LOAD IN SOCKETS
io.on('connection', function(client){
    let clapConfig = {
        //CLAP CONFIG
        // AUDIO_SOURCE: 'coreaudio', // default for linux
        DETECTION_PERCENTAGE_START : '50%', // minimum noise percentage threshold necessary to start recording sound
        DETECTION_PERCENTAGE_END: '10%',  // minimum noise percentage threshold necessary to stop recording sound
        // // CLAP_AMPLITUDE_THRESHOLD: 0.7, // minimum amplitude threshold to be considered as clap
        // // CLAP_ENERGY_THRESHOLD: 0.3,  // maximum energy threshold to be considered as clap
        // // MAX_HISTORY_LENGTH: 10 // all claps are stored in history, this is its max length
    };


    clapDetector.start(clapConfig);

    clapDetector.onClap(function(history) {
        console.log("clapped");
    });

    clapDetector.onClaps(2, 1000, function(delay) {
        console.log("clapped 2 times");
        io.sockets.emit('clap-detection.server', true);
    });

    console.log("connected");
});

