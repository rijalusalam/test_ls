#include <Arduino.h>
#pragma once

class config_
{
public:
  String deviceName;
  String deploymentLocation;
  String productionNumber;
  String userNameID;
  String passwordID;
  String dataConnection;
  String deviceIP;
  String ipServer;
  String ipGateway;
  String buttonQC;
  String wifiConfiguration;
  String wifiIP;
  String wifiGateway;
  String wifiSSID;
  String wifiPassword;
  enum connection
  {
    WIFI,
    ETHERNET
  };
  connection connectionProtokol;

  enum hW_state_
  {
    IDDLE,
    RUN_MOTOR,
    HOMING
  };
  hW_state_ hw_state;
};
config_ config;