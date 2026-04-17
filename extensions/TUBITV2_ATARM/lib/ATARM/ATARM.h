#ifndef ATARM_H
#define ATARM_H

#include <Arduino.h>
#include <TuBitCore.h>

// ------------------- 外部全域物件 -------------------
extern TuBitCore tubit;   // 在 main.ino 定義 TuBitCore tubit;

// ------------------- 預設腳位 -------------------
ServoNum atarm_panPin   = S0;   // 旋轉馬達
ServoNum atarm_liftPin  = S1;   // 抬臂馬達
ServoNum atarm_clawPin  = S2;   // 夾爪馬達

// ------------------- 馬達角度變數 -------------------
float atarm_clawOpenDeg  = 70;      // 夾爪開角度
float atarm_clawCloseDeg = 152.5;   // 夾爪關角度
float atarm_clawDeg      = 70;      // 當前夾爪角度

float atarm_liftMinDeg   = 5;       // 抬臂最小角度
float atarm_liftMaxDeg   = 65;      // 抬臂最大角度
float atarm_liftDeg      = 5;       // 當前抬臂角度

float atarm_panMinDeg    = 60;      // 旋轉最小角度
float atarm_panMaxDeg    = 120;     // 旋轉最大角度
float atarm_panDeg       = 90;      // 當前旋轉角度

// ------------------- 初始化 -------------------
inline void ATARM_INIT(ServoNum pan = S0, ServoNum lift = S1, ServoNum claw = S2) {
  atarm_panPin   = pan;
  atarm_liftPin  = lift;
  atarm_clawPin  = claw;

  atarm_liftDeg = atarm_liftMinDeg;
  atarm_panDeg  = (atarm_panMinDeg + atarm_panMaxDeg) / 2;
  atarm_clawDeg = atarm_clawOpenDeg;

  tubit.setServoAngle(atarm_liftPin, atarm_liftDeg);
  tubit.setServoAngle(atarm_panPin, atarm_panDeg);
  tubit.setServoAngle(atarm_clawPin, atarm_clawDeg);
}

// ------------------- 範圍設定 -------------------
inline void ATARM_SetClawRange(float openDeg, float closeDeg) {
  atarm_clawOpenDeg  = openDeg;
  atarm_clawCloseDeg = closeDeg;
}

inline void ATARM_SetLiftRange(float minDeg, float maxDeg) {
  atarm_liftMinDeg = minDeg;
  atarm_liftMaxDeg = maxDeg;
}

inline void ATARM_SetPanRange(float minDeg, float maxDeg) {
  atarm_panMinDeg = minDeg;
  atarm_panMaxDeg = maxDeg;
}

// ------------------- 夾爪控制 -------------------
inline void ATARM_ClawCtrl(bool action, int sec = 0) {
  float target = action ? atarm_clawCloseDeg : atarm_clawOpenDeg;

  if (sec <= 0) {
    atarm_clawDeg = target;
    tubit.setServoAngle(atarm_clawPin, atarm_clawDeg);
    return;
  }

  float step = (target - atarm_clawDeg) / 100.0;
  int delayTime = (sec * 1000) / 100;

  for (int i = 0; i < 100; i++) {
    atarm_clawDeg += step;
    tubit.setServoAngle(atarm_clawPin, atarm_clawDeg);
    delay(delayTime);
  }
  atarm_clawDeg = target;
}

// ------------------- 抬臂馬達累加 -------------------
inline void ATARM_LiftAdd(float deg) {
  atarm_liftDeg += deg;
  if (atarm_liftDeg > atarm_liftMaxDeg) atarm_liftDeg = atarm_liftMaxDeg;
  if (atarm_liftDeg < atarm_liftMinDeg) atarm_liftDeg = atarm_liftMinDeg;
  tubit.setServoAngle(atarm_liftPin, atarm_liftDeg);
}

// ------------------- 旋轉馬達累加 -------------------
inline void ATARM_PanAdd(float deg) {
  atarm_panDeg += deg;
  if (atarm_panDeg > atarm_panMaxDeg) atarm_panDeg = atarm_panMaxDeg;
  if (atarm_panDeg < atarm_panMinDeg) atarm_panDeg = atarm_panMinDeg;
  tubit.setServoAngle(atarm_panPin, atarm_panDeg);
}

// ------------------- 抬臂馬達設定角度 (平滑轉動) -------------------
inline void ATARM_LiftSet(float target, int sec) {
  if (target > atarm_liftMaxDeg) target = atarm_liftMaxDeg;
  if (target < atarm_liftMinDeg) target = atarm_liftMinDeg;

  if (sec <= 0) {
    atarm_liftDeg = target;
    tubit.setServoAngle(atarm_liftPin, atarm_liftDeg);
    return;
  }

  float step = (target - atarm_liftDeg) / 100.0;
  int delayTime = (sec * 1000) / 100;

  for (int i = 0; i < 100; i++) {
    atarm_liftDeg += step;
    tubit.setServoAngle(atarm_liftPin, atarm_liftDeg);
    delay(delayTime);
  }
  atarm_liftDeg = target;
}

// ------------------- 旋轉馬達設定角度 (平滑轉動) -------------------
inline void ATARM_PanSet(float target, int sec) {
  if (target > atarm_panMaxDeg) target = atarm_panMaxDeg;
  if (target < atarm_panMinDeg) target = atarm_panMinDeg;

  if (sec <= 0) {
    atarm_panDeg = target;
    tubit.setServoAngle(atarm_panPin, atarm_panDeg);
    return;
  }

  float step = (target - atarm_panDeg) / 100.0;
  int delayTime = (sec * 1000) / 100;

  for (int i = 0; i < 100; i++) {
    atarm_panDeg += step;
    tubit.setServoAngle(atarm_panPin, atarm_panDeg);
    delay(delayTime);
  }
  atarm_panDeg = target;
}

#endif