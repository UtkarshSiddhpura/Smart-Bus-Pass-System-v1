import { createTheme } from "@mui/material";

export const theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 650,
			md: 900,
			lg: 1200,
			xl: 1536,
		},
	},
	palette: {
		// mode: "dark",
		primary: {
			main: "#1976d2",
		},
		secondary: {
			main: "#FF2E63",
		},
		text: {
			secondary: "rgba(0, 0, 0, 0.72)",
		},
		border: "rgba(0, 0, 0, 0.25)",
	},
	typography: {
		fontFamily: "'Quicksand', sans-serif",
		fontWeightLight: 400,
		fontWeightRegular: 500,
		fontWeightMedium: 600,
		fontWeightBold: 700,
	},
	components: {
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					"& .MuiInputBase-input::placeholder": {
						opacity: .7,
					},
					"& .MuiInputBase-input.Mui-disabled": {
						WebkitTextFillColor: "rgba(0, 0, 0, 0.60)" 
					}
				},
			},
		},
		MuiTabs: {
			variants: [
				{
					props: { variant: "standard", color: "light" },
					style: {
						"& .MuiTabs-indicator": {
							backgroundColor: "white",
							height: "2px",
							marginBottom: "8px",
							borderRadius: "10px",
						},
						"& .Mui-selected": {
							color: "white !important",
						},
					},
				},
			],
		},
	},
});
