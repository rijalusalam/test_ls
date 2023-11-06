
#include <Arduino.h>
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
// #include "settingDevice.h"
// #include "variable.h"
// #include "test.h"

MovingAverage mag(10);

void setup()
{
  // settingDevice();
  Serial.begin(115200);
}

void loop()
{
}