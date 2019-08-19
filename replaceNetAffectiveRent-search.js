// TODO: on the search page, figure out which listings are showing the net effective rent and replace the rent being displayed for those listings with the gross rent.

// there might be rate limiting issues?

fetch("https://streeteasy.com/building/west-pierre/1203?featured=1")
.then(response => response.text())
.then(text => console.log(text))