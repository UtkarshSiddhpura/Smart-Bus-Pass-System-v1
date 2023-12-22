import { useState, useEffect } from "react";
import {
	signUpUser,
	verifyUserOtp,
	renderCaptcha,
} from "../../utils/firebase/firebase.utils";
import { Link, useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { Copyright } from "@/components/Copyright";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ColorlibConnector from "@/components/ColorlibConnector";
import ColorlibStepIcon from "@/components/ColorlibStepIcon";

const API =
	"https://api.data.gov.in/resource/44bea382-c525-4740-8a07-04bd20a99b52?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&filters%5Bdistrict_name%5D=";

const defaultFormFields = {
	phone: "",
	username: "",
	email: "",
	password: "",
	otp: "",
	college: "",
};

const steps = ["Enter Basic Infomation", "Verify OTP"];

const SignUpForm = () => {
	useEffect(() => {
		renderCaptcha();
	}, []);

	const navigate = useNavigate();
	const [formFields, setFormFields] = useState(defaultFormFields);
	const [activeStep, setActiveStep] = useState(0);

	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [district, setDistrictName] = useState("");
	const { phone, otp, username, email, password, college } = formFields;

	const [clgOptions, setClgOptions] = useState([]);

	useEffect(() => {
		if (district.length < 5) return;
		let query = district.trim().toLowerCase();
		query = query.charAt(0).toUpperCase() + query.slice(1);
		async function fetchClgOptions() {
			try {
				const response = await fetch(API + query);
				const jsonData = await response.json();
				setClgOptions(jsonData.records);
			} catch (e) {}
		}
		fetchClgOptions();
	}, [district]);

	const resetForm = () => {
		setFormFields(defaultFormFields);
	};

	const handleBack = () => {
		if (activeStep === 0) return;
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		if ((name == "otp" || name == "phone") && !/^$|^\d+$/.test(value)) return;

		setFormFields((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleOptionsChange = (event) => {
		const { name, value } = event.target;
		switch (name) {
			case "district":
				setDistrictName(value);
				break;
		}
	};

	const signUpUserWithPhone = async (e) => {
		e.preventDefault();
		setButtonDisabled(true);
		try {
			await signUpUser("+91 " + phone, email);
			setActiveStep((prevActiveStep) => prevActiveStep + 1);
		} catch (e) {
			if (e.code) alert("Error in signing up user: " + e.code);
			else alert(e.message);
		}
		setButtonDisabled(false);
	};

	const verifyOtp = async (e) => {
		e.preventDefault();
		setButtonDisabled(true);
		try {
			await verifyUserOtp(formFields);
			navigate("/dashboard");
		} catch (e) {
			if (e.code === "auth/provider-already-linked")
				alert("User Already Exists with given Phone numeber");
			else if (e.code) {
				setActiveStep(2);
				alert("Error in verifying Otp/Creating user: " + e.code);
			}
			setActiveStep(0);
		}
		setButtonDisabled(false);
	};

	const buttonControls = (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row-reverse",
				gap: 2,
				mt: 2,
			}}
		>
			<Button
				variant="contained"
				disabled={buttonDisabled}
				fullWidth
				type="submit"
			>
				{activeStep === steps.length - 1 ? "Verify OTP" : "Next"}
			</Button>
			<Button
				variant="outlined"
				disabled={activeStep === 0}
				onClick={handleBack}
				fullWidth
			>
				Back
			</Button>
		</Box>
	);

	const getCurrentForm = () => {
		switch (activeStep) {
			case 0:
				return (
					<form onSubmit={signUpUserWithPhone}>
						<TextField
							margin="dense"
							required
							fullWidth
							label="Enter Fullname"
							name="username"
							value={username}
							type="text"
							autoFocus
							onChange={handleChange}
						/>
						<TextField
							margin="dense"
							required
							fullWidth
							label="Enter College District"
							name="district"
							value={district}
							type="text"
							autoFocus
							onChange={handleOptionsChange}
						/>
						<TextField
							margin="dense"
							fullWidth
							select
							required
							value={college}
							name="college"
							label="Select College"
							onChange={handleChange}
						>
							<MenuItem disabled value="">
								Select your College
							</MenuItem>
							{clgOptions.map((option) => (
								<MenuItem
									key={option["college_name"]}
									value={option["college_name"]}
								>
									{option["college_name"]}
								</MenuItem>
							))}
						</TextField>
						<TextField
							margin="dense"
							onChange={handleChange}
							required
							fullWidth
							label="Enter Email"
							name="email"
							value={email}
							autoComplete="email"
							type="email"
							autoFocus
						/>
						<TextField
							margin="dense"
							onChange={handleChange}
							required
							fullWidth
							label="Enter Password"
							name="password"
							value={password}
							type="password"
							autoFocus
						/>
						<TextField
							margin="dense"
							required
							fullWidth
							label="Enter Mobile no."
							type="text"
							name="phone"
							value={phone}
							autoFocus
							onChange={handleChange}
							inputProps={{
								minLength: 10,
								maxLength: 10,
							}}
						/>
						{buttonControls}
						<Box
							sx={{ mt: "4vh", color: "text.secondary", textAlign: "center" }}
						>
							<span>Alredy have an account </span>
							<Link to="/sign-in">Sign In</Link>
						</Box>
					</form>
				);
			case 1:
				return (
					<form onSubmit={verifyOtp}>
						<TextField
							margin="dense"
							required
							fullWidth
							label="Enter otp"
							name="otp"
							value={otp}
							type="text"
							onChange={handleChange}
							autoFocus
						/>
						{buttonControls}
					</form>
				);
			default:
				return <></>;
				break;
		}
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
					minHeight: "700px",
				}}
			>
				<Typography
					component="h6"
					sx={{ mb: 3, display: "flex", fontWeight: "bold" }}
				>
					<DirectionsBusIcon sx={{ color: "primary.main" }} />
					Sign Up
				</Typography>
				<Stepper
					alternativeLabel
					activeStep={activeStep}
					connector={<ColorlibConnector />}
					sx={{ width: "100%", mb: 4 }}
				>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel StepIconComponent={ColorlibStepIcon}>
								{label}
							</StepLabel>
						</Step>
					))}
				</Stepper>
				<Box sx={{ width: "min(400px, 97vw)" }}>{getCurrentForm()}</Box>
				<Copyright sx={{ mt: 2, mb: 1 }} />
			</Box>

			<div id="recaptcha-container"></div>
		</Container>
	);
};

export default SignUpForm;
