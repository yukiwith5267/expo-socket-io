from fastapi import FastAPI
import pigpio
import time

app = FastAPI()

# pigpioの初期化
pi = pigpio.pi()

# サーボモータを初期化
servo_pin = 18  # 適切なGPIOピン番号を指定してください
servo_range = (500, 2500)  # サーボモータの動作範囲に合わせて適切な値に設定してください
middle_position = sum(servo_range) // 2  # 中間位置

# ルートエンドポイント
@app.post("/control_servo")
async def control_servo():
    pi.set_servo_pulsewidth(servo_pin, middle_position)
    
    time.sleep(1)
    
    pi.set_servo_pulsewidth(servo_pin, middle_position + 250)
    
    time.sleep(1)
    
    pi.set_servo_pulsewidth(servo_pin, 0)
    
    return {"message": "サーボモータを動かしました"}

# FastAPIサーバーを起動
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
