var calculateCapRadius = function(angle, radius){
  //convert degrees to radians by multiplying by Math.PI/180
  var capRadius = radius * Math.sin(angle*Math.PI/180);
  return capRadius;

}
