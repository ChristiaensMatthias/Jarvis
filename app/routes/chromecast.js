// let chromecast = require('chromecast')();
// chromecast.discover();
//
// function chromecastAPI(videoData){
//     chromecast.on('device', function(device){
//       device.launch( videoData.mediaType , {
//         v: videoData.source
//       });
//     });
// }
//
// module.exports = function(app){
//     app.route('/chromecast').post(function(req, res){
//         let videoData = req.body;
//         console.log(videoData);
//         chromecastAPI(videoData);
//         res.sendStatus(304);
//     });
// };