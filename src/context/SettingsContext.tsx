"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type SettingsContextType = {
  theme: "light" | "dark";
  textSize: "normal" | "large";
  toggleTheme: () => void;
  toggleTextSize: () => void;
};

const SettingsContext = createContext<
  SettingsContextType | undefined
>(undefined);

type SettingsProviderProps = {
  children: ReactNode;
};

export function SettingsProvider({
  children,
}: SettingsProviderProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [textSize, setTextSize] =
    useState<"normal" | "large">("normal");

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  }

  function toggleTextSize() {
    setTextSize((currentSize) =>
      currentSize === "normal" ? "large" : "normal"
    );
  }

  return (
    <SettingsContext.Provider
      value={{
        theme,
        textSize,
        toggleTheme,
        toggleTextSize,
      }}
    >
      <div
        className={`appSettings ${theme} ${
          textSize === "large" ? "largeText" : ""
        }`}
      >
        {children}
      </div>
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "useSettings must be used inside SettingsProvider"
    );
  }

  return context;
}