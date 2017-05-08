
function amplifier(state) {
    let url = SERVICE_URI.AMPLIFIER;

    $.ajax({
        url: url,
        method: 'POST',
        data: state,
        cache: false,
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true
    })
}

let amplifierCommands = {
    'power *state': function(state){
        amplifier({"state": state});
    },

    'mute': function(){
        amplifier("mute");
    },

    'unmute': function(){
        amplifier("unmute");
    }
};

console.log("----- Amplifier Commands -----");
annyang.addCommands(amplifierCommands);