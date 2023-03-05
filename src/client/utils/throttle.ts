export const throttle = (interval: number, callback: () => void) => {
  var lastTime = Date.now() - interval
  return function() {
    if ((lastTime + interval) < Date.now()) {
      lastTime = Date.now()
      callback()
    }
  }
}
