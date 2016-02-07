var color;
var mgn = 0;
$( "#angle-slider" ).slider({
  step:0.001,
  min: 0,
  max: 7,
  value: 1,
  slide: function(event, ui) {
    var capRadius,
        angle,
        radius = 6371;
    if(planet.plugins.circles){
      planet.plugins.circles.setRadius(ui.value);
    }
    angle = ui.value;
    capRadius = calculateCapRadius(angle, radius).toFixed(2);
    $("#radius").val(capRadius +"km");
  }

});

$( "#magnitude-slider" ).slider({
  step:0.1,
  min: 0,
  max: 10,
  value: 0.1,
  slide: function(event, ui) {
    color = "white";
    mgn = ui.value;
    color= colors[Math.round(mgn)];
    $("#magnitude").val(mgn);
  }
});


function resetSlider() {
  $("#angle-slider").slider('value',0);
  $("#radius").val($("#angle-slider").slider("value"));
  $("#magnitude-slider").slider('value',0);
  $("#magnitude").val($("#magnitude-slider").slider("value"));
}
