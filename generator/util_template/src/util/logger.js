/*eslint no-console: "off"*/
const thisVersion = '0.1.0'

const message = function() {
  console.log(
    '%c ',
    `background: url(https://img.shields.io/badge/pi-${thisVersion}-green.svg) no-repeat center background-size: 100px 15px padding-left: 100px padding-bottom: 0px`
  )
}

const version = function() {
  console.log(`PI ${thisVersion}`)
}

const error = function(...argv) {
  console.error(argv)
}

const info = function(...argv) {
  console.info(argv)
}

export default {
  version,
  error,
  info
}
