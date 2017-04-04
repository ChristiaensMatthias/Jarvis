function airPlay(trackUrl) {
    let url = "http://localhost:9000/airplay";
    $.ajax({
        url: url,
        method: 'POST',
        data: trackUrl,
        cache: false,
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true
    });
}