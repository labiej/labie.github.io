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
    ctx.fillStyle = "transparent";
    ctx.lineWidth = 1;
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

    // Begin Drawing
    ctx.beginPath();
    ctx.moveTo( x1, flipY*y1 );
    ctx.lineTo( x2, flipY*y2);
    ctx.closePath();
    // END Drawing

    // Begin styling
    ctx.stroke();

    clearStyling();
  };

  var drawArrow = function(fromx, fromy, tox, toy, styles){

    setStyling( styles );

    var headlen = 10;   // length of head in pixels
    var angle = Math.atan2(flipY*(toy-fromy),tox-fromx);

    ctx.beginPath();
    ctx.moveTo(fromx, flipY*fromy);
    ctx.lineTo(tox, flipY*toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),flipY*toy-headlen*Math.sin(angle-Math.PI/6));
    ctx.moveTo(tox, flipY*toy);
    ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),flipY*toy-headlen*Math.sin(angle+Math.PI/6));
    ctx.closePath();
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
    ctx.closePath();
    clearStyling();
  };

  /* HIGH LEVEL WRAPPERS FOR COMBINED DRAWINGS */
  /* Draw axes */
  var drawAxes = function ( styles ){
    styles = styles || {stroke: defaultStyles.axes};

    drawArrow( 0, -0.5*ctxHeight, 0, 0.5*ctxHeight, styles);
    drawArrow( -0.5*ctxWidth, 0, 0.5*ctxWidth, 0, styles);
  };

  var drawPolygon = function ( points, styles ){
    if ( points.constructor !== Array ){
      console.log( 'Array error' );
      return null;
    }
    setStyling( styles );

    // Get first point (also the last)
    var first = points.shift();
    if ( first.constructor !== Object ){
      console.log( "First object error");
      return null;
    }
    var i = 1;
    ctx.beginPath();
    ctx.moveTo( first.x, flipY*first.y );

    for ( i = 0; i < points.length; i++ ){
      var point = points[ i ];
      if ( point.constructor !== Object ){
        console.log( "loop object error in " + i + "th iteration" );
        i++;
        console.dir( point );
        return null;
      }


      ctx.lineTo( point.x, flipY*point.y );
    }

    ctx.lineTo( first.x, flipY*first.y );
    ctx.closePath();

    ctx.stroke();
    ctx.fill();

    clearStyling();
  };

  var drawRectangle = function( fromx, fromy, tox, toy, styles ){
    if ( isNaN(fromx) || isNaN(fromy) || isNaN(tox) || isNaN(toy) ){
      console.error( "At least one argument is not a number!" );
      return null;
    }

    var width = abs( fromx - tox );
    var height = abs( fromy - toy );

    

  };

  return {
    drawAxes: drawAxes,
    drawLine: drawLine,
    drawArrow: drawArrow,
    drawCircle: drawCircle,
    drawPolygon: drawPolygon,
    'flipY': setYdirection,
  };

});
