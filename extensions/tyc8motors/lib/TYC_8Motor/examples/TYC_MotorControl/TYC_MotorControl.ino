/*
 * 作者:東業創新科技X鴻兔科技
 * 時間:2026/04/07
 * 提供給TYC ESP32 8路馬達擴展板
 * 有問題請來信hr_user@trgreat.com
 * 官方網站 trgreat.com
 */

#include <TYC_8Motor.h>

// 建立馬達控制物件
TYC_8Motor motors;

void setup() {
  Serial.begin(115200);
  delay(1000);

  /* * 【進階：位元遮罩 (Bitmask) 與 十六進制說明】
   * * 1. 十六進制 A~F 的數值對照：
   * A=10 (1010), B=11 (1011), C=12 (1100)
   * D=13 (1101), E=14 (1110), F=15 (1111)
   * * 2. 如何對應馬達 (由右至左)：
   * 遮罩位元： [M8] [M7] [M6] [M5] | [M4] [M3] [M2] [M1]
   * ---------------------------------------------------
   * 範例 0xFF：  1    1    1    1  |  1    1    1    1  (全部啟用)
   * 範例 0x9F：  1    0    0    1  |  1    1    1    1  (啟用 1,2,3,4,5,8)
   * 範例 0x3F：  0    0    1    1  |  1    1    1    1  (啟用 1,2,3,4,5,6，釋放 18,19,23,25)
   * * 3. 提示：
   * 如果你不習慣十六進制，也可以直接寫二進制，例如：
   * motors.begin(0b10011111); // 效果等同於 0x9F
   */

  // 預設啟用全部 8 顆馬達
  Serial.println("Initializing All 8 Motors (0xFF)...");
  motors.begin(0xFF); 

  //motors.setInverted(Mn, true); //設定馬達反向轉動 (預設正向轉動)  
  Serial.println("TYC 8-Motor Test Start!");
}

void loop() {
  // 控制 8 顆馬達的迴圈
  int totalMotors = 8; 

  // --- 階段 1：從速度 0 ~ 255 (加速正轉) ---
  Serial.println("Phase 1: 0 to 255");
  for (int s = 0; s <= 255; s++) {
    for (int i = 1; i <= totalMotors; i++) {
      motors.motorControl(i, s);
    }
    delay(10); 
  }

  // --- 階段 2：從速度 255 ~ 0 (減速停止) ---
  Serial.println("Phase 2: 255 to 0");
  for (int s = 255; s >= 0; s--) {
    for (int i = 1; i <= totalMotors; i++) {
      motors.motorControl(i, s);
    }
    delay(10);
  }

  delay(500); 

  // --- 階段 3：從速度 0 ~ -255 (加速反轉) ---
  Serial.println("Phase 3: 0 to -255");
  for (int s = 0; s >= -255; s--) {
    for (int i = 1; i <= totalMotors; i++) {
      motors.motorControl(i, s);
    }
    delay(10);
  }

  // --- 階段 4：從速度 -255 ~ 0 (反轉減速到停止) ---
  Serial.println("Phase 4: -255 to 0");
  for (int s = -255; s <= 0; s++) {
    for (int i = 1; i <= totalMotors; i++) {
      motors.motorControl(i, s);
    }
    delay(10);
  }

  Serial.println("Cycle Complete. Waiting 2 seconds...");
  delay(2000);
}
