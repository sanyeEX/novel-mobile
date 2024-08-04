function setRem () {
  let deviceWidth = document.documentElement.clientWidth || window.innerWidth
  if (deviceWidth >= 769) { deviceWidth = 769 }
  if (deviceWidth <= 320) { deviceWidth = 320}
  document.documentElement.style.fontSize = `${(deviceWidth / 6.5)}px`
  document.querySelector('body').style.fontSize = `0.3rem`
}
setRem()
window.addEventListener('resize', function () {
  setRem()
})
