/* jshint esversion: 6 */

var MyCanvas = ( function( context ){
  var ctx = context;
  var ctxWidth = ctx.canvas.clientWidth;
  var ctxHeight = ctx.canvas.clientHeight;

  ctx.translate( 0.5*ctxWidth, 0.5*ctxHeight);

  var flipY = -1;

  var defaultStyles = {
    stroke: "#000",
    fill: "transparent",
    axes: "#666",
    circle: {
      stroke: "#F00",
      fill: "transparent"
    },
    line: {
      width: 1,
      stroke: "#000"
    }
  };

  var styleProperties ={
    stroke: "strokeStyle",
    fill: "fillStyle",
    width: "lineWidth"
  };

  var accepted = ["stroke", "fill", "width"];

  /* Instead of separated request them as an object
  #
  # @param styles: object with styles like
  #                - stroke
  #                - fill
  #                - linewidth
  #
  # @return: void, styling is applied inside the function
  #
  # Remark: call clearStyling after ending the drawing function
  */
  var setProp = function ( prop, val ){
    ctx[prop] = val;
  };

  var setStyling = function( styles  ){

    if( typeof styles === 'undefined' )
    return;

    var styleNames = Object.getOwnPropertyNames(styles);

    styleNames = styleNames.filter( function(el){
      return (accepted.indexOf(el) > -1);
    });

    styleNames.forEach( (name) => setProp(styleProperties[name], styles[name]) );

  };

  /* Restore styling to default */
  var clearStyling = function( ){
    ctx.restore();
  };

  /* Flip Y-direction */
  var setYdirection = function ( flip ){
    if( typeof flip !== 'boolean')
      return false;

    if( flip ){
      flipY = -1;
    }else if( !flip ){
      flipY = 1;
    }else{
      return undefined;
    }
  };

  /* Simple functions */

  var drawLine = function( x1, y1, x2, y2, styles){

    setStyling( styles );

    ctx.moveTo( x1, flipY*y1 );
    ctx.lineTo( x2, flipY*y2);
    ctx.stroke();

    clearStyling();
  };

  var drawArrow = function(fromx, fromy, tox, toy, styles){

    setStyling( styles );

    var headlen = 10;   // length of head in pixels
    var angle = Math.atan2(flipY*(toy-fromy),tox-fromx);
    ctx.moveTo(fromx, flipY*fromy);
    ctx.lineTo(tox, flipY*toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),flipY*toy-headlen*Math.sin(angle-Math.PI/6));
    ctx.moveTo(tox, flipY*toy);
    ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),flipY*toy-headlen*Math.sin(angle+Math.PI/6));

    ctx.stroke();

    clearStyling();
  };
  /* Draw a circle */
  var drawCircle = function ( cx, cy, r, styles){

    setStyling( styles );

    ctx.beginPath();
    ctx.arc(cx,flipY*cy,r,0,2*Math.PI);
    ctx.stroke();
    ctx.fill();

    clearStyling();
  };

  /* HIGH LEVEL WRAPPERS FOR COMBINED DRAWINGS */
  /* Draw axes */
  var drawAxes = function ( styles ){
    styles = styles || {stroke: defaultStyles.axes};

    drawArrow( 0, -0.5*ctxHeight, 0, 0.5*ctxHeight, styles);
    drawArrow( -0.5*ctxWidth, 0, 0.5*ctxWidth, 0, styles);
  };

  return {
    drawAxes: drawAxes,
    drawLine: drawLine,
    drawArrow: drawArrow,
    drawCircle: drawCircle,
    'flipY': setYdirection,
  };

});
