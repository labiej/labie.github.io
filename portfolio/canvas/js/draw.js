var canvasElement = document.getElementById('draw')

var myCanvas = new MyCanvas(canvasElement, false);

myCanvas.drawAxes();
myCanvas.drawCircle( 0, 0, 15, { fill: '#F0F' });
myCanvas.drawCircle( 0, 0, 30);
myCanvas.drawCircle( 15, 15, 35, {stroke: '#FFF', fill: 'rgba(255,0,0,0.3)'});

var polygon = [
  { x: -100, y: 0},
  { x: -75, y: 50},
  { x: 0, y: 10},
  { x: 0, y: 0},
];

var retval = myCanvas.drawPolygon( polygon, {stroke: '#000', width: 2, fill: 'rgba(0,0,255,0.3)'} );

if( retval === null ){
  console.log( 'WOOPS' );
}
