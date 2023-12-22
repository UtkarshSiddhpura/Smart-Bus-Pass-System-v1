import { useState } from "react";
import { signInUserFromEmailFromAuth } from "../../utils/firebase/firebase.utils";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { Copyright } from "@/components/Copyright";

const defaultFormFields = {
	email: "",
	password: "",
};

const SignInForm = () => {
	const navigate = useNavigate();
	const [formFields, setFormFields] = useState(defaultFormFields);
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const { email, password } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setButtonDisabled(true);
		try {
			const { user } = await signInUserFromEmailFromAuth(email, password);
			if (user.uid) navigate("/dashboard");
		} catch (err) {
			switch (err.code) {
				case "auth/wrong-password":
					alert("Incorrect Password for the Email");
					break;
				case "auth/user-not-found":
					alert("No user with email exists");
					break;
				default:
					alert("Error in sign-in user: " + err.code);
			}
		}
		setButtonDisabled(false);
	};

	return (
		<Container
			component="main"
			maxWidth="xs"
			sx={{
				minHeight: "100vh",
				display: "grid",
				placeContent: "center",
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography
					component="h6"
					sx={{ mb: 3, display: "flex", fontWeight: "bold" }}
				>
					<DirectionsBusIcon sx={{ color: "secondary.main" }} />
					Sign In
				</Typography>
				<Box sx={{ width: "min(400px, 97vw)" }}>
					<form onSubmit={handleSubmit}>
						<TextField
							margin="normal"
							required
							fullWidth
							label="Enter Email"
							type="email"
							name="email"
							value={email}
							autoFocus
							autoComplete="email"
							onChange={handleChange}
						/>
						<TextField
							margin="normal"
							onChange={handleChange}
							required
							fullWidth
							label="Enter Password"
							name="password"
							value={password}
							type="password"
						/>
						<Button
							variant="contained"
							disabled={buttonDisabled}
							fullWidth
							type="submit"
							sx={{ mt: 2 }}
						>
							Sign In
						</Button>
						<Box
							sx={{ mt: "8vh", color: "text.secondary", textAlign: "center" }}
							disabled={buttonDisabled}
						>
							<span>Don't have an account </span>
							<Link to="/">Sign Up</Link>
						</Box>
					</form>
				</Box>
			</Box>
			<Copyright sx={{ mt: 2, mb: 1 }} />
		</Container>
	);
};

export default SignInForm;
