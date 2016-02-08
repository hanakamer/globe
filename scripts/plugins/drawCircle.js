planetaryjs.plugins.circles = function(config) {
  var circle, center;
  var lat;
  var long;
  var innerCircles;

  var addCircle = function(_long, _lat, angle){
    lat = _lat;
    long = _long;
    circle = d3.geo.circle().origin([_long, _lat]).angle(0.4)();
    center = d3.geo.circle().origin([_long, _lat]).angle(0.2)();
    innerCircles = [];
  }

  var setRadius = function(angle){
    circle = d3.geo.circle().origin([long, lat]).angle(angle)();
    innerCircles = [];
    for (var i = 0.1; i<angle; i+=0.7){
      innerCircles.push(d3.geo.circle().origin([long, lat]).angle(i)());
    }
  }

  return function (planet) {
    planet.plugins.circles = {
      add: addCircle,
      setRadius: setRadius,
    };

    planet.onDraw(function() {
      if (!circle) return false;
      planet.withSavedContext(function(ctx) {

        for (var obj in innerCircles){
          ctx.beginPath();
          ctx.strokeStyle = "white";
          ctx.strokeStyle =colors[colors.indexOf(mgn_color)-obj*5];
          ctx.globalAlpha = 1;
          planet.path.context(ctx)(innerCircles[obj]);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.fillStyle = mgn_color;
        ctx.globalAlpha = 0.1;
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
