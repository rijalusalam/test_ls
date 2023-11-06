#include <Arduino.h>
#include "movingAverage.h"

MovingAverage::MovingAverage(int size)
{
    Serial.begin(115200);
    this->size = size;
    this->indeks = 0;
    data = new double[size];
    for (int a = 0; a < size; a++)
    {
        data[a] = 0;
    }
    // memset(data, 0, size);
    total = 0;
    Serial.print("HALO:");
    Serial.println(size);
}

MovingAverage::~MovingAverage()
{
    delete[] data;
}

double MovingAverage::readMovingAverage(double value)
{
    total -= data[this->indeks];
    data[this->indeks] = value;
    total += data[this->indeks];
    this->indeks++;
    float angle = total / this->size;
    if (this->indeks > size)
    {
        this->indeks = 0;
    }
    return angle;
}