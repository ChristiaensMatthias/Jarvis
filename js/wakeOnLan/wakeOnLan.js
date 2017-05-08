function wakeOnLan() {
    let url = SERVICE_URI.WAKEONLAN;
    $.ajax({
        url: url,
        method: 'GET',
        cache: false,
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true
    });
}

let wakeOnLanCommands = {
    'start PC': function(){
        wakeOnLan();
    }
};

console.log("----- Wake on Lan Commands -----");
annyang.addCommands(wakeOnLanCommands);