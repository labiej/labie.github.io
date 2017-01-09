var myCanvas = new MyCanvas(document.getElementById("draw").getContext("2d"));

myCanvas.drawAxes();
myCanvas.drawCircle( 0, 0, 15, { fill: "#F0F" });
myCanvas.drawCircle( 0, 0, 30);
myCanvas.drawCircle( 15, 15, 35, {stroke: "#FFF", fill: "rgba(255,0,0,0.3)"});
