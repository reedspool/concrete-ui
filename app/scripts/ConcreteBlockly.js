
var Bacon = require('baconjs');

ConcreteBlockly = {};
var is_blockly_ready = false;

// Triggered by Blockly when Blockly iframe loaded
window.blockly_loaded = function(blockly) {
  window.Blockly = blockly;
  is_blockly_ready = true;

  attempted_listeners.forEach(ConcreteBlockly.onUpdate)
  attempted_listeners = [];

  return Blockly
}

var attempted_listeners = [];
ConcreteBlockly.onUpdate = function (fn) {
  if (is_blockly_ready) {
    Blockly.addChangeListener(fn);
  } else {
    attempted_listeners.push(fn);
  }
}

ConcreteBlockly.asEventStream = function () {
  return Bacon.fromBinder(function(sink) {
    ConcreteBlockly.onUpdate(function () {
      sink(new Bacon.Next(ConcreteBlockly.getCode()))
    });

    return function() {
       // unsub functionality here, this one's a no-op
    }
  })
}

ConcreteBlockly.getCode = function () {
  var code = window.Blockly.JavaScript.workspaceToCode();

  // Cuz it's JS, chop off the semicolon
  code = code.replace(/;/g, '')

  return code;
}

// TODO: Switch this to running Concrete instead of JavaScript
ConcreteBlockly.run = function () {
  eval(ConcreteBlockly.getCode());
}

ConcreteBlockly.see = function () {
  alert(ConcreteBlockly.getCode());
}

module.exports = ConcreteBlockly;
