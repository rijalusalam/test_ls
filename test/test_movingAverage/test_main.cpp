#include <Arduino.h>
#include <SPI.h>
#include <unity.h>
#include <ArduinoJson.h>
#include <AsyncTCP.h>
#include <AsyncElegantOTA.h>
#include <Ethernet.h>
#include <EthernetUdp.h>
#include <EEPROM.h>
#include <ESPAsyncWebServer.h>
#include <MPU9250.h>
#include <WiFi.h>
#include <WiFiUdp.h>
#include <WiFiClient.h>
#include <Wire.h>
#include <SPI.h>
#include "SPIFFS.h"
#include <FS.h>
#include <TMC5160.h>
#include <movingAverage.h>
#include <hitung.h>

void test_pertambahan(void)
{
    Hitung abcd;
    int result = abcd.tambah(5, 10);
    TEST_ASSERT_EQUAL(15, result);
}

void test_movingAverage(void)
{
    MovingAverage mag(10);
    double result = mag.readMovingAverage(10);
    TEST_ASSERT_EQUAL(6.0, result);
    result = mag.readMovingAverage(10);
    TEST_ASSERT_EQUAL(6.0, result);
}

void setup()
{
    UNITY_BEGIN(); // IMPORTANT LINE!
    RUN_TEST(test_pertambahan);
    RUN_TEST(test_movingAverage);
    UNITY_END();
}

void loop()
{

}