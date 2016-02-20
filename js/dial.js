// .rotate() DEMO
$(function() {
  rotate = function($element) {
    $element.rotate({ count:4, duration:0.3, easing:'ease-out' });
  }

  $(document).ready(function() {
    rotate($('.spinner'));
  });

  $('.spinner').click(function() {
    rotate($(this));
  });
});



//http://jsfiddle.net/NYJWx/4/

// var options = {
//   useEasing : false,
//   useGrouping : false,
//   separator : ',',
//   decimal : '.',
//   prefix : '',
//   suffix : ''
// };
//
// var numAnim = new CountUp("myTargetElement", 0, 5, 0, 0.5, options);
// numAnim.start();


//when json file is called, pendulum swings to designation
//designation is 1-10
//need to use if else loop
//number is called in center
//hardcode the total minutes let's say "10"
//360 is the circle
//1 minute equals 36 degrees
//whenever I get the value 5 it should multiply that by 36
// var degree = ed_stats[0]['started']*(360/10)
//the variable should go inside the css transform
$.getJSON( "http://localhost:3000/ed_stats", function( ed_stats ) {


  // console.log(degree, degreeWaiting);
  $( ".spin-container" ).each(function( index ) {
    if(index == 0){
      var value = "started";
    }
    else if (index == 1){
      var value = "waiting";
    }
    var minutes = ed_stats[0][value].toFixed(1);
    if (minutes <= 0){
      var degree = 0;
      var minutes = 0;
    }
    else if (minutes > 10) {
      var degree = 360-5
      var minutes = "10+"
    }
    else {
      var degree = minutes*(360/10);
    }

    $(this).find(".numbers").html(minutes);
    console.log(degree)
    $(this).find(".blowdup").css({"transform": "rotate("+ degree + "deg)","transition": "all 1.3s ease"});

  });
  // $('.pendulum').css({"transform": "rotate("+ degree + "deg)","transition": "all 1.3s ease"});
});

// $( ".numbers" ).each(function( index ) {
//   if(index == 0){
//     var value = "started";
//   }
//   else if (index == 1){
//     var value = "waiting";
//   }
//   var degree = ed_stats[0][value]*(360/10)-5;
//   var numAnim = new CountUp(this, 0, degree, 0, 0.5, options);
//   numAnim.start();
//
// });
// // $('.pendulum').css({"transform": "rotate("+ degree + "deg)","transition": "all 1.3s ease"});
