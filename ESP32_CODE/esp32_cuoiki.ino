#include <DHT.h>
#include <WiFi.h>
#include <FirebaseESP32.h>

// Khai báo cảm biến DHT11
const int PINDHT = 12;
#define DHTTYPE DHT11
DHT dht(PINDHT, DHTTYPE);

// Khai báo chân cảm biến MQ2
#define MQ2_A 34
#define MQ2_D 23

// Khai báo LED
#define LED_door 2
#define BUZZER_GAS 0
#define LED_fan 4
#define LED_light 16

// Cấu hình Firebase
#define FIREBASE_HOST "tt-iot-d4f71-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "wicmah7GnZAy9PZO0sN6H32VjKr4EfOsZUUqJ8kT"
FirebaseData fbdb;
FirebaseAuth auth;
FirebaseConfig config;

// Cấu hình WiFi
#define WiFi_SSID "TP-LINK_B328"
#define WiFi_PASSWORD "07396458"

void setup() {
    Serial.begin(9600);
    dht.begin(); // Khởi động cảm biến DHT11

    pinMode(BUZZER_GAS, OUTPUT);
    pinMode(LED_door, OUTPUT);
    pinMode(LED_fan, OUTPUT);
    pinMode(LED_light, OUTPUT);
    pinMode(MQ2_A, INPUT);
    pinMode(MQ2_D, INPUT);

    // Kết nối WiFi
    WiFi.begin(WiFi_SSID, WiFi_PASSWORD);
    Serial.print("Đang kết nối WiFi");
    while (WiFi.status() != WL_CONNECTED) {
        Serial.print(".");
        delay(300);
    }
    Serial.println("\nWiFi đã kết nối!");
    Serial.print("IP: ");
    Serial.println(WiFi.localIP());

    // Kết nối Firebase
    config.host = FIREBASE_HOST;
    config.signer.tokens.legacy_token = FIREBASE_AUTH;
    Firebase.begin(&config, &auth);
    Firebase.reconnectWiFi(true);
}

void loop() 
{
    float humi = dht.readHumidity();
float temp = dht.readTemperature();

if (isnan(humi) || isnan(temp)) {
    Serial.println("❌ Không đọc được cảm biến DHT11!");
} else {
    Serial.print("🌡 Temperature: ");
    Serial.print(temp);
    Serial.print("°C | 💧 Humidity: ");
    Serial.print(humi);
    Serial.println("%");

    Firebase.setInt(fbdb, "/Coso_IOT/Humi", (int)humi);
    Firebase.setInt(fbdb, "/Coso_IOT/Temp", (int)temp);
  }


    // Đọc cảm biến MQ2
    int analogValue = analogRead(MQ2_A);
    int digitalValue = digitalRead(MQ2_D);

    Serial.print("🔥 MQ2 Analog: ");
    Serial.print(analogValue);
    Serial.print(" | 🔥 MQ2 Digital: ");
    Serial.println(digitalValue);

    Firebase.setInt(fbdb, "/Coso_IOT/Gas", analogValue);
    Firebase.setInt(fbdb, "/Coso_IOT/Digital_Value", digitalValue);

    // Bật LED khi phát hiện khí gas
    digitalWrite(BUZZER_GAS, analogValue > 1000 ? HIGH : LOW);

    // Kiểm tra điều khiển LED từ Firebase
    if (Firebase.getInt(fbdb, "/thietbi1/door")) {
        int state = fbdb.to<int>();
        digitalWrite(LED_door, state == 1 ? HIGH : LOW);
    }

    if (Firebase.getInt(fbdb, "/thietbi2/den1")) {
        int state = fbdb.to<int>();
        digitalWrite(LED_light, state == 1 ? HIGH : LOW);
    }

    if (Firebase.getInt(fbdb, "/thietbi3/quat")) {
        int state = fbdb.to<int>();
        digitalWrite(LED_fan, state == 1 ? HIGH : LOW);
    }

    // Kiểm tra WiFi
    if (WiFi.status() != WL_CONNECTED) {
        Serial.println("⚠ WiFi mất kết nối! Đang kết nối lại...");
        WiFi.disconnect();
        WiFi.begin(WiFi_SSID, WiFi_PASSWORD);
        delay(5000);
    }

    delay(2000); // Đợi 2 giây trước khi đo lần tiếp theo
}
