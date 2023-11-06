
#include <MPU9250.h>
#include "loadScanner_IMU.h"
#include <Wire.h>
#include "globalVariable.h"

MPU9250 IMU(Wire, 0x68);

double loadScanner_IMU_::readSensor()
{
    IMU.readSensor();
    accelX = (IMU.getAccelBiasX_mss() + 0.3);
    accelY = (IMU.getAccelBiasY_mss() - 0.18);
    accelZ = (IMU.getAccelBiasZ_mss() - 0.3);
    current_angle = atan2(-accelX, (sqrt((accelY * accelY) + (accelZ * accelZ))));
    current_angle = current_angle * RAD_TO_DEG;
    finalAngleIMU = current_angle;
    if (-accelX < 0 && accelZ < 0)
    {
        finalAngleIMU = -80 + (-80 - finalAngleIMU);
    }
    if (-accelX > 0 && accelZ < 0)
    {
        finalAngleIMU = (90 + (90 - finalAngleIMU));
    }
    filter_angle = moving_average(finalAngleIMU) - 0;
    return filter_angle;
}