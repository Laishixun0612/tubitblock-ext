#include <Wire.h>
#include <TuBitCore.h>
#include <TuMTC.h>
#include <TuIRAlign.h>

TuBitCore core;
TuMTC mtc(core);
TuIRAlign<TuMTC> ir(core, mtc);

void waitForButtonB() {
  Serial.println("請按下按鈕 B 開始校正");

  // 等待按鈕 B 被按下。
  while (!core.readButton(Button_B)) {
    delay(10);
  }

  // 簡單消抖，避免按鈕接點彈跳造成誤判。
  delay(50);

  // 等待放開按鈕後再繼續，避免手還壓著時車子立刻開始動。
  while (core.readButton(Button_B)) {
    delay(10);
  }

  delay(50);
  Serial.println("已偵測到按鈕 B，開始校正");
}

void setup() {
  core.init();
  Serial.begin(115200);

  // IR 腳位順序：上 / 後 / 左上 / 左下 / 右上 / 右下
  ir.setPins(33, 32, 35, 34, 39, 36);

  // 目標值請用 analogRead() / 100 的實測值填入。
  // 這裡的 25 代表六顆 IR 在理想距離時，讀值約為 25。
  ir.setTargets(25, 25, 25, 25, 25, 25);

  // v2.0 預設容許誤差為目標值的正負 5%。
  // 例如目標 25 時，讀值落在 23.75 到 26.25 之間就視為達標。
  // 若想更精準可改成 3.0；若馬達容易抖動可改成 8.0；設為 0 可關閉百分比容許。
  ir.setTolerancePercent(5.0);

  // 絕對 deadband 仍會保留，實際判斷會取「百分比容許」與「deadband」中較大的值。
  // 第一個參數是距離 deadband，第二個參數是角度差 deadband。
  ir.setDeadbands(0.3, 0.3);

  // PID 可依車況微調：Y=前後、X=左右橫移、Z=原地旋轉。
  // 每一組 PID 的參數順序皆為 Kp, Ki, Kd。
  ir.setPidY(3.0, 0, 0.004);

  // v2.0 新增：更明確的 X / Z PID 調整方法。
  ir.setXPID(5.0, 0, 0.035);     // X 軸 Kp, Ki, Kd：左右橫移
  ir.setZPID(38,  0, 0.04);      // Z 軸 Kp, Ki, Kd：車體旋轉

  // 也可以一次設定 X 與 Z：
  // ir.setXZPID(5.0, 0, 0.035, 38, 0, 0.04);

  waitForButtonB();

  Serial.println("開始靠左牆校正，並同時調整後方距離");

  // 主校正 IR_L / IR_R 會先橫移到側邊其中一顆 IR 接近目標值，
  // 接著才旋轉車體修正角度，避免橫移與旋轉同時拉扯。
  bool result = ir.alignBlocking(IR_L, IR_BACK, 8000);

  if (result) {
    Serial.println("校正完成");
  } else {
    Serial.println("校正超時");
  }
}

void loop() {
}
