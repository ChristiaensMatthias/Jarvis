function getFormat(mediaType, videoName){
    let netflixUrl = "http://netflixroulette.net/api/api.php?title=" + videoName;
    $.ajax({
        url: netflixUrl,
        method: 'GET',
        cache: false,
        success:function(result){
            videoName = result.show_id;
            let query = "mediaType="+mediaType+"&videoName="+videoName;
            searchMedia(query);
        }
    });
}

function searchMedia(videoData){
    let parsedData = $.parseJSON('{"' + videoData.replace(/&/g, '","').replace(/=/g, '":"') + '"}');

    let source = parsedData.videoName;
    // Testing purposes
    window.open("https://www.netflix.com/watch/"+ source);

    // ACTUAL CODE CHROMECAST

    // let url = "http://localhost:9000/chromecast";
    // $.ajax({
    //     url: url,
    //     method: 'POST',
    //     cache: false,
    //     data: videoData,
    //     dataType: 'json',
    //     xhrFields: {
    //         withCredentials: true
    //     },
    //     crossDomain: true
    // });
}

// VOICE ENABLED

let chromecastCommands = {
    'stop chromecast': function () {
        audio.pause();
    },

    'watch *media *video': function(media, video){
        getFormat(media, video);
    }
};

console.log("----- Chromecast commands -----");
annyang.addCommands(chromecastCommands);



// VOICE DISABLED
function chromecastAPI() {
    let mediaType = document.getElementById('format').value;
    let videoName = document.getElementById('videoSource').value;

    if(mediaType == "netflix"){
        getFormat(mediaType, videoName);
    }else{
        searchMedia(videoData)
    }
}