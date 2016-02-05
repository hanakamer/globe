var radius = 6371;
$( "#angle-slider" ).slider({
  step:0.01,
  min: 0,
  max: 90,
  value: 1,
  slide: function(event, ui) {
    $("#radius").val(ui.value);
    if(planet.plugins.circles){
      planet.plugins.circles.setRadius($("#angle-slider").slider("value"));
    }
    var angle = $("#angle-slider").slider("value");
    console.log(angle);
    var height = calculateHeight(angle);
    console.log(height);
    var capRadius = calculateCapRadius(height);
    $("#radius").val(capRadius +"km");
  }
});
