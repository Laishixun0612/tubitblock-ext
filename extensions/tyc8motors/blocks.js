function registerBlocks (Blockly) {
    const colour = '#00A1E4';
    const secondaryColour = '#0085BD';

    // 確保這裡的文字在翻譯未載入時也有預設值
    const motorOptions = [
        [Blockly.Msg.TYC8_M1 || 'M1', '1'], [Blockly.Msg.TYC8_M2 || 'M2', '2'],
        [Blockly.Msg.TYC8_M3 || 'M3', '3'], [Blockly.Msg.TYC8_M4 || 'M4', '4'],
        [Blockly.Msg.TYC8_M5 || 'M5', '5'], [Blockly.Msg.TYC8_M6 || 'M6', '6'],
        [Blockly.Msg.TYC8_M7 || 'M7', '7'], [Blockly.Msg.TYC8_M8 || 'M8', '8']
    ];

    Blockly.Blocks.tyc8_begin = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.TYC8_BEGIN || "TYC8 Init %1",
                args0: [{
                    type: 'field_dropdown',
                    name: 'MASK',
                    options: [
                        [Blockly.Msg.TYC8_INIT_FULL || "M1~M8 Motors", '0xFF'],
                        [Blockly.Msg.TYC8_INIT_SIX || "M1~M6 Motors", '0x3F']
                    ]
                }],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.tyc8_motor_control = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.TYC8_MOTOR || "Motor %1 Speed %2",
                args0: [
                    { type: 'field_dropdown', name: 'MN', options: motorOptions },
                    { type: 'input_value', name: 'SPD' }
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

  Blockly.Blocks.tyc8_motor_variable = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.TYC8_MOTOR_VAR || "控制馬達 第 %1 顆 速度 %2",
                args0: [
                    { type: 'input_value', name: 'MN' }, // 改為數值輸入，可放變數
                    { type: 'input_value', name: 'SPD' }
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.tyc8_set_inverted = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.TYC8_SET_INVERTED || "Set Motor %1 Inverted %2",
                args0: [
                    { type: 'field_dropdown', name: 'MN', options: motorOptions },
                    {
                        type: 'field_dropdown',
                        name: 'STATE',
                        options: [
                            ['ON', 'true'], 
                            ['OFF', 'false']
                        ]
                    }
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.tyc8_stop_all = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.TYC8_STOP_ALL || "Stop All Motors",
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    return Blockly;
}
exports = registerBlocks;