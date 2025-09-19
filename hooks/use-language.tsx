"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "hi" | "ta"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.oceanography": "Oceanography",
    "nav.taxonomy": "Taxonomy",
    "nav.molecular": "Molecular Biology",
    "nav.data": "Data Management",
    "nav.reports": "Reports",
    "nav.analytics": "Analytics",
    "nav.settings": "Settings",

    // Settings
    "settings.title": "Settings",
    "settings.description": "Manage your account, preferences, and system configuration",
    "settings.profile": "Profile",
    "settings.preferences": "Preferences",
    "settings.notifications": "Notifications",
    "settings.security": "Security",
    "settings.data": "Data",
    "settings.system": "System",
    "settings.save": "Save Changes",
    "settings.theme": "Theme",
    "settings.language": "Language",
    "settings.light": "Light",
    "settings.dark": "Dark",
    "settings.system": "System",

    // Common
    "common.loading": "Loading...",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.success": "Success",
    "common.error": "Error",
  },
  hi: {
    // Navigation
    "nav.dashboard": "डैशबोर्ड",
    "nav.oceanography": "समुद्र विज्ञान",
    "nav.taxonomy": "वर्गीकरण",
    "nav.molecular": "आणविक जीव विज्ञान",
    "nav.data": "डेटा प्रबंधन",
    "nav.reports": "रिपोर्ट",
    "nav.analytics": "विश्लेषण",
    "nav.settings": "सेटिंग्स",

    // Settings
    "settings.title": "सेटिंग्स",
    "settings.description": "अपने खाते, प्राथमिकताओं और सिस्टम कॉन्फ़िगरेशन का प्रबंधन करें",
    "settings.profile": "प्रोफ़ाइल",
    "settings.preferences": "प्राथमिकताएं",
    "settings.notifications": "सूचनाएं",
    "settings.security": "सुरक्षा",
    "settings.data": "डेटा",
    "settings.system": "सिस्टम",
    "settings.save": "परिवर्तन सहेजें",
    "settings.theme": "थीम",
    "settings.language": "भाषा",
    "settings.light": "हल्का",
    "settings.dark": "गहरा",
    "settings.system": "सिस्टम",

    // Common
    "common.loading": "लोड हो रहा है...",
    "common.save": "सहेजें",
    "common.cancel": "रद्द करें",
    "common.success": "सफलता",
    "common.error": "त्रुटि",
  },
  ta: {
    // Navigation
    "nav.dashboard": "டாஷ்போர்டு",
    "nav.oceanography": "கடல் அறிவியல்",
    "nav.taxonomy": "வகைப்பாடு",
    "nav.molecular": "மூலக்கூறு உயிரியல்",
    "nav.data": "தரவு மேலாண்மை",
    "nav.reports": "அறிக்கைகள்",
    "nav.analytics": "பகுப்பாய்வு",
    "nav.settings": "அமைப்புகள்",

    // Settings
    "settings.title": "அமைப்புகள்",
    "settings.description": "உங்கள் கணக்கு, விருப்பத்தேர்வுகள் மற்றும் கணினி கட்டமைப்பை நிர்வகிக்கவும்",
    "settings.profile": "சுயவிவரம்",
    "settings.preferences": "விருப்பத்தேர்வுகள்",
    "settings.notifications": "அறிவிப்புகள்",
    "settings.security": "பாதுகாப்பு",
    "settings.data": "தரவு",
    "settings.system": "கணினி",
    "settings.save": "மாற்றங்களைச் சேமிக்கவும்",
    "settings.theme": "தீம்",
    "settings.language": "மொழி",
    "settings.light": "வெளிச்சம்",
    "settings.dark": "இருள்",
    "settings.system": "கணினி",

    // Common
    "common.loading": "ஏற்றுகிறது...",
    "common.save": "சேமிக்கவும்",
    "common.cancel": "ரத்து செய்",
    "common.success": "வெற்றி",
    "common.error": "பிழை",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
