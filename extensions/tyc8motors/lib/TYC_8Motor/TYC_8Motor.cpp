/*
 * 作者:東業創新科技X鴻兔科技
 * 時間:2026/04/07
 * 提供給TYC ESP32 8路馬達擴展板
 * 有問題請來信hr_user@trgreat.com
 * 官方網站 trgreat.com
 */

#include "TYC_8Motor.h"

TYC_8Motor::TYC_8Motor() {
    for (int i = 0; i < 8; i++) {
        _isAttached[i] = false;
        _reversed[i] = false; // 初始化反向設定為 false
    }
}

// 設定馬達方向
void TYC_8Motor::setInverted(uint8_t Mn, bool isInverted) {
    if (Mn < 1 || Mn > 8) return;
    _reversed[Mn - 1] = isInverted;
}

void TYC_8Motor::begin(uint8_t motorMask) {
    for (int i = 0; i < 8; i++) {
        // 檢查該位元是否為 1 (由低位元到高位元對應 Motor 1-8) 
        if ((motorMask >> i) & 0x01) {
            _pwms[i * 2].attachPin(_pins[i * 2], 490, 8);
            _pwms[i * 2 + 1].attachPin(_pins[i * 2 + 1], 490, 8);
            _isAttached[i] = true;
        }
    }
}

void TYC_8Motor::motorControl(uint8_t Mn, int spd) {
    // 1. 檢查馬達編號是否在 1~8 範圍內 
    if (Mn < 1 || Mn > 8) return;
    
    uint8_t idx = Mn - 1; // 先定義 idx 

    // 2. 檢查該馬達是否有在 begin() 中初始化 
    if (!_isAttached[idx]) return;

    // 3. 處理反向邏輯：如果該馬達被設定為反向，則將 spd 乘以 -1 
    if (_reversed[idx]) {
        spd = -spd;
    }

    // 4. 限制輸入數值嚴格在 -255 到 255 之間 
    spd = constrain(spd, -255, 255);

    ESP32PWM *pwm_f = &_pwms[idx * 2];
    ESP32PWM *pwm_r = &_pwms[idx * 2 + 1];

    if (spd == 0) {
        // 停止 
        pwm_f->write(0);
        pwm_r->write(0);
    } else if (spd > 0) {
        // 正轉 
        pwm_f->write(spd);
        pwm_r->write(0);
    } else {
        // 反轉 (取絕對值) 
        pwm_f->write(0);
        pwm_r->write(abs(spd));
    }
}

void TYC_8Motor::stopAll() {
    for (int i = 0; i < 8; i++) {
        // 僅針對在 begin() 中有被初始化的馬達進行操作 
        if (_isAttached[i]) {
            // 直接操作底層 PWM 設為 0，確保即時停止
            _pwms[i * 2].write(0);
            _pwms[i * 2 + 1].write(0);
        }
    }
}