#include <Arduino.h>
#pragma once

#define EEPROM_SIZE 500
#define TRHESHOLD_RETRY 20
#define THRESHOLD_CONNECT 20
#define INTERVAL_TIMER 20 // 20 uS

#define THRESHOLD_CONNECT 30
#define INTERVAL_TIMER 20 // 20 uS

byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED};
#define UDP_PORT 9999
double degree_step = 0.00703125;

class param_
{
    enum webServerRequest_
    {
        HARDWARE_CONFIG,
        HARDWARE_CHART,
        HARDWARE_UPDATE
    };
    webServerRequest_ webServerRequest;
};
param_ param;