// .rotate() DEMO
$(function() {
  rotate = function($element) {
    $element.rotate({ count:4, duration:0.3, easing:'ease-out' });
  }

  $(document).ready(function() {
    rotate($('#spinner'));
  });

  $('#spinner').click(function() {
    rotate($(this));
  });
});

$('#pendulum').click(function() {
   $(this).addClass('box_rotate box_transition');
}).click();
//http://jsfiddle.net/NYJWx/4/

var options = {
  useEasing : false,
  useGrouping : false,
  separator : ',',
  decimal : '.',
  prefix : '',
  suffix : ''
};

var numAnim = new CountUp("myTargetElement", 0, 5, 0, 0.5, options);
numAnim.start();
