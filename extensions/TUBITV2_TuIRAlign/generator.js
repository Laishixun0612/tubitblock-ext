/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerGenerators (Blockly) {

    const ensureNumber = function (code, fallback) {
        return code || fallback;
    };

    const irGetter = {
        UP: 'getFilteredUP',
        BK: 'getFilteredBK',
        LU: 'getFilteredLU',
        LB: 'getFilteredLB',
        RU: 'getFilteredRU',
        RB: 'getFilteredRB'
    };

    const ensureRobot = function (robot) {
        const isOtc = robot === 'TuOTC';
        const includeKey = isOtc ? 'tubitv2otc' : 'tubitv2mtc';
        const header = isOtc ? 'TuOTC.h' : 'TuMTC.h';
        const robotName = isOtc ? 'otc' : 'mtc';
        const declaration = `${robot} ${robotName}(tubit);`;

        if (!Blockly.Arduino.includes_[includeKey]) {
            Blockly.Arduino.includes_[includeKey] = `#include <${header}>`;
        }

        if (!Blockly.Arduino.definitions_['tubitv2_set']) {
            Blockly.Arduino.definitions_['tubitv2_set'] = '';
        }

        if (!Blockly.Arduino.definitions_['tubitv2_set'].includes(declaration)) {
            Blockly.Arduino.definitions_['tubitv2_set'] += `\n${declaration}`;
        }

        return robotName;
    };

    Blockly.Arduino.tubitv2tuiralign_init = function (block) {
        const robot = block.getFieldValue('ROBOT');
        const robotName = ensureRobot(robot);
        Blockly.Arduino.includes_.tubitv2tuiralign = `#include <TuIRAlign.h>`;
        Blockly.Arduino.definitions_.tubitv2tuiralign = `extern TuBitCore tubit;\n${robot}& tuirRobot() {\n    return ${robotName};\n}\nTuIRAlign<${robot}>& tuirAlign() {\n    static TuIRAlign<${robot}> align(tubit, tuirRobot());\n    return align;\n}\n`;
        return `tuirAlign();\n`;
    };

    Blockly.Arduino.tubitv2tuiralign_setpins = function (block) {
        const front = block.getFieldValue('FRONT');
        const back = block.getFieldValue('BACK');
        const leftFront = block.getFieldValue('LEFT_FRONT');
        const leftBack = block.getFieldValue('LEFT_BACK');
        const rightFront = block.getFieldValue('RIGHT_FRONT');
        const rightBack = block.getFieldValue('RIGHT_BACK');
        return `tuirAlign().setPins(${front},${back},${leftFront},${leftBack},${rightFront},${rightBack});\n`;
    };

    Blockly.Arduino.tubitv2tuiralign_settargets = function (block) {
        const front = ensureNumber(Blockly.Arduino.valueToCode(block, 'FRONT', Blockly.Arduino.ORDER_ATOMIC), '25');
        const back = ensureNumber(Blockly.Arduino.valueToCode(block, 'BACK', Blockly.Arduino.ORDER_ATOMIC), '25');
        const leftFront = ensureNumber(Blockly.Arduino.valueToCode(block, 'LEFT_FRONT', Blockly.Arduino.ORDER_ATOMIC), '25');
        const leftBack = ensureNumber(Blockly.Arduino.valueToCode(block, 'LEFT_BACK', Blockly.Arduino.ORDER_ATOMIC), '25');
        const rightFront = ensureNumber(Blockly.Arduino.valueToCode(block, 'RIGHT_FRONT', Blockly.Arduino.ORDER_ATOMIC), '25');
        const rightBack = ensureNumber(Blockly.Arduino.valueToCode(block, 'RIGHT_BACK', Blockly.Arduino.ORDER_ATOMIC), '25');
        return `tuirAlign().setTargets(${front},${back},${leftFront},${leftBack},${rightFront},${rightBack});\n`;
    };

    Blockly.Arduino.tubitv2tuiralign_align = function (block) {
        const main = block.getFieldValue('MAIN');
        const secondary = block.getFieldValue('SECONDARY');
        return `tuirAlign().alignBlocking(${main},${secondary});\n`;
    };

    Blockly.Arduino.tubitv2tuiralign_readir = function (block) {
        const ir = block.getFieldValue('IR');
        const getter = irGetter[ir] || irGetter.UP;
        const code = `(tuirAlign().readAllIR_(), tuirAlign().${getter}())`;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    };

    return Blockly;
}

exports = registerGenerators;
