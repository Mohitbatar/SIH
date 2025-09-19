"use client"

import { useState, useEffect } from "react"

interface SettingsState {
  theme: "light" | "dark" | "system"
  language: "en" | "hi" | "ta"
  timezone: string
  units: "metric" | "imperial"
  dateFormat: string
  currency: string
  notifications: {
    email: boolean
    dataAlerts: boolean
    reports: boolean
    systemUpdates: boolean
    research: boolean
  }
  dataSharing: boolean
  analytics: boolean
}

const defaultSettings: SettingsState = {
  theme: "system",
  language: "en",
  timezone: "ist",
  units: "metric",
  dateFormat: "dd-mm-yyyy",
  currency: "inr",
  notifications: {
    email: true,
    dataAlerts: true,
    reports: true,
    systemUpdates: true,
    research: false,
  },
  dataSharing: true,
  analytics: true,
}

export function useSettings() {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("user-settings")
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setSettings({ ...defaultSettings, ...parsed })
      } catch (error) {
        console.error("Failed to parse saved settings:", error)
      }
    }
    setIsLoading(false)
  }, [])

  const updateSettings = (newSettings: Partial<SettingsState>) => {
    const updatedSettings = { ...settings, ...newSettings }
    setSettings(updatedSettings)
    localStorage.setItem("user-settings", JSON.stringify(updatedSettings))
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
    localStorage.removeItem("user-settings")
  }

  return {
    settings,
    updateSettings,
    resetSettings,
    isLoading,
  }
}
