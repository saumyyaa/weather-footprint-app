
// components/History.js
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const History = () => {
  const [history, setHistory] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email);
        const q = query(
          collection(db, "history"),
          where("email", "==", user.email),
          orderBy("timestamp", "desc")
        );
        const snapshot = await getDocs(q);
        const historyData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setHistory(historyData);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Usage History</h2>
      {history.length === 0 ? (
        <p>No history available.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="border px-4 py-2">City</th>
              <th className="border px-4 py-2">Temperature (°C)</th>
              <th className="border px-4 py-2">Rainfall (mm)</th>
              <th className="border px-4 py-2">Recommendation</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="border px-4 py-2">{item.city}</td>
                <td className="border px-4 py-2">{item.temperature}</td>
                <td className="border px-4 py-2">{item.rainfall}</td>
                <td className="border px-4 py-2">{item.recommendation}</td>
                <td className="border px-4 py-2">
                  {item.timestamp?.seconds
                    ? new Date(item.timestamp.seconds * 1000).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default History;
