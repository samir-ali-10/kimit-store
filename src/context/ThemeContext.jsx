import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {

    let [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark");

    let toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    useEffect(() => {
        localStorage.setItem("theme", theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;