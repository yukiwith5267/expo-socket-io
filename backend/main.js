const express = require('express');
const { Gpio } = require('pigpio');
const cors = require('cors');
const sleep = require('sleep');

const app = express();
app.use(cors());

const servoPin = 18; // 適切なGPIOピン番号を指定
const servo = new Gpio(servoPin, { mode: Gpio.OUTPUT });

let pulseWidth = 1000;
let increment = 100;

app.post('/control_servo', (req, res) => {
    servo.servoWrite(pulseWidth);
    sleep.sleep(1);
    pulseWidth += increment;
    if (pulseWidth >= 2000) {
        increment = -100;
    } else if (pulseWidth <= 1000) {
        increment = 100;
    }
    servo.servoWrite(0);
    res.json({ message: 'サーボモータを動かしました' });
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
