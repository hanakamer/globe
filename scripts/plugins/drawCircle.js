planetaryjs.plugins.circles = function(config) {
  var circle, center;
  var lat;
  var long;

  var addCircle = function(_long, _lat){
    lat = _lat;
    long = _long;
    circle = d3.geo.circle().origin([_long, _lat]).angle(0.4)();
    center = d3.geo.circle().origin([_long, _lat]).angle(0.1)();

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
        ctx.fillStyle = mgn_color;
        ctx.globalAlpha = 0.5;
        planet.path.context(ctx)(circle);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.globalAlpha = 1;
        planet.path.context(ctx)(center);
        ctx.fill();
      });
    });
  };
};
