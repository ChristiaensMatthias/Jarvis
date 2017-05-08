
function airPlay(trackUrl) {
    let url = SERVICE_URI.AIRPLAY;
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