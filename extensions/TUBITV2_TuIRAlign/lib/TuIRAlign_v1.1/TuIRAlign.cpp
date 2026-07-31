#include "TuIRAlign.h"
#include "TuMTC.h"
#include "TuOTC.h"


// ============ 建構子 ============

template<typename Robot>
TuIRAlign<Robot>::TuIRAlign(TuBitCore& core, Robot& robot)
  : core_(core),
    robot_(robot),
    // PID I/O 初始值
    IR_Y_IN_(0), IR_Y_OU_(0), IR_Y_SP_(25),
    IR_X_IN_(0), IR_X_OU_(0), IR_X_SP_(0),
    IR_T_IN_(0), IR_T_OU_(0), IR_T_SP_(0),
    // 建立 PID 物件
    pidY_(&IR_Y_IN_, &IR_Y_OU_, &IR_Y_SP_, 3.0, 0.0, 0.0035, DIRECT),
    pidX_(&IR_X_IN_, &IR_X_OU_, &IR_X_SP_, 5.0, 0.0, 0.035,  DIRECT),
    pidT_(&IR_T_IN_, &IR_T_OU_, &IR_T_SP_, 35.0,0.0, 0.035,  DIRECT)
{
  // 預設濾波初值
  fLU_ = fLB_ = fRU_ = fRB_ = fUP_ = fBK_ = 0.0;

  // PID 基本設定
  pidY_.SetMode(AUTOMATIC);
  pidY_.SetSampleTime(5);
  pidY_.SetOutputLimits(-vy_limit_, vy_limit_);

  pidX_.SetMode(AUTOMATIC);
  pidX_.SetSampleTime(5);
  pidX_.SetOutputLimits(-vx_limit_, vx_limit_);

  pidT_.SetMode(AUTOMATIC);
  pidT_.SetSampleTime(5);
  pidT_.SetOutputLimits(-wz_limit_, wz_limit_);
}

// ============ 基本設定函式 ============

template<typename Robot>
void TuIRAlign<Robot>::setPins(int IR_up , int IR_back ,
                               int IR_LU , int IR_LB ,
                               int IR_RU , int IR_RB) {
  pins_.up   = IR_up;
  pins_.back = IR_back;
  pins_.lu   = IR_LU;
  pins_.lb   = IR_LB;
  pins_.ru   = IR_RU;
  pins_.rb   = IR_RB;
}

template<typename Robot>
void TuIRAlign<Robot>::setTargets(double t_up, double t_back,
                                  double t_lu, double t_lb,
                                  double t_ru, double t_rb) {
  targets_.up   = t_up;
  targets_.back = t_back;
  targets_.lu   = t_lu;
  targets_.lb   = t_lb;
  targets_.ru   = t_ru;
  targets_.rb   = t_rb;
}

template<typename Robot>
void TuIRAlign<Robot>::setUseRatioAngle(bool enable) {
  use_ratio_angle_ = enable;
}

template<typename Robot>
void TuIRAlign<Robot>::setDeadbands(double distDb, double angDb) {
  deadband_dist_ = distDb;
  deadband_ang_  = angDb;
}

template<typename Robot>
void TuIRAlign<Robot>::setOutputLimits(double vxLim, double vyLim, double wzLim, double wzScale) {
  vx_limit_ = vxLim;
  vy_limit_ = vyLim;
  wz_limit_ = wzLim;
  wz_scale_ = wzScale;

  pidX_.SetOutputLimits(-vx_limit_, vx_limit_);
  pidY_.SetOutputLimits(-vy_limit_, vy_limit_);
  pidT_.SetOutputLimits(-wz_limit_, wz_limit_);
}

// ============ PID 設定 ============

template<typename Robot>
void TuIRAlign<Robot>::setPidY(double kp, double ki, double kd) {
  pidY_.SetTunings(kp, ki, kd);
}

template<typename Robot>
void TuIRAlign<Robot>::setPidX(double kp, double ki, double kd) {
  pidX_.SetTunings(kp, ki, kd);
}

template<typename Robot>
void TuIRAlign<Robot>::setPidT(double kp, double ki, double kd) {
  pidT_.SetTunings(kp, ki, kd);
}

template<typename Robot>
void TuIRAlign<Robot>::setPidAll(double y_kp, double y_ki, double y_kd,
                                 double x_kp, double x_ki, double x_kd,
                                 double t_kp, double t_ki, double t_kd) {
  pidY_.SetTunings(y_kp, y_ki, y_kd);
  pidX_.SetTunings(x_kp, x_ki, x_kd);
  pidT_.SetTunings(t_kp, t_ki, t_kd);
}

// ============ 主邏輯：step ============

template<typename Robot>
bool TuIRAlign<Robot>::step(IRDir mainDir, IRDir secDir) {
  readAllIR_();

  double vx = 0, vy = 0, wz = 0;

  // === 僅單一方向校正 ===
  if (mainDir == IR_NONE) {
    bool done = false;

    // 僅前後距離（UP / BACK）
    if (secDir == IR_BACK || secDir == IR_UP) {
      if (secDir == IR_BACK) {
        IR_Y_IN_ = fBK_;
        IR_Y_SP_ = targets_.back;
      } else {
        IR_Y_IN_ = fUP_;
        IR_Y_SP_ = targets_.up;
      }

      pidY_.Compute();

      if (reached_(IR_Y_IN_, IR_Y_SP_, deadband_dist_)) {
        IR_Y_OU_ = 0;
        done = true;
      }

      // UP：誤差正向=往前；BACK：反向
      vy = (secDir == IR_UP) ? IR_Y_OU_ : -IR_Y_OU_;
    }
    // 僅左右側距（這裡也改成「最靠牆那顆 = min」）
    else if (secDir == IR_L || secDir == IR_R) {
      bool isLeft = (secDir == IR_L);

      double val, sp;
      if (isLeft) {
        val = min(fLU_, fLB_);
        sp  = min(targets_.lu, targets_.lb);
      } else {
        val = min(fRU_, fRB_);
        sp  = min(targets_.ru, targets_.rb);
      }

      IR_X_IN_ = val;
      IR_X_SP_ = sp;

      pidX_.Compute();

      if (reached_(IR_X_IN_, IR_X_SP_, deadband_dist_)) {
        IR_X_OU_ = 0;
        done = true;
      }

      // vx > 0 往右
      vx = isLeft ? -IR_X_OU_ : IR_X_OU_;
    } else {
      done = true;
    }

    if (done) {
      robot_.driveVectorClosed(0, 0, 0);
      return true;
    }

    robot_.driveVectorClosed(vx, vy, 0);
    return false;
  }

  // === 一般情況：以 L/R 為主牆，做側距＋角度校正 ===
  bool sec_done = false;

  if (mainDir == IR_L || mainDir == IR_R) {
    bool isLeftMain = (mainDir == IR_L);

    if (isLeftMain) {
      // 距離：取較靠牆那顆
      IR_X_IN_ = min(fLU_, fLB_);
      IR_X_SP_ = min(targets_.lu, targets_.lb);

      // 角度：用「目前 - 目標」的差值再互相比較
      // 等於 IR_T_IN_ = ((fLU_ - targets_.lu) - (fLB_ - targets_.lb));
      double dLU = fLU_ - targets_.lu;  // LU 和目標 LU 的誤差
      double dLB = fLB_ - targets_.lb;  // LB 和目標 LB 的誤差
      IR_T_IN_  = dLU - dLB;
    } else {
      IR_X_IN_ = min(fRU_, fRB_);
      IR_X_SP_ = min(targets_.ru, targets_.rb);

      // 右牆同理：比較 RU、RB 分別對目標的誤差
      double dRU = fRU_ - targets_.ru;
      double dRB = fRB_ - targets_.rb;
      IR_T_IN_  = dRU - dRB;
    }

    IR_T_SP_ = 0.0;   // 希望「兩個誤差一樣大」→ 差值為 0
  }


  // 次要目標：前後距離（沿用原本）
  if (secDir == IR_UP) {
    IR_Y_IN_ = fUP_;
    IR_Y_SP_ = targets_.up;
    sec_done = reached_(IR_Y_IN_, IR_Y_SP_, deadband_dist_);
  } else if (secDir == IR_BACK) {
    IR_Y_IN_ = fBK_;
    IR_Y_SP_ = targets_.back;
    sec_done = reached_(IR_Y_IN_, IR_Y_SP_, deadband_dist_);
  } else if (secDir == IR_NONE) {
    IR_Y_IN_ = 0;
    IR_Y_SP_ = 0;
    sec_done = true;
  }

  // 計算 PID
  if (mainDir == IR_L || mainDir == IR_R) {
    pidX_.Compute();
    pidT_.Compute();
  } else {
    IR_X_OU_ = 0;
    IR_T_OU_ = 0;
  }

  if (secDir == IR_UP || secDir == IR_BACK) {
    pidY_.Compute();
  } else {
    IR_Y_OU_ = 0;
  }

  // Deadband 處理
  if (reached_(IR_X_IN_, IR_X_SP_, deadband_dist_)) IR_X_OU_ = 0;
  if (reached_(IR_T_IN_, IR_T_SP_, deadband_ang_))  IR_T_OU_ = 0;
  if ((secDir == IR_UP || secDir == IR_BACK) &&
      reached_(IR_Y_IN_, IR_Y_SP_, deadband_dist_)) IR_Y_OU_ = 0;

  // 主牆側距＋角度是否完成
  bool main_done = true;
  if (mainDir == IR_L || mainDir == IR_R) {
    bool x_ok = reached_(IR_X_IN_, IR_X_SP_, deadband_dist_);
    bool t_ok = reached_(IR_T_IN_, IR_T_SP_, deadband_ang_);
    main_done = x_ok && t_ok;
  }

  bool all_done = main_done && sec_done;

  if (all_done) {
    robot_.driveVectorClosed(0, 0, 0);
    return true;
  }

  // 尚未完成 → 輸出修正速度
  if (mainDir == IR_L || mainDir == IR_R) {
    bool isLeftMain = (mainDir == IR_L);

    // 側距修正（vx > 0 往右）
    if (isLeftMain) {
      vx = -IR_X_OU_;
    } else {
      vx = IR_X_OU_;
      IR_T_OU_ = -IR_T_OU_;   // 右牆角度方向相反
    }

    // 這裡原本是除以 wz_scale_
    // 如果你想要 ≈ *1.15，可以把 wz_scale_ 設成 1.0 / 1.15 ≈ 0.87
    wz = IR_T_OU_ / wz_scale_;
  }

  if (secDir == IR_UP) {
    vy = IR_Y_OU_;
  } else if (secDir == IR_BACK) {
    vy = -IR_Y_OU_;
  }

  robot_.driveVectorClosed(vx, vy, wz*1.15);
  return false;
}


// ============ 阻塞式 ============

template<typename Robot>
bool TuIRAlign<Robot>::alignBlocking(IRDir mainDir,
                                     IRDir secDir,
                                     unsigned long timeout_ms,
                                     unsigned long confirm_ms) {
  robot_.syncPidReference(true);

  unsigned long start   = millis();
  bool          doneHit = false;
  unsigned long doneAt  = 0;

  while (true) {

    if (!doneHit) {
      // 還沒第一次達標 → 正常呼叫 step
      if (step(mainDir, secDir)) {
        doneHit = true;
        doneAt  = millis();   // 記錄「第一次完成」時間
      }
    } else {
      // 已經完成一次 → 進入「微調階段」
      unsigned long now = millis();

      if (now - doneAt >= confirm_ms) {
        // 微調時間到 → 停車 + resetEnc，結束
        core_.stopAllMotors();
        core_.resetEnc();
        return true;
      } else {
        // 在確認期間，繼續呼叫 step 做微調（忽略回傳值）
        step(mainDir, secDir);
      }
    }

    // Timeout 判斷（包含微調時間）
    if (millis() - start >= timeout_ms) {
      core_.stopAllMotors();
      core_.resetEnc();
      return false;
    }

    delay(5);
  }
}


// ============ debug getter ============

template<typename Robot>
double TuIRAlign<Robot>::getFilteredLU() const { return fLU_; }

template<typename Robot>
double TuIRAlign<Robot>::getFilteredLB() const { return fLB_; }

template<typename Robot>
double TuIRAlign<Robot>::getFilteredRU() const { return fRU_; }

template<typename Robot>
double TuIRAlign<Robot>::getFilteredRB() const { return fRB_; }

template<typename Robot>
double TuIRAlign<Robot>::getFilteredUP() const { return fUP_; }

template<typename Robot>
double TuIRAlign<Robot>::getFilteredBK() const { return fBK_; }

// ============ 內部工具 ============

template<typename Robot>
double TuIRAlign<Robot>::readIR_(int pin) {
  if (pin < 0) return 0.0;
  return analogRead(pin) / 100.0;
}

template<typename Robot>
void TuIRAlign<Robot>::readAllIR_() {
  double LU = readIR_(pins_.lu);
  double LB = readIR_(pins_.lb);
  double RU = readIR_(pins_.ru);
  double RB = readIR_(pins_.rb);
  double UP = readIR_(pins_.up);
  double BK = readIR_(pins_.back);

  fLU_ = ema_(fLU_, LU, 0.25);
  fLB_ = ema_(fLB_, LB, 0.25);
  fRU_ = ema_(fRU_, RU, 0.25);
  fRB_ = ema_(fRB_, RB, 0.25);
  fUP_ = ema_(fUP_, UP, 0.25);
  fBK_ = ema_(fBK_, BK, 0.25);
}

template<typename Robot>
bool TuIRAlign<Robot>::reached_(double in, double sp, double db) const {
  return fabs(in - sp) <= db;
}

template<typename Robot>
double TuIRAlign<Robot>::ema_(double prev, double now, double alpha) {
  return prev * (1.0 - alpha) + now * alpha;
}

// ============ 顯式實體化 ============

// 這兩行會在這個 .cpp 裡「真的產生」TuIRAlign<TuMTC> / TuIRAlign<TuOTC> 的程式碼
template class TuIRAlign<TuMTC>;
template class TuIRAlign<TuOTC>;
