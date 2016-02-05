planetaryjs.plugins.circles = function(config) {
  var circle;
  var lat;
  var long;

  var addCircle = function(_long, _lat){
    lat = _lat;
    long = _long;
    circle = d3.geo.circle().origin([_long, _lat]).angle(0.4)();
  }

  var setRadius = function(angle){
    circle = d3.geo.circle().origin([long, lat]).angle(angle)();
  }

  return function (planet) {
    planet.plugins.circles = {
      add: addCircle,
      setRadius: setRadius,
    };

    planet.onDraw(function() {
      if (!circle) return false;
      planet.withSavedContext(function(ctx) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.5;
        planet.path.context(ctx)(circle);
        ctx.fill();
      });
    });
  };
};
