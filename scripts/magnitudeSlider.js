var color = "white";
$( "#magnitude-slider" ).slider({
  step:0.1,
  min: 0,
  max: 10,
  value: 0.1,
  slide: function(event, ui) {
    $("#magnitude").val(ui.value);
    var mgn = $("#magnitude-slider").slider("value");
    console.log(mgn);
    color= colors[Math.round(mgn)];
    $("#magnitude").val($("#magnitude-slider").slider("value"));
  }
});
