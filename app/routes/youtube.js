let search = require('youtube-search');
let config = require('../config/config');


let opts = {
  maxResults: 20,
  key: config.YT_API_KEY
};

function youTubeSearch(videoData, callback){
    search(videoData.videoName, opts, function(err, results) {
      if(err) return console.log(err);

      callback(results);
    });
}

module.exports = function(app){
    app.route('/ytsearch').post(function(req, res){
        videoData = req.body;
        youTubeSearch(videoData, function(results){
            res.json(results)
        });
    });
};