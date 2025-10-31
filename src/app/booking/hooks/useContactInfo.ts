// hooks/useContactInfo.ts
"use client";

import { useState } from "react";

export const useContactInfo = () => {
  const [contactName, setContactName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  return {
    contactName,
    email,
    phone,
    setContactName,
    setEmail,
    setPhone,
  };
};