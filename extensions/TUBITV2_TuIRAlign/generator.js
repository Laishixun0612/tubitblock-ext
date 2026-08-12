/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerGenerators (Blockly) {

    const ensureNumber = function (code, fallback) {
        return code || fallback;
    };

    const numberToCode = function (block, name, fallback) {
        return ensureNumber(Blockly.Arduino.valueToCode(block, name, Blockly.Arduino.ORDER_ATOMIC), fallback);
    };

    const irGetter = {
        UP: 'getFilteredUP',
        BK: 'getFilteredBK',
        LU: 'getFilteredLU',
        LB: 'getFilteredLB',
        RU: 'getFilteredRU',
        RB: 'getFilteredRB'
    };

    const pidAxisSetters = {
        Y: 'setPidY',
        X: 'setXPID',
        Z: 'setZPID'
    };

    const isSideDirection = function (direction) {
        return direction === 'IR_L' || direction === 'IR_R';
    };

    const isNoDirection = function (direction) {
        return direction === 'IR_NONE';
    };

    const secondsToMillisCode = function (seconds) {
        return `(unsigned long)((${seconds}) * 1000UL)`;
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
        const front = numberToCode(block, 'FRONT', '25');
        const back = numberToCode(block, 'BACK', '25');
        const leftFront = numberToCode(block, 'LEFT_FRONT', '25');
        const leftBack = numberToCode(block, 'LEFT_BACK', '25');
        const rightFront = numberToCode(block, 'RIGHT_FRONT', '25');
        const rightBack = numberToCode(block, 'RIGHT_BACK', '25');
        return `tuirAlign().setTargets(${front},${back},${leftFront},${leftBack},${rightFront},${rightBack});\n`;
    };

    Blockly.Arduino.tubitv2tuiralign_setratioangle = function (block) {
        const enabled = block.getFieldValue('ENABLE') === 'TRUE' ? 'true' : 'false';
        return `tuirAlign().setUseRatioAngle(${enabled});\n`;
    };

    Blockly.Arduino.tubitv2tuiralign_setdeadbands = function (block) {
        const distance = numberToCode(block, 'DISTANCE', '0.3');
        const angle = numberToCode(block, 'ANGLE', '0.3');
        return `tuirAlign().setDeadbands(${distance},${angle});\n`;
    };

    Blockly.Arduino.tubitv2tuiralign_settolerance = function (block) {
        const percent = numberToCode(block, 'PERCENT', '5.0');
        return `tuirAlign().setTolerancePercent(${percent});\n`;
    };

    Blockly.Arduino.tubitv2tuiralign_setoutputlimits = function (block) {
        const vx = numberToCode(block, 'VX', '20');
        const vy = numberToCode(block, 'VY', '20');
        const wz = numberToCode(block, 'WZ', '360');
        const wzScale = numberToCode(block, 'WZ_SCALE', '2.5');
        return `tuirAlign().setOutputLimits(${vx},${vy},${wz},${wzScale});\n`;
    };

    Blockly.Arduino.tubitv2tuiralign_setpidaxis = function (block) {
        const axis = block.getFieldValue('AXIS');
        const setter = pidAxisSetters[axis] || pidAxisSetters.Y;
        const p = numberToCode(block, 'P', '0');
        const i = numberToCode(block, 'I', '0');
        const d = numberToCode(block, 'D', '0');
        return `tuirAlign().${setter}(${p},${i},${d});\n`;
    };

    Blockly.Arduino.tubitv2tuiralign_setpidxz = function (block) {
        const xp = numberToCode(block, 'X_P', '5.0');
        const xi = numberToCode(block, 'X_I', '0');
        const xd = numberToCode(block, 'X_D', '0.035');
        const zp = numberToCode(block, 'Z_P', '38');
        const zi = numberToCode(block, 'Z_I', '0');
        const zd = numberToCode(block, 'Z_D', '0.04');
        return `tuirAlign().setXZPID(${xp},${xi},${xd},${zp},${zi},${zd});\n`;
    };

    Blockly.Arduino.tubitv2tuiralign_setpidall = function (block) {
        const yp = numberToCode(block, 'Y_P', '3.0');
        const yi = numberToCode(block, 'Y_I', '0');
        const yd = numberToCode(block, 'Y_D', '0.004');
        const xp = numberToCode(block, 'X_P', '5.0');
        const xi = numberToCode(block, 'X_I', '0');
        const xd = numberToCode(block, 'X_D', '0.035');
        const zp = numberToCode(block, 'Z_P', '38');
        const zi = numberToCode(block, 'Z_I', '0');
        const zd = numberToCode(block, 'Z_D', '0.04');
        return `tuirAlign().setPidAll(${yp},${yi},${yd},${xp},${xi},${xd},${zp},${zi},${zd});\n`;
    };

    Blockly.Arduino.tubitv2tuiralign_align = function (block) {
        const main = block.getFieldValue('MAIN');
        const secondary = block.getFieldValue('SECONDARY');
        if (isNoDirection(main) && isNoDirection(secondary)) {
            return '';
        }
        if (isNoDirection(main)) {
            return `tuirAlign().alignBlocking(IR_NONE,${secondary});\n`;
        }
        if (isSideDirection(secondary)) {
            return `if (tuirAlign().alignBlocking(${main},IR_NONE)) {\n    tuirAlign().alignBlocking(IR_NONE,${secondary});\n}\n`;
        }
        return `tuirAlign().alignBlocking(${main},${secondary});\n`;
    };

    Blockly.Arduino.tubitv2tuiralign_align_timeout = function (block) {
        const main = block.getFieldValue('MAIN');
        const secondary = block.getFieldValue('SECONDARY');
        const timeout = secondsToMillisCode(numberToCode(block, 'TIMEOUT', '8'));
        const confirm = secondsToMillisCode(numberToCode(block, 'CONFIRM', '1'));
        if (isNoDirection(main) && isNoDirection(secondary)) {
            return '';
        }
        if (isNoDirection(main)) {
            return `tuirAlign().alignBlocking(IR_NONE,${secondary},${timeout},${confirm});\n`;
        }
        if (isSideDirection(secondary)) {
            return `if (tuirAlign().alignBlocking(${main},IR_NONE,${timeout},${confirm})) {\n    tuirAlign().alignBlocking(IR_NONE,${secondary},${timeout},${confirm});\n}\n`;
        }
        return `tuirAlign().alignBlocking(${main},${secondary},${timeout},${confirm});\n`;
    };

    Blockly.Arduino.tubitv2tuiralign_align_single = function (block) {
        const direction = block.getFieldValue('DIRECTION');
        const timeout = secondsToMillisCode(numberToCode(block, 'TIMEOUT', '8'));
        const confirm = secondsToMillisCode(numberToCode(block, 'CONFIRM', '1'));
        return `tuirAlign().alignBlocking(IR_NONE,${direction},${timeout},${confirm});\n`;
    };

    Blockly.Arduino.tubitv2tuiralign_step = function (block) {
        const main = block.getFieldValue('MAIN');
        const secondary = block.getFieldValue('SECONDARY');
        if (isNoDirection(main) && isNoDirection(secondary)) {
            return ['true', Blockly.Arduino.ORDER_ATOMIC];
        }
        if (isNoDirection(main)) {
            return [`tuirAlign().step(IR_NONE,${secondary})`, Blockly.Arduino.ORDER_ATOMIC];
        }
        if (isSideDirection(secondary)) {
            return [`tuirAlign().step(IR_NONE,${secondary})`, Blockly.Arduino.ORDER_ATOMIC];
        }
        return [`tuirAlign().step(${main},${secondary})`, Blockly.Arduino.ORDER_ATOMIC];
    };

    Blockly.Arduino.tubitv2tuiralign_step_single = function (block) {
        const direction = block.getFieldValue('DIRECTION');
        return [`tuirAlign().step(IR_NONE,${direction})`, Blockly.Arduino.ORDER_ATOMIC];
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
