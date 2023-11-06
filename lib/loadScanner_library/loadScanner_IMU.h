#pragma once
#include <movingAverage.h>

class loadScanner_IMU_
{
public:
    double readSensor();
    double moving_average(double dataIn);

private:
    double accelX, accelY, accelZ;
    double current_angle;
    double finalAngleIMU;
    double filter_angle;
};