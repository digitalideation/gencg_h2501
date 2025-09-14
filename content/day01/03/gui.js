// https://github.com/dataarts/dat.gui
// https://github.com/dataarts/dat.gui/blob/master/example.html
let options = {
  color: 0,
  fullscreen: goFullScreen
};

window.onload = function () {
  const gui = new dat.GUI();
  gui.add(options, "color").min(1).max(3).step(1).listen();
  gui.add(options, "fullscreen");
};
