var mozaic = document.querySelector('#mozaic')
setInterval(function() {
  mozaic.src= img + "?random=" + new Date().getTime()
}, 120000)