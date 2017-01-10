
/* Set length of arc in svg */

function setProgress( $circle, unset = false){
  var val = !unset ? $circle.parent().parent().attr('data-pct')
									 : 0;
	console.log( !unset ? 'inside viewport' : 'outside' );
	console.log( "value: " + val );
  var radius = $circle.attr('r');
  var circumference = Math.PI*(radius*2);

	var strokeOffset;

  if (val < 0) {
		val = 0;
		$circle.parent().parent().attr('data-pct',val);
	}
  if (val > 100) {
		val = 100;
		$circle.parent().parent().attr('data-pct',val);
	}

  strokeOffset = ((100-val)/100)*circumference;

  $circle.css({ strokeDashoffset: strokeOffset});


}

/* INITIALISE LISTENERS */
$(document).ready(function(){
  var i;

  $('.scrollspy').scrollSpy();

  $('.progress > .svg > .bar').inViewport(
		function(){ setProgress( $(this) ) },
		function() { setProgress( $(this), true) }
	);

  /* Rotate logo once */
  $('.svg-logo').addClass("rotator");


});