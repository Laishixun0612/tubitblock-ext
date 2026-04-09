/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerGenerators (Blockly) {
    Blockly.Arduino.tyc8_begin = function (block) {
        Blockly.Arduino.includes_.tyc8 = `#include <TYC_8Motor.h>`;
        Blockly.Arduino.definitions_.tyc8 = `TYC_8Motor motors;`;
        const mask = this.getFieldValue('MASK'); 
        return `motors.begin(${mask});\n`;
    };

    Blockly.Arduino.tyc8_motor_control = function (block) {
        const mn = this.getFieldValue('MN');
        const spd = Blockly.Arduino.valueToCode(block, 'SPD', Blockly.Arduino.ORDER_ATOMIC) || '0';
        return `motors.motorControl(${mn}, ${spd});\n`;
    };

    Blockly.Arduino.tyc8_motor_variable = function (block) {
        // 獲取馬達編號的輸入值
        const mn = Blockly.Arduino.valueToCode(block, 'MN', Blockly.Arduino.ORDER_ATOMIC) || '1';
        // 獲取速度值
        const spd = Blockly.Arduino.valueToCode(block, 'SPD', Blockly.Arduino.ORDER_ATOMIC) || '0';
        
        return `motors.motorControl(${mn}, ${spd});\n`;
    };

    Blockly.Arduino.tyc8_set_inverted = function (block) {
        const mn = this.getFieldValue('MN');
        const state = this.getFieldValue('STATE');
        return `motors.setInverted(${mn}, ${state});\n`;
    };

    Blockly.Arduino.tyc8_stop_all = function (block) {
	return `motors.stopAll();\n`;
    };

    return Blockly;
}
exports = registerGenerators;
