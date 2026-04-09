// This file was automatically generated.  Do not modify.
/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quote-props */
/* eslint-disable quotes */
/* eslint-disable dot-notation */

function getInterfaceTranslations () {
    return {
        "en": {
            "tyc8.name": "TYC 8-Motor Board",
            "tyc8.description": "TYC ESP32 8-Channel Motor Expansion Board."
        },
        "zh-cn": {
            "tyc8.name": "TYC 8路电机扩展板",
            "tyc8.description": "TYC ESP32 8路电机扩展板"
        },
        "zh-tw": {
            "tyc8.name": "TYC 8路馬達擴展板",
            "tyc8.description": "TYC ESP32 8路馬達擴展板"
        }
    };
}

function registerBlocksMessages (Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales["en"], {
        "TYC8_CATEGORY": "TYC 8-Motor",
        "TYC8_BEGIN": "TYC8 Init %1",
        "TYC8_INIT_FULL": "M1~M8 Motors (All)",
        "TYC8_INIT_SIX": "M1~M6 Motors (Release I2C/Servo Pins)",
        "TYC8_MOTOR": "Motor %1 Speed %2",
        "TYC8_SET_INVERTED": "Set Motor %1 Inverted %2",
        "TYC8_STOP_ALL": "Stop All Motors",
        "TYC8_M1": "M1", "TYC8_M2": "M2", "TYC8_M3": "M3", "TYC8_M4": "M4",
        "TYC8_M5": "M5", "TYC8_M6": "M6", "TYC8_M7": "M7", "TYC8_M8": "M8",
	"TYC8_MOTOR_VAR": "Control Motor No. %1 Speed %2"
    });

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"], {
        "TYC8_CATEGORY": "TYC 8路馬達",
        "TYC8_BEGIN": "TYC8 初始化設定 %1",
        "TYC8_INIT_FULL": "M1~M8 顆馬達初始化",
        "TYC8_INIT_SIX": "M1~M6 馬達初始化 (釋放 I2C/伺服腳位)",
        "TYC8_MOTOR": "馬達 %1 速度 %2",
        "TYC8_SET_INVERTED": "設定馬達 %1 反向轉動 %2",
        "TYC8_STOP_ALL": "停止所有馬達",
        "TYC8_M1": "M1", "TYC8_M2": "M2", "TYC8_M3": "M3", "TYC8_M4": "M4",
        "TYC8_M5": "M5", "TYC8_M6": "M6", "TYC8_M7": "M7", "TYC8_M8": "M8",
	"TYC8_MOTOR_VAR": "控制馬達 第 %1 顆 速度 %2"
    });

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}

//exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;