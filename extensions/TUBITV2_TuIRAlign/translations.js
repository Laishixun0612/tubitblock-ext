// This file was automatically generated.  Do not modify.
/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quote-props */
/* eslint-disable quotes */
/* eslint-disable dot-notation */

function getInterfaceTranslations () {
return {
    "en": {
        "tubitv2tuiralign.name": "TuIRAlign Wall Alignment",
        "tubitv2tuiralign.description": "IR wall alignment control for TuBit V2 OTC/MTC robot kits."
    },
    "zh-tw": {
        "tubitv2tuiralign.name": "紅外線IR對牆校正",
        "tubitv2tuiralign.description": "適用於 TuBit V2 OTC/MTC 機器人套件的紅外線對牆校正控制。"
    },
    "zh-cn": {
        "tubitv2tuiralign.name": "红外线IR对墙校正",
        "tubitv2tuiralign.description": "适用于 TuBit V2 OTC/MTC 机器人套件的红外线对墙校正控制。"
    }
};

}

function registerScratchExtensionTranslations () {
    return {};
}

function registerBlocksMessages (Blockly) {

    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "TUBITV2TUIRALIGN_CATEGORY": "IR Wall Alignment",
            "TUBITV2TUIRALIGN_SETUP": "Setup",
            "TUBITV2TUIRALIGN_RUN": "Align and Read",
            "TUBITV2TUIRALIGN_INIT": "initialize IR wall alignment mode %1",
            "TUBITV2TUIRALIGN_SETPINS": "set IR pins front %1 back %2 left front %3 left back %4 right front %5 right back %6",
            "TUBITV2TUIRALIGN_SETTARGETS": "set IR target values front %1 back %2 left front %3 left back %4 right front %5 right back %6",
            "TUBITV2TUIRALIGN_ALIGN": "run IR wall alignment main %1 secondary %2",
            "TUBITV2TUIRALIGN_READIR": "read IR %1 value",
            "TUBITV2TUIRALIGN_MTC": "Mecanum MTC",
            "TUBITV2TUIRALIGN_OTC": "Omni-wheel OTC",
            "TUBITV2TUIRALIGN_FRONT": "front",
            "TUBITV2TUIRALIGN_BACK": "back",
            "TUBITV2TUIRALIGN_LEFT": "left",
            "TUBITV2TUIRALIGN_RIGHT": "right",
            "TUBITV2TUIRALIGN_NONE": "none",
            "TUBITV2TUIRALIGN_LEFT_FRONT": "left front",
            "TUBITV2TUIRALIGN_LEFT_BACK": "left back",
            "TUBITV2TUIRALIGN_RIGHT_FRONT": "right front",
            "TUBITV2TUIRALIGN_RIGHT_BACK": "right back",
            "TUBITV2TUIRALIGN_IR_1": "1 front",
            "TUBITV2TUIRALIGN_IR_2": "2 back",
            "TUBITV2TUIRALIGN_IR_3": "3 left front",
            "TUBITV2TUIRALIGN_IR_4": "4 left back",
            "TUBITV2TUIRALIGN_IR_5": "5 right front",
            "TUBITV2TUIRALIGN_IR_6": "6 right back"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "TUBITV2TUIRALIGN_CATEGORY": "红外线IR对墙校正",
            "TUBITV2TUIRALIGN_SETUP": "初始化与设定",
            "TUBITV2TUIRALIGN_RUN": "校正与读取",
            "TUBITV2TUIRALIGN_INIT": "初始化 IR对墙校正 模式 %1",
            "TUBITV2TUIRALIGN_SETPINS": "设置红外线引脚 前 %1 后 %2 左前 %3 左后 %4 右前 %5 右后 %6",
            "TUBITV2TUIRALIGN_SETTARGETS": "设置红外线基准值 前 %1 后 %2 左前 %3 左后 %4 右前 %5 右后 %6",
            "TUBITV2TUIRALIGN_ALIGN": "执行 IR对墙校正 主校正 %1 次校正 %2",
            "TUBITV2TUIRALIGN_READIR": "读取红外线 %1 数值",
            "TUBITV2TUIRALIGN_MTC": "麦克纳姆轮 MTC",
            "TUBITV2TUIRALIGN_OTC": "全向轮 OTC",
            "TUBITV2TUIRALIGN_FRONT": "前",
            "TUBITV2TUIRALIGN_BACK": "后",
            "TUBITV2TUIRALIGN_LEFT": "左",
            "TUBITV2TUIRALIGN_RIGHT": "右",
            "TUBITV2TUIRALIGN_NONE": "无",
            "TUBITV2TUIRALIGN_LEFT_FRONT": "左前",
            "TUBITV2TUIRALIGN_LEFT_BACK": "左后",
            "TUBITV2TUIRALIGN_RIGHT_FRONT": "右前",
            "TUBITV2TUIRALIGN_RIGHT_BACK": "右后",
            "TUBITV2TUIRALIGN_IR_1": "1 前",
            "TUBITV2TUIRALIGN_IR_2": "2 后",
            "TUBITV2TUIRALIGN_IR_3": "3 左前",
            "TUBITV2TUIRALIGN_IR_4": "4 左后",
            "TUBITV2TUIRALIGN_IR_5": "5 右前",
            "TUBITV2TUIRALIGN_IR_6": "6 右后"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "TUBITV2TUIRALIGN_CATEGORY": "紅外線IR對牆校正",
            "TUBITV2TUIRALIGN_SETUP": "初始化與設定",
            "TUBITV2TUIRALIGN_RUN": "校正與讀取",
            "TUBITV2TUIRALIGN_INIT": "初始化 IR對牆校正 模式 %1",
            "TUBITV2TUIRALIGN_SETPINS": "設定紅外線腳位 前 %1 後 %2 左前 %3 左後 %4 右前 %5 右後 %6",
            "TUBITV2TUIRALIGN_SETTARGETS": "設定紅外線基準值 前 %1 後 %2 左前 %3 左後 %4 右前 %5 右後 %6",
            "TUBITV2TUIRALIGN_ALIGN": "執行 IR對牆校正 主校正 %1 次校正 %2",
            "TUBITV2TUIRALIGN_READIR": "讀取紅外線 %1 數值",
            "TUBITV2TUIRALIGN_MTC": "麥克納姆輪 MTC",
            "TUBITV2TUIRALIGN_OTC": "全向輪 OTC",
            "TUBITV2TUIRALIGN_FRONT": "前",
            "TUBITV2TUIRALIGN_BACK": "後",
            "TUBITV2TUIRALIGN_LEFT": "左",
            "TUBITV2TUIRALIGN_RIGHT": "右",
            "TUBITV2TUIRALIGN_NONE": "無",
            "TUBITV2TUIRALIGN_LEFT_FRONT": "左前",
            "TUBITV2TUIRALIGN_LEFT_BACK": "左後",
            "TUBITV2TUIRALIGN_RIGHT_FRONT": "右前",
            "TUBITV2TUIRALIGN_RIGHT_BACK": "右後",
            "TUBITV2TUIRALIGN_IR_1": "1 前",
            "TUBITV2TUIRALIGN_IR_2": "2 後",
            "TUBITV2TUIRALIGN_IR_3": "3 左前",
            "TUBITV2TUIRALIGN_IR_4": "4 左後",
            "TUBITV2TUIRALIGN_IR_5": "5 右前",
            "TUBITV2TUIRALIGN_IR_6": "6 右後"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}

exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
