"use client";

import { useEffect } from "react";
import { initializeApp, FirebaseApp } from "firebase/app";

export default function TestFirebase() {
  useEffect(() => {
    console.log("🔥 Test page mounted in browser");

    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    };

    console.log("🔑 Firebase config:", firebaseConfig);

    try {
      const app: FirebaseApp = initializeApp(firebaseConfig);
      console.log("✅ Firebase initialized successfully:", app.name);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("❌ Firebase init error:", error.message);
      } else {
        console.error("❌ Unknown error during Firebase init:", error);
      }
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Firebase Test Page</h1>
      <p>Check your browser console for output.</p>
    </div>
  );
}
