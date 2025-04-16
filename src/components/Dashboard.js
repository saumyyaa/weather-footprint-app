import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth, db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Handle language change
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email);
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const userData = snapshot.docs[0].data();
          setPhone(userData.phone);
        }
      } else {
        navigate("/login");
      }
    });
  }, [navigate]);

  const saveHistory = async (weatherData) => {
    try {
      await addDoc(collection(db, "history"), {
        email: userEmail,
        city: weatherData.city,
        temperature: weatherData.temperature,
        rainfall: weatherData.rainfall,
        recommendation: weatherData.recommendation,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error saving history:", error);
    }
  };

  const fetchWeather = async () => {
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/weather", {
        city,
        phone,
      });
      setWeatherData(response.data);
      await saveHistory(response.data);
    } catch (err) {
      setError(t("error_city_not_found"));
      setWeatherData(null);
    }
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-blue-700">
          {t("dashboard_title")}
        </h1>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate("/history")}
            className="text-blue-600 hover:underline"
          >
            {t("history")}
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            {t("sign_out")}
          </button>
        </div>
      </div>

      {/* Language Selector */}
      <div className="flex justify-end gap-2 px-6 pt-4">
        {["en", "hi", "ta", "kn", "pa", "gu"].map((lng) => (
          <button
            key={lng}
            onClick={() => changeLanguage(lng)}
            className="px-3 py-1 bg-white border rounded hover:bg-gray-100"
          >
            {lng.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Input & Result */}
      <div className="p-6">
        <input
          className="border p-2 mt-4 w-full max-w-md rounded"
          type="text"
          placeholder={t("enter_city")}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 mt-3 rounded"
          onClick={fetchWeather}
        >
          {t("get_recommendation")}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        {weatherData && (
          <div className="mt-4 bg-white p-4 rounded shadow max-w-md">
            <h2 className="text-xl font-semibold">{weatherData.city}</h2>
            <p>
              🌡️ {t("temperature")}: {weatherData.temperature}°C
            </p>
            <p>
              🌧️ {t("rainfall")}: {weatherData.rainfall} mm
            </p>
            <p>
              <strong>💧 {t("recommendation")}:</strong>{" "}
              {weatherData.recommendation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
