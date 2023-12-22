import React from "react";
import ReactDOM from "react-dom/client";
import Router from "@/Router";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "@/theme";
import { UserProvider } from "./contexts/user";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<UserProvider>
				<Router />
			</UserProvider>
		</ThemeProvider>
	</React.StrictMode>,
);
