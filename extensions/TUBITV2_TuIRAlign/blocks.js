/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const colour = '#35A38B';
    const secondaryColour = '#35A38B';
    const msg = function (key, fallback) {
        return (Blockly.Msg && Blockly.Msg[key]) || fallback;
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
        [msg('TUBITV2TUIRALIGN_NONE', '無'), 'IR_NONE']
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
                message0: msg('TUBITV2TUIRALIGN_INIT', '初始化 IR對牆校正 模式 %1'),
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
                message0: msg('TUBITV2TUIRALIGN_SETPINS', '設定紅外線腳位 前 %1 後 %2 左前 %3 左後 %4 右前 %5 右後 %6'),
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
                message0: msg('TUBITV2TUIRALIGN_SETTARGETS', '設定紅外線基準值 前 %1 後 %2 左前 %3 左後 %4 右前 %5 右後 %6'),
                args0: [
                    {
                        type: 'input_value',
                        name: 'FRONT'
                    },
                    {
                        type: 'input_value',
                        name: 'BACK'
                    },
                    {
                        type: 'input_value',
                        name: 'LEFT_FRONT'
                    },
                    {
                        type: 'input_value',
                        name: 'LEFT_BACK'
                    },
                    {
                        type: 'input_value',
                        name: 'RIGHT_FRONT'
                    },
                    {
                        type: 'input_value',
                        name: 'RIGHT_BACK'
                    }
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
                message0: msg('TUBITV2TUIRALIGN_ALIGN', '執行 IR對牆校正 主校正 %1 次校正 %2'),
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

    Blockly.Blocks.tubitv2tuiralign_readir = {
        init: function () {
            this.jsonInit({
                message0: msg('TUBITV2TUIRALIGN_READIR', '讀取紅外線 %1 數值'),
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
