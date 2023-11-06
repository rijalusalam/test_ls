/*
  Basic_I2C.ino
  Brian R Taylor
  brian.taylor@bolderflight.com

  Copyright (c) 2017 Bolder Flight Systems

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software
  and associated documentation files (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge, publish, distribute,
  sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or
  substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
  BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

#include "MPU9250.h"

// an MPU9250 object with the MPU-9250 sensor on I2C bus 0 with address 0x68
MPU9250 IMU(Wire, 0x68);
int status;

double roll, pitch, yaw;
double accelX, accelY, accelZ;
double gyroX, gyroY, gyroZ;
double magX, magY, magZ;

void setup() {
  // serial to display data
  Serial.begin(115200);
  while (!Serial) {}

  // start communication with IMU
  status = IMU.begin();
  if (status < 0) {
    Serial.println("IMU initialization unsuccessful");
    Serial.println("Check IMU wiring or try cycling power");
    Serial.print("Status: ");
    Serial.println(status);
    while (1) {}
  }
}

void loop() {
  // read the sensor
  IMU.readSensor();
  // display the data
  accelX = (IMU.getAccelX_mss() + 0.3);
  accelY = (IMU.getAccelY_mss() - 0.18);
  accelZ = (IMU.getAccelZ_mss() - 0.3);
  gyroX  = (IMU.getGyroX_rads());
  gyroY  = (IMU.getGyroY_rads());
  gyroZ  = (IMU.getGyroZ_rads());
  float Yh = (magY * cos(roll)) - (magZ * sin(roll));
  float Xh = (magX * cos(pitch)) + (magY * sin(roll) * sin(pitch)) + (magZ * cos(roll) * sin(pitch));
  pitch = atan2(accelY, (sqrt((accelX * accelX) + (accelZ * accelZ))));
  pitch = pitch * RAD_TO_DEG;
  roll  = atan2(-accelX, (sqrt((accelY * accelY) + (accelZ * accelZ))));
  roll = roll * RAD_TO_DEG;
  roll = (roll + 360) % 360;
  yaw   = atan2(Yh, Xh);
  yaw = yaw * RAD_TO_DEG;
  Serial.print(accelX); Serial.print(',');
  Serial.print(accelY); Serial.print(',');
  Serial.print(accelZ); Serial.print('\t');
  Serial.print(roll); Serial.print(',');
  Serial.print(pitch); Serial.print(',');
  Serial.println(yaw);
  delay(20);
}
