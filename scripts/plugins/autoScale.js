function autoscale(options) {
  options = options || {};
  return function(planet) {
    planet.onInit(function() {
      var width  = window.innerWidth + (options.extraWidth || 0);
      var height = window.innerHeight + (options.extraHeight || 0);
      planet.projection.scale(Math.min(width, height) / 2.5);
    });
  };
};
