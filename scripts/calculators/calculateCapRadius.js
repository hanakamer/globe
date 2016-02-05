var calculateCapRadius = function(height){
  var capRadius = Math.sqrt(height*(2*radius-height));
  return capRadius;

}
