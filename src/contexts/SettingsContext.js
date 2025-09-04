import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getFromLS, saveToLS } from '../services/storage';

const SettingsContext = createContext();
const LS_KEY = 'wms_settings_v1';
const defaultSettings = { lowStockThreshold: 10 };

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => ({ ...defaultSettings, ...getFromLS(LS_KEY, {}) }));

  useEffect(()=> { saveToLS(LS_KEY, settings); }, [settings]);

  const updateSetting = useCallback((key, value) => setSettings(prev => ({ ...prev, [key]: value })), []);

  return <SettingsContext.Provider value={{ settings, updateSetting }}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => useContext(SettingsContext);
