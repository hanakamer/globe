var calculateHeight = function(angle){
  var height = radius*(1-Math.cos(angle/2));
  return height;
};
