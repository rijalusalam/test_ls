#pragma once

class MovingAverage
{
public:
    /**
     * Program ini berfungsi untuk moving average
     * size lebar array 
    */
    MovingAverage(int size);
    ~MovingAverage();
    double readMovingAverage(double value);

private:
    uint16_t size;
    uint16_t indeks;
    double *data;
    uint16_t indeks_buffer;
    double total;
};