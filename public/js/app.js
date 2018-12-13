var mozaic = document.querySelector('#mozaic')
setInterval(function() {
  console.log('refresh img')
  mozaic.src="img/mozaic.png?random=" + new Date().getTime()
}, 120000)