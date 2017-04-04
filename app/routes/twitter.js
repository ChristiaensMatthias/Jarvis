let Twitter = require('twitter');
let config = require('../config/config');

let client = new Twitter({
  consumer_key: config.CONSUMER_KEY,
  consumer_secret: config.CONSUMER_SECRET,
  access_token_key: config.ACCESS_TOKEN_KEY,
  access_token_secret: config.ACCESS_TOKEN_SECRET
});

module.exports = function(app){
    app.route('/twitter').post(function(req, res){
        console.log(req.body.hashtag);
        hashtag = req.body.hashtag;

        client.get('search/tweets', {q: hashtag}, function(error, tweets, response) {
          if(error) throw error;
            res.json(tweets);
          // console.log(response);  // Raw response object.
        });
    });
};