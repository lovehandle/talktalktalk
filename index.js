var urls = {
  "cfa" : "http://codeforamerica.org",
  "voxeljscom": "http://voxeljs.com/",
  "vegas": "http://www.haymoreendodontics.com/wp-content/uploads/2013/05/Las-Vegas-Dentist.jpg"
}

var slides = Object.keys(urls)

var game = require('voxel-hello-world')({
  texturePath: "./images/",
  playerSkin: "./images/player.png",
  materials: ["yellow"].concat(slides),
  materialFlatColor: false,
  generateVoxelChunks: false,
  lightsDisabled: true,
  chunkDistance: 1
})

var minutes   = 10
var startTime = 800
var createSky = require('voxel-sky')({game: game, speed: ((2400 - startTime) * 0.25) / (minutes * 60 * 16) })
var sky       = createSky(startTime)

game.on('tick', sky)

var z = -5
var y = 3
slides.map(function(slide) {
  game.setBlock([0, y, z], slide)
  z += 2
  if (z > 5) {
    z = -5
    y += 2
  }
})

window.addEventListener('keydown', function (ev) {
  if (ev.keyCode === '1'.charCodeAt(0)) {
    toggleStep(1)
  }
  if (ev.keyCode === '9'.charCodeAt(0)) {
    toggleStep(9)
  }
})


game.on('setBlock', function(pos, val, old) {
  if (old === 1 || val === 1) return
  var url = urls[slides[old - 2]]
  var win = window.open(url)
})

window.game = game
