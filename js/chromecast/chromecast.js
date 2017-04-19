let youtubePlaylistArray = [];
let twitchPlaylistArray = [];
let netflixTab;
let youtubeTab;
let twitchTab;
let playlistId = 0;

function getFormat(mediaType, videoName){
    if(mediaType == "netflix"){
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
    }else if(mediaType == "youtube"){
        youtubeUrl = "http://localhost:9000/ytsearch";
        let query = "mediaType="+mediaType+"&videoName="+videoName;
        $.ajax({
            url: youtubeUrl,
            method: 'POST',
            data: query,
            cache: false,
            success:function(result){
                console.log(result);
                for(let i = 0; i < result.length; i++){
                    console.log(result[i].id);
                    youtubePlaylistArray.push(result[i].id);
                }
                searchMedia(query);
            }
        });
    }else if(mediaType == "twitch"){
        twitchUrl = "https://api.twitch.tv/kraken/search/streams?q=" + videoName;
        console.log("twitch url: ",twitchUrl);
        let query = "mediaType="+mediaType+"&videoName="+videoName;
        $.ajax({
            url: twitchUrl,
            method: 'GET',
            headers: {
                'Client-ID': 'j4uu2klaw648o4akserecaf0j2jxt2'
            },
            cache: false,
            success:function(result){
                for(let k = 0; k < result.streams.length; k++){
                    console.log(result.streams[k].channel.url);
                    twitchPlaylistArray.push(result.streams[k].channel.url);
                }
                searchMedia(query);
            }
        });
    }
}

function nextVid(){
    playlistId++;
    console.log(playlistId);
    if(youtubeTab){
        youtubeTab.location.href = "https://www.youtube.com/watch/"+ youtubePlaylistArray[playlistId];
    }else if(twitchTab){
        twitchTab.location.href = twitchPlaylistArray[playlistId];
    }
}

function previousVid(){
    playlistId--;
    console.log(playlistId);
    if(youtubeTab){
        youtubeTab.location.href = "https://www.youtube.com/watch/"+ youtubePlaylistArray[playlistId];
    }else if(twitchTab){
        twitchTab.location.href = twitchPlaylistArray[playlistId];
    }
}

function searchMedia(videoData){
    let parsedData = $.parseJSON('{"' + videoData.replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    let source = parsedData.videoName;
    // Testing purposes
    if(parsedData.mediaType == "netflix"){
        window.open("https://www.netflix.com/watch/"+ source);
    }else if(parsedData.mediaType == "youtube"){
        if(!youtubeTab){
            youtubeTab = window.open("https://www.youtube.com/watch/"+ youtubePlaylistArray[playlistId]);
        }else{
            youtubeTab.close();
            youtubeTab = window.open("https://www.youtube.com/watch/"+ youtubePlaylistArray[playlistId]);
        }
    }else if(parsedData.mediaType == "twitch"){
        twitchTab = window.open(twitchPlaylistArray[playlistId])
    }

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
        youtubePlaylistArray = [];
        twitchPlaylistArray = [];
        getFormat(media, video);
    }
};

console.log("----- Chromecast commands -----");
annyang.addCommands(chromecastCommands);



// VOICE DISABLED
function chromecastAPI() {
    youtubePlaylistArray = [];
    twitchPlaylistArray = [];
    let mediaType = document.getElementById('format').value;
    let videoName = document.getElementById('videoSource').value;
    getFormat(mediaType, videoName);
}