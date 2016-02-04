var width = 960,
    height = 500;

var projection = d3.geo.orthographic() //an azimuthal projection suitable for displaying a single hemisphere
    .scale(180)
    .clipAngle(90)
    .translate([width/2, height/2]); //sets the projection’s translation offset to the specified two-element array [x, y] and returns the projection.

var canvas = d3.select("#globeParent").append("canvas")
    .attr("width", width)
    .attr("height", height)
    .style("cursor", "move");

var context = canvas.node().getContext("2d");

var path = d3.geo.path()
    .projection(projection)
    .context(context)

var title = d3.select("h1");

var zoom = d3.behavior.zoom()
    .translate([0,0])
    .scale(1)
    .scaleExtent([1, 8]);




queue()
   .defer(d3.json, "raw/world-110m.json")
   .defer(d3.tsv, "raw/country-names.tsv")
   .await(ready);




function ready(error, world, names) {
    if (error) throw error;

    var globe = {type: "Sphere"},
        land = topojson.feature(world, world.objects.land),
        countries = topojson.feature(world, world.objects.countries).features,
        borders = topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }),
        i = -1,
        n = countries.length;

    canvas
      .call(zoom.on("zoom", zoomed))
      .call(zoom.event);
    var startCoord = d3.geo.centroid(journey[0]),
        endCoord = d3.geo.centroid(journey[1])
    var coords = [-startCoord[0], -startCoord[1]]
    projection.rotate(coords);

    function zoomed() {
        var t = zoom.translate(),
            s = zoom.scale();

        context.clearRect(0, 0, width, height);
        context.save();
        context.translate(t[0], t[1]);
        context.scale(s, s);
        context.lineWidth = 1 / s;
        context.fillStyle = "#e5e5ff", context.beginPath(), path(globe), context.fill();
        context.fillStyle = "#ccffcc", context.beginPath(), path(land), context.fill();
        context.fillStyle = "#f00", context.beginPath(), path(countries[i]), context.fill();
        context.strokeStyle = "yellow", context.lineWidth = .5, context.beginPath(), path(borders), context.stroke();
        context.strokeStyle = "#000", context.lineWidth = 1, context.beginPath(), path(globe), context.stroke();
        context.restore();
  }

}
