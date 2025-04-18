from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from twilio.rest import Client
import os


app = Flask(__name__)
CORS(app)

API_KEY = "e472b46560785b3f0db3095614e97a6a"

# Twilio Configuration
TWILIO_ACCOUNT_SID = "AC7e8a84db26bc8832a14c8a4153801939"
TWILIO_AUTH_TOKEN = "bd855bb629fd1146a1cd8849bf91ada0"

TWILIO_PHONE_NUMBER = "+19472176585"

twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

def send_sms(to, body):
    try:
        message = twilio_client.messages.create(
            body=body,
            from_=TWILIO_PHONE_NUMBER,
            to=to
        )
        print(f"✅ SMS sent: {message.sid}")
    except Exception as e:
        print(f"❌ Failed to send SMS: {e}")

@app.route("/weather", methods=["POST"])
def get_weather():
    data = request.get_json()
    city = data.get("city")
    phone = data.get("phone")

    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)

    if response.status_code == 200:
        weather = response.json()
        temperature = weather["main"]["temp"]
        rainfall = weather.get("rain", {}).get("1h", 0)

        recommendation = (
            "Moderate water usage expected." if 20 <= temperature <= 30 else "High/Low water usage."
        )

        sms_text = f"🌍 {city} Weather:\n🌡️ {temperature}°C\n🌧️ {rainfall} mm\n💧 {recommendation}"
        send_sms(phone, sms_text)

        return jsonify({
            "city": city,
            "temperature": temperature,
            "rainfall": rainfall,
            "recommendation": recommendation
        })
    else:
        return jsonify({"error": "City not found"}), 404

if __name__ == "__main__":
    print("🚀 Flask app is starting...")
    app.run(host="0.0.0.0", port=5000, debug=True)
