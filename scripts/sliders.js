var mgn_color = "white";
var mgn = 0;

function outputRadius(_angle) {
  var capRadius;
  var radius = 6371;
  var angle = _angle;

  if(planet.plugins.circles){
    planet.plugins.circles.setRadius(angle);
  }

  capRadius = calculateCapRadius(angle, radius).toFixed(2);
	document.querySelector('#radius').value = capRadius+" km";
}

function outputMagnitude(mgn) {
  document.querySelector('#magnitude').value = mgn;
  mgn_color= colors[mgn*10-1];
}

function resetSlider() {
  document.querySelector('#radius').value = 0 + " km";
  document.querySelector('#rad-slider').value = 0;
  document.querySelector('#magnitude').value = 0;
  document.querySelector('#mgn-slider').value = 0;

}
