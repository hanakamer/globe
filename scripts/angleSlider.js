$( "#angle-slider" ).slider({
  step:0.1,
  min: 0,
  max: 90,
  value: 1,
  slide: function(event, ui) {
    $("#radius").val(ui.value);
    if(planet.plugins.circles){
      planet.plugins.circles.setRadius($("#angle-slider").slider("value"));
    }
    $("#radius").val($("#angle-slider").slider("value"));
  }
});
