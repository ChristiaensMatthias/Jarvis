let machineState = false;

_speak = function(){
    responsiveVoice.speak(reply, "UK English Male", {pitch: 1});
};

function power(){
    if(machineState == false){
        machineState = true;
        $(".view").addClass("view-active");
    }
}

let socket = io.connect('http://www.localhost:9000');

socket.on('clap-detection.server', function(state) {
    if(state == true){
        amplifier("on");
    }
});


// Turn on debug messages
annyang.debug();
// Define sample command

let commands = {
    'jarvis': function(){
        power();
        reply = "Yes sir?";
        _speak();
    },

    'hello': function() {
        console.log('world');
        reply = "Hello sir";
        _speak();
    },

    'amplifier': function(){
        console.log('Amplifier wut?');
        reply = "Amplifier";
        _speak();
    },

    'time': function(){

        _speak();
    },

    'weather': function(){
        getWeather(globalPosition);
    },

    'current location': function(){
        console.log(globalPosition);
    }
};

console.log("----- global commands -----");
annyang.addCommands(commands);


annyang.start();

annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
  console.log(userSaid); // sample output: 'hello'
  console.log(commandText); // sample output: 'hello (there)'
  console.log(phrases); // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']
});



   // $('div').addClass('open');




