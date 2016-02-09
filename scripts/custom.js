var planet = planetaryjs.planet();
var canvas = document.getElementById('globe');
var ctx = canvas.getContext('2d');

var color_palet = ["#FFFFFF",
              "#FFFFA8",
              "#FFFF00",
              "#FFDB00",
              "#FFA500",
              "#FF5E00",
              "#FF0000",
              "#C70039",
              "#800080"]
var colors = chroma.scale(color_palet).colors(100);

planet.loadPlugin(planetaryjs.plugins.earth({
  topojson: { file: 'raw/world-110m.json' },
  oceans:   { fill:   '#455F58' },
  land:     { fill:   '#3B2619' },
  borders:  { stroke: '#99AB58' }
}));

planet.loadPlugin(autocenter());

planet.loadPlugin(autoscale());

planet.loadPlugin(planetaryjs.plugins.pings());

planet.loadPlugin(planetaryjs.plugins.zoom({
  scaleExtent: [100, 10000]
}));

planet.loadPlugin(planetaryjs.plugins.circles());

var mmLong,
    mmLat,
    mdLong,
    mdLat,
    muLong,
    muLat;

d3.select("canvas").on("mousemove", function() {
  mmLong = planet.projection.invert(d3.mouse(this))[0];
  mmLat = planet.projection.invert(d3.mouse(this))[1];
  if (mmLat || mmLong){
    document.querySelector('#lat').value = mmLat.toFixed(4)+String.fromCharCode(176);
    document.querySelector('#long').value = mmLong.toFixed(4)+String.fromCharCode(176);
  } else {
    document.querySelector('#lat').value = 0;
    document.querySelector('#long').value = 0;
  }
});

d3.select("canvas").on("mousedown", function() {
  mdLong = planet.projection.invert(d3.mouse(this))[0];
  mdLat = planet.projection.invert(d3.mouse(this))[1];

});

d3.select("canvas").on("mouseup", function() {
  muLong = planet.projection.invert(d3.mouse(this))[0];
  muLat = planet.projection.invert(d3.mouse(this))[1];
});

d3.select("canvas").on("click", function() {
  var deltaLong = mdLong-muLong;
  var deltaLan = mdLat-muLat;
  if (deltaLong==0 && deltaLan==0) {
    resetSlider();
    getCityCountry(mdLat, mdLong, function(response){
      document.querySelector('#city_selected').value = response;

    });
    document.querySelector('#lat_selected').value = mdLat.toFixed(4)+String.fromCharCode(176);
    document.querySelector('#long_selected').value = mdLong.toFixed(4)+String.fromCharCode(176);
    planet.plugins.circles.add(mdLong, mdLat);
    $("#globe").one( "mousemove", function() {
      $('.control-panel').animate({
        left: "20px",
      }, 600 );
    } );

  }
});

function getCityCountry(lat, long, callback){
  $.ajax({ url:'http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&sensor=true',
        crossDomain:true,
        success: function(response){
            var i = response.results[0].address_components.length;
            callback(response.results[0].address_components[i-3].long_name + ', ' +
              response.results[0].address_components[i-2].long_name
            );


         }
       });
     }


planet.loadPlugin(planetaryjs.plugins.drag());

planet.projection.translate([canvas.height, canvas.width]);

planet.draw(canvas);

chroma.scale(['white','green','blue']).colors(5);
