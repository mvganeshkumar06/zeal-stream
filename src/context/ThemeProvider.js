import React, { useState, useEffect } from "react";
import ThemeContext from "./ThemeContext";

const ThemeProvider = ({ children }) => {
	const [isDarkModeOn, setIsDarkModeOn] = useState(false);

	const switchTheme = () => {
		setIsDarkModeOn(!isDarkModeOn);
	};

	useEffect(() => {
		const theme = localStorage.getItem("theme");
		setIsDarkModeOn(theme === "dark");
	}, []);

	useEffect(() => {
		const bodyClassList = document.body.classList;
		if (isDarkModeOn) {
			bodyClassList.add("dark");
			bodyClassList.remove("light");
		} else {
			bodyClassList.add("light");
			bodyClassList.remove("dark");
		}

		localStorage.setItem("theme", isDarkModeOn ? "dark" : "light");
	}, [isDarkModeOn]);

	return (
		<ThemeContext.Provider value={{ isDarkModeOn, switchTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
