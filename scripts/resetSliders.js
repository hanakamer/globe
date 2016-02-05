function resetSlider() {
  $("#angle-slider").slider('value',0);
  $("#radius").val($("#angle-slider").slider("value"));
  $("#magnitude-slider").slider('value',0);
  $("#magnitude").val($("#magnitude-slider").slider("value"));
}
