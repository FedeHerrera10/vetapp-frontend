import { useState, useEffect } from "react";

const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Verifica el almacenamiento local para el tema preferido
    const savedTheme = localStorage.getItem("dark-mode");
    return savedTheme === "true";
  });

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    // Agrega o quita la clase 'dark' al elemento documentElement
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Guarda la preferencia del tema en el almacenamiento local
    localStorage.setItem("dark-mode", isDarkMode.toString());
  }, [isDarkMode]);

  return { isDarkMode, toggleTheme };
};

export default useTheme;
