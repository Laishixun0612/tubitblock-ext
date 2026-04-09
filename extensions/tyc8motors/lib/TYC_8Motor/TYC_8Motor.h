/*
 * 作者:東業創新科技X鴻兔科技
 * 時間:2026/04/07
 * 提供給TYC ESP32 8路馬達擴展板
 * 有問題請來信hr_user@trgreat.com
 * 官方網站 trgreat.com
 */

#ifndef TYC_8MOTOR_H
#define TYC_8MOTOR_H

#include <Arduino.h>
#include <ESP32PWM.h>

class TYC_8Motor {
public:
    TYC_8Motor();

    // motorMask: 用位元決定開啟哪些馬達。例如 0xFF (B11111111) 為全開。
    // 如果不打算用馬達 8 (18,19)，則傳入 0x7F (B01111111)。
    void begin(uint8_t motorMask = 0xFF);
    // 新增：設定特定馬達是否反向 (Mn: 1~8, isInverted: true 為反向)
    void setInverted(uint8_t Mn, bool isInverted);
    // Mn: 1~8, spd: -255~255
    void motorControl(uint8_t Mn, int spd);
    //停止所有馬達
    void stopAll();

private:
    ESP32PWM _pwms[16]; // 0-1 為 Motor1, 2-3 為 Motor2... 以此類推
    bool _isAttached[8];
    bool _reversed[8]; // 新增：儲存 8 顆馬達的正反轉設定
    const uint8_t _pins[16] = {32, 33, 26, 27, 13, 12, 15, 14, 16, 17, 4, 5, 23, 25, 18, 19};
};

#endif