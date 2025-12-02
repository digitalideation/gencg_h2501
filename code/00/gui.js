// https://github.com/dataarts/dat.gui
// https://github.com/dataarts/dat.gui/blob/master/example.html
let options = {
  tileCountX: 10,
  tileCountY: 10,
  fullscreen: goFullScreen,
};

window.onload = function () {
  const gui = new dat.GUI();
  gui.add(options, 'tileCountX').min(5).max(20).step(1).listen();
  gui.add(options, 'tileCountY').min(5).max(20).step(1).listen();
  gui.add(options, 'fullscreen');
};
