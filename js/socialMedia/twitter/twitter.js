let wrapper = document.getElementById("carousel");

function twitterAPI(twitterData) {
    let hashTag = document.getElementById('hashy').value;
    let hashTagData = 'hashtag='+hashTag;
    console.log(hashTagData);

    let url = "http://localhost:9000/twitter";

    $.ajax({
        url: url,
        method: 'POST',
        cache: false,
        data: hashTagData,
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success:function(result){
            console.log(result.statuses[1].entities);
            imgSrc = result.statuses[1].entities.urls[0].expanded_url;

            let img = $('<img />', { src: imgSrc , width: 200}).appendTo($(wrapper));

        }
    });
    // .done(function(result){
    //     console.log(result);
    //     return data;
    // })
}