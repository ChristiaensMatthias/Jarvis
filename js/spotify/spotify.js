let audio = new Audio();

function searchTracks(query){
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: query,
            type: 'track'
        },
        success: function (response) {
            if (response.tracks.items.length) {
                let track = response.tracks.items[0];

                console.log(track);

                audio.src = track.preview_url;
                audio.play();
                console.log("success");
                airPlay(track.preview_url);
            }
        }
    });
}

function playSong(songName, artistName) {
    let query = songName;
    if (artistName) {
        query += ' artist:' + artistName;
    }
    searchTracks(query);
}

let spotifyCommands = {
    'stop': function () {
        audio.pause();
    },

    'play track *song': function(song){
        playSong(song);
    },

    'play *song by *artist': function(song, artist){
        playSong(song, artist);
    },

    'play *song': function(song){
        playSong(song);
    },

    'play song *song': function(song){
        playSong(song);
    }
};

console.log("----- Spotify commands -----");
annyang.addCommands(spotifyCommands);




