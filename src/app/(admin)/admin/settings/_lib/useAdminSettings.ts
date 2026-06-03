"use client";

import { useState } from "react";

/* ── useAdminSettings — local form state + transient saved flag ── */
export function useAdminSettings() {
  const [saved, setSaved] = useState(false);
  const [platformName, setPlatformName] = useState("Plateform");
  const [supportEmail, setSupportEmail] = useState("support@plateform.co.il");
  const [maxDishes, setMaxDishes] = useState("20");
  const [allowSignup, setAllowSignup] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [newRestaurantAlert, setNewRestaurantAlert] = useState(true);
  const [require2FA, setRequire2FA] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return {
    saved,
    platformName,
    setPlatformName,
    supportEmail,
    setSupportEmail,
    maxDishes,
    setMaxDishes,
    allowSignup,
    setAllowSignup,
    maintenanceMode,
    setMaintenanceMode,
    emailNotifs,
    setEmailNotifs,
    newRestaurantAlert,
    setNewRestaurantAlert,
    require2FA,
    setRequire2FA,
    autoBackup,
    setAutoBackup,
    handleSave,
  };
}

export type AdminSettingsCtrl = ReturnType<typeof useAdminSettings>;
