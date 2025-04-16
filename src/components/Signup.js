
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email,
        phone
      });
      alert("Signed up successfully!");
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <form onSubmit={handleSignup} className="p-6 max-w-md mx-auto">
      <input type="email" placeholder="Email" className="w-full p-2 mb-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" className="w-full p-2 mb-2" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <input type="tel" placeholder="Phone Number" className="w-full p-2 mb-2" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Sign Up</button>
    </form>
  );
}

export default Signup;
