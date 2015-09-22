/**
 * Concrete blocks
 */
// THIS is the way we'd normally do it, but I'm hacking
// Blockly.Blocks['concrete_number_5'] = {
//   init: function() {
//     this.appendValueInput("RIGHT_SIDE")
//         .setCheck("concrete_block")
//         .appendField("5");
//     this.setInputsInline(false);
//     this.setOutput(true, "concrete_block");
//     this.setColour(45);
//     this.setTooltip('');
//     this.setHelpUrl('http://www.example.com/');
//   }
// };

(function () {
    var PREFIX = 'concrete_block_';
    var HELP_URL = 'https://github.com/reedspool/programming_game';

    // Most blocks, except folds, etc.
    // key: the suffix for the name
    // value: the text value to write in the box
    var basicBlocks = {
        'blank': '_'
    };

    var NUMBERS = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 3.14
    ];

    var namesOfThings = {
        '+': 'sum',
        '-': 'difference',
        '*': 'product',
        '/': 'division',
        '>': 'greater_than',
        '<': 'less_than',
        '?': 'conditional',
        3.14: 'PI'
    }

    var OPS = ['+', '-', '*', '/', '>', '<', '?', 'jump', 'copy', 'call']

    for (var i = 0; i < NUMBERS.length; i++) {
        var name = NUMBERS[i];

        if (namesOfThings[name]) name = namesOfThings[name];

        basicBlocks['number_' + name] = NUMBERS[i];
    };

    for (var i = 0; i < OPS.length; i++) {
        var name = OPS[i];

        if (namesOfThings[name]) name = namesOfThings[name];

        basicBlocks['op_' + name] = OPS[i];
    };

    function createBasicBlock(value) {
        return {
          init: function() {
            this.appendValueInput("RIGHT_SIDE")
                .setCheck("concrete_block")
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("" + value);
            this.setInputsInline(false);
            this.setOutput(true, "concrete_block");
            this.setColour(45);
            this.setTooltip('');
            this.setHelpUrl(HELP_URL);
          }
        }
    }

    function createBasicJavaScript(value) {
        return function(block) {
            var value_right_side = Blockly.JavaScript.valueToCode(block, 'RIGHT_SIDE', Blockly.JavaScript.ORDER_ATOMIC);

            var code = value + ' ' + value_right_side;

            return [code, Blockly.JavaScript.ORDER_NONE];
        };
    }

    function registerBlock(name, value) {
        var block = createBasicBlock(value);
        var js = createBasicJavaScript(value);

        Blockly.Blocks[PREFIX + name] = block;
        Blockly.JavaScript[PREFIX + name] = js;
    }

    for (var key in basicBlocks) {
        registerBlock(key, basicBlocks[key])
    }
})();