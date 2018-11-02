// module.exports.controller = require('./lib/parser')
const KoaController = function() {
  this.routes = undefined
}

KoaController.prototype.use = KoaController.prototype.middleware = function(routes, controllers) {
  let stack = routes['stack']

  stack.forEach(element => {
    element.stack = parseControllers(element, controllers)
  })

  this.routes = routes
  return function() {}
}

let parseControllers = (element, controllers) => {
  let stack = element['stack'][0]
  let values = stack().split('#')
  let [controller, action] = values
  
  stack = controllers[controller][action]
  return stack
}

export default KoaController

// Have fun remembering how this all works