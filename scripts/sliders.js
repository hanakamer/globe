var color;
var mgn = 0;

function outputRadius(_angle) {
  var capRadius;
  var radius = 6371;
  var angle = _angle;

  if(planet.plugins.circles){
    planet.plugins.circles.setRadius(angle);
  }

  capRadius = calculateCapRadius(angle, radius).toFixed(2);
	document.querySelector('#radius').value = capRadius;
}

function outputMagnitude(mgn) {
  document.querySelector('#magnitude').value = mgn;
  color= colors[Math.round(mgn)];
}

function resetSlider() {
  document.querySelector('#radius').value = 0;
  document.querySelector('#rad-slider').value = 0;
  document.querySelector('#magnitude').value = 0;
  document.querySelector('#mgn-slider').value = 0;

}
