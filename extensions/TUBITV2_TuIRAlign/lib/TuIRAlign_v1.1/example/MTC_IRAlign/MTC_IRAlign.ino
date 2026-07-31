#include <TuBitCore.h>
#include <TuMTC.h>
#include <TuIRAlign.h>

TuBitCore core;
TuMTC    mtc(core);
TuIRAlign<TuMTC> ir(core, mtc);

void setup() {
  core.init();
  Serial.begin(115200);

  ir.setPins(33,32,35,34,39,36);    // 上 / 後 / 左上 / 左下 / 右上 / 右下
  ir.setTargets(25,25,25,25,25,25); // 目標距離=25(測定基準)

  // PID可調
  ir.setPidAll(3.0,0,0.004,   // 前後 Y
               5.0,0,0.035,   // 左右 X
               38,0,0.04);    // 角度 T

  Serial.println("開始靠左 + 修正角度 + 後退距離...");
  bool result = ir.alignBlocking(IR_L, IR_BACK, 8000);

  Serial.println(result? "✔校正完成" : "❌超時未達成");
}

void loop(){}
