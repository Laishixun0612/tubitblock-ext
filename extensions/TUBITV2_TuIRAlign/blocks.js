/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const colour = '#35A38B';
    const secondaryColour = '#35A38B';
    const msg = function (key, fallback) {
        return (Blockly.Msg && Blockly.Msg[key]) || fallback;
    };

    const numberInput = function (name) {
        return {
            type: 'input_value',
            name: name,
            check: 'Number'
        };
    };

    const analogPins = [
        ['23', '23'],
        ['15', '15'],
        ['12', '12'],
        ['5', '5'],
        ['2', '2'],
        ['0', '0'],
        ['33', '33'],
        ['32', '32'],
        ['35', '35'],
        ['34', '34'],
        ['39', '39'],
        ['36', '36']
    ];

    const mainDirections = [
        [msg('TUBITV2TUIRALIGN_LEFT', '左'), 'IR_L'],
        [msg('TUBITV2TUIRALIGN_RIGHT', '右'), 'IR_R'],
        [msg('TUBITV2TUIRALIGN_NONE', '無'), 'IR_NONE']
    ];

    const secondaryDirections = [
        [msg('TUBITV2TUIRALIGN_FRONT', '前'), 'IR_UP'],
        [msg('TUBITV2TUIRALIGN_BACK', '後'), 'IR_BACK'],
        [msg('TUBITV2TUIRALIGN_LEFT', '左'), 'IR_L'],
        [msg('TUBITV2TUIRALIGN_RIGHT', '右'), 'IR_R'],
        [msg('TUBITV2TUIRALIGN_NONE', '無'), 'IR_NONE']
    ];

    const frontBackDirections = [
        [msg('TUBITV2TUIRALIGN_FRONT', '前'), 'IR_UP'],
        [msg('TUBITV2TUIRALIGN_BACK', '後'), 'IR_BACK'],
        [msg('TUBITV2TUIRALIGN_NONE', '無'), 'IR_NONE']
    ];

    const singleDirections = [
        [msg('TUBITV2TUIRALIGN_FRONT', '前'), 'IR_UP'],
        [msg('TUBITV2TUIRALIGN_BACK', '後'), 'IR_BACK'],
        [msg('TUBITV2TUIRALIGN_LEFT', '左'), 'IR_L'],
        [msg('TUBITV2TUIRALIGN_RIGHT', '右'), 'IR_R']
    ];

    const pidAxes = [
        [msg('TUBITV2TUIRALIGN_AXIS_Y', 'Y 前後'), 'Y'],
        [msg('TUBITV2TUIRALIGN_AXIS_X', 'X 左右距離'), 'X'],
        [msg('TUBITV2TUIRALIGN_AXIS_Z', 'Z 旋轉'), 'Z']
    ];

    const irSensors = [
        [msg('TUBITV2TUIRALIGN_IR_1', '1 前'), 'UP'],
        [msg('TUBITV2TUIRALIGN_IR_2', '2 後'), 'BK'],
        [msg('TUBITV2TUIRALIGN_IR_3', '3 左前'), 'LU'],
        [msg('TUBITV2TUIRALIGN_IR_4', '4 左後'), 'LB'],
        [msg('TUBITV2TUIRALIGN_IR_5', '5 右前'), 'RU'],
        [msg('TUBITV2TUIRALIGN_IR_6', '6 右後'), 'RB']
    ];

    Blockly.Blocks.tubitv2tuiralign_init = {
        init: function () {
            this.jsonInit({
                message0: msg('TUBITV2TUIRALIGN_INIT', '初始化 IR 靠牆校正模式 %1'),
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'ROBOT',
                        options: [
                            [msg('TUBITV2TUIRALIGN_MTC', '麥克納姆輪 MTC'), 'TuMTC'],
                            [msg('TUBITV2TUIRALIGN_OTC', '全向輪 OTC'), 'TuOTC']
                        ]
                    }
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.tubitv2tuiralign_setpins = {
        init: function () {
            this.jsonInit({
                message0: msg('TUBITV2TUIRALIGN_SETPINS', '設定 IR 腳位 前 %1 後 %2 左前 %3 左後 %4 右前 %5 右後 %6'),
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'FRONT',
                        options: analogPins
                    },
                    {
                        type: 'field_dropdown',
                        name: 'BACK',
                        options: analogPins
                    },
                    {
                        type: 'field_dropdown',
                        name: 'LEFT_FRONT',
                        options: analogPins
                    },
                    {
                        type: 'field_dropdown',
                        name: 'LEFT_BACK',
                        options: analogPins
                    },
                    {
                        type: 'field_dropdown',
                        name: 'RIGHT_FRONT',
                        options: analogPins
                    },
                    {
                        type: 'field_dropdown',
                        name: 'RIGHT_BACK',
                        options: analogPins
                    }
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.tubitv2tuiralign_settargets = {
        init: function () {
            this.jsonInit({
                message0: msg('TUBITV2TUIRALIGN_SETTARGETS', '設定 IR 目標值 前 %1 後 %2 左前 %3 左後 %4 右前 %5 右後 %6'),
                args0: [
                    numberInput('FRONT'),
                    numberInput('BACK'),
                    numberInput('LEFT_FRONT'),
                    numberInput('LEFT_BACK'),
                    numberInput('RIGHT_FRONT'),
                    numberInput('RIGHT_BACK')
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.tubitv2tuiralign_setratioangle = {
        init: function () {
            this.jsonInit({
                message0: msg('TUBITV2TUIRALIGN_SETRATIOANGLE', '設定 IR 比例角度模式 %1'),
                args0: [
                    {
                        type: 'field_checkbox',
                        name: 'ENABLE',
                        checked: 'FALSE'
                    }
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.tubitv2tuiralign_setdeadbands = {
        init: function () {
            this.jsonInit({
                message0: msg('TUBITV2TUIRALIGN_SETDEADBANDS', '設定 IR 誤差範圍 距離 %1 角度 %2'),
                args0: [
                    numberInput('DISTANCE'),
                    numberInput('ANGLE')
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.tubitv2tuiralign_settolerance = {
        init: function () {
            this.jsonInit({
                message0: msg('TUBITV2TUIRALIGN_SETTOLERANCE', '設定 IR 容許誤差百分比 %1'),
                args0: [
                    numberInput('PERCENT')
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.tubitv2tuiralign_setoutputlimits = {
        init: function () {
            this.jsonInit({
                message0: msg('TUBITV2TUIRALIGN_SETOUTPUTLIMITS', '設定 IR 輸出限制 X %1 Y %2 Z %3 旋轉倍率 %4'),
                args0: [
                    numberInput('VX'),
                    numberInput('VY'),
                    numberInput('WZ'),
                    numberInput('WZ_SCALE')
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.tubitv2tuiralign_setpidaxis = {
        init: function () {
            this.jsonInit({
                message0: msg('TUBITV2TUIRALIGN_SETPIDAXIS', '設定 IR %1 PID P %2 I %3 D %4'),
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'AXIS',
                        options: pidAxes
                    },
                    numberInput('P'),
                    numberInput('I'),
                    numberInput('D')
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.tubitv2tuiralign_setpidxz = {
        init: function () {
            this.jsonInit({
                message0: msg('TUBITV2TUIRALIGN_SETPIDXZ', '設定 IR X/Z PID X P %1 I %2 D %3 Z P %4 I %5 D %6'),
                args0: [
                    numberInput('X_P'),
                    numberInput('X_I'),
                    numberInput('X_D'),
                    numberInput('Z_P'),
                    numberInput('Z_I'),
                    numberInput('Z_D')
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.tubitv2tuiralign_setpidall = {
        init: function () {
            this.jsonInit({
                message0: msg('TUBITV2TUIRALIGN_SETPIDALL', '設定全部 IR PID Y P %1 I %2 D %3 X P %4 I %5 D %6 Z P %7 I %8 D %9'),
                args0: [
                    numberInput('Y_P'),
                    numberInput('Y_I'),
                    numberInput('Y_D'),
                    numberInput('X_P'),
                    numberInput('X_I'),
                    numberInput('X_D'),
                    numberInput('Z_P'),
                    numberInput('Z_I'),
                    numberInput('Z_D')
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.tubitv2tuiralign_align = {
        init: function () {
            this.jsonInit({
                message0: msg('TUBITV2TUIRALIGN_ALIGN', '執行 IR 靠牆校正 主校正 %1 次校正 %2'),
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'MAIN',
                        options: mainDirections
                    },
                    {
                        type: 'field_dropdown',
                        name: 'SECONDARY',
                        options: secondaryDirections
                    }
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.tubitv2tuiralign_align_timeout = {
        init: function () {
            this.jsonInit({
                message0: msg('TUBITV2TUIRALIGN_ALIGN_TIMEOUT', '執行 IR 靠牆校正 主校正 %1 次校正 %2 逾時秒數 %3 確認秒數 %4'),
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'MAIN',
                        options: mainDirections
                    },
                    {
                        type: 'field_dropdown',
                        name: 'SECONDARY',
                        options: secondaryDirections
                    },
                    numberInput('TIMEOUT'),
                    numberInput('CONFIRM')
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.tubitv2tuiralign_align_single = {
        init: function () {
            this.jsonInit({
                message0: msg('TUBITV2TUIRALIGN_ALIGN_SINGLE', '執行 IR 次校正 方向 %1 逾時秒數 %2 確認秒數 %3'),
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'DIRECTION',
                        options: singleDirections
                    },
                    numberInput('TIMEOUT'),
                    numberInput('CONFIRM')
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.tubitv2tuiralign_step = {
        init: function () {
            this.jsonInit({
                message0: msg('TUBITV2TUIRALIGN_STEP', 'IR 主校正單步 主校正 %1 次校正 %2 完成?'),
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'MAIN',
                        options: mainDirections
                    },
                    {
                        type: 'field_dropdown',
                        name: 'SECONDARY',
                        options: frontBackDirections
                    }
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['output_boolean']
            });
        }
    };

    Blockly.Blocks.tubitv2tuiralign_step_single = {
        init: function () {
            this.jsonInit({
                message0: msg('TUBITV2TUIRALIGN_STEP_SINGLE', 'IR 次校正單步 方向 %1 完成?'),
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'DIRECTION',
                        options: singleDirections
                    }
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['output_boolean']
            });
        }
    };

    Blockly.Blocks.tubitv2tuiralign_readir = {
        init: function () {
            this.jsonInit({
                message0: msg('TUBITV2TUIRALIGN_READIR', '讀取 IR %1 數值'),
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'IR',
                        options: irSensors
                    }
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['output_number']
            });
        }
    };

    return Blockly;
}

exports = registerBlocks;
