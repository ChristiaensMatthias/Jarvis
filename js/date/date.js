function currentTime(){
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    console.log(h + " : " +m);

    let currentTime = JSON.stringify(d);
    console.log(currentTime);

    if(h >= 12 && h<=24){
       reply = "The time is " + h + " : " + m + " pm";
        _speak();
    }else{
        reply = "The time is " + h + " : " + m + " am";
        _speak();
    }


}
