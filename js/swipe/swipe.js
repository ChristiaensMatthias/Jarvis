$(function() {
    let swipeDiv = document.getElementById('swipe-panel');
      $("#swipe-panel").swipe( {
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
          // $(this).text("You swiped " + direction );
            if(direction == "left"){
                console.log("left");
                $(this).addClass("hide-left");
                $(".microphone-enabled").css("display", "block");
            }else if(direction == "right"){
                console.log("right");
                $(this).addClass("hide-right");
                $(".microphone-disabled").css("display", "block");
            }

        },
         threshold:0
      });
});


