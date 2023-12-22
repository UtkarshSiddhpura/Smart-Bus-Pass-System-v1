import { useState, useContext, useRef } from "react";
import { UserContext } from "../../contexts/user";
import { Link } from "react-router-dom";

import { Container, OutlinedInput } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import IconButton from "@mui/material/IconButton";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const gap = 15;

const UserDashboard = () => {
	const { currentUser } = useContext(UserContext);
	const [formFields, setFormFields] = useState({
		routeFrom: "",
		routeTo: "",
		dateFrom: "",
		dateTo: "",
		farePrice: 0,
		photo: null,
		aadhar: "",
		collegeID: "",
	});
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const {
		routeFrom,
		routeTo,
		dateFrom,
		dateTo,
		farePrice,
		photo,
		aadhar,
		collegeID,
	} = formFields;

	const handleChange = (e) => {
		setFormFields({
			...formFields,
			[e.target.name]: e.target.value,
		});
	};
	const handlePhotoChange = (e) => {
		setFormFields({
			...formFields,
			photo: e.target.files[0],
		});
	};

	const aadharFileRef = useRef(null);
	const idFileRef = useRef(null);

	return (
		<Container
			maxWidth= "lg"
			sx={{
				minHeight: "100vh",
				py: 4,
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Typography
				sx={{
					fontWeight: "bold",
					color: "text.secondary",
					fontSize: "24px",
					textDecoration: "underline",
					mb: 4,
				}}
			>
				Pass Application Form
			</Typography>
			<Box component="main" sx={{ display: "flex" }}>
				<form onSubmit={() => {}}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: { gap },
						}}
					>
						{/* TODO new REF */}
						<IconButton
							sx={{ p: 2, borderRadius: 1, backgroundColor: "grey.200" }}
							onClick={() => aadharFileRef.current.click()}
						>
							<PersonAddIcon sx={{ fontSize: 120 }} />
							<Typography sx={{ fontWeight: "bold" }}>
								Upload Your Photo
							</Typography>
							<input ref={idFileRef} type="file" style={{ display: "none" }} />
						</IconButton>
						<OutlinedInput
							required
							fullWidth
							name="aadhar"
							value={aadhar}
							type="aadhar"
							onChange={handleChange}
							autoComplete="off"
							inputProps={{
								minLength: 12,
								maxLength: 12,
								placeholder: "Enter & Upload Aadhar",
							}}
							endAdornment={
								<IconButton
									onClick={() => aadharFileRef.current.click()}
									aria-label="upload ID card"
									color="primary"
								>
									<input
										ref={aadharFileRef}
										type="file"
										style={{ display: "none" }}
									/>

									<CloudUploadIcon />
								</IconButton>
							}
						/>
						<OutlinedInput
							required
							fullWidth
							name="collegeID"
							value={collegeID}
							type="collegeID"
							onChange={handleChange}
							autoComplete="college"
							inputProps={{
								placeholder: "Enter & Upload College ID",
							}}
							endAdornment={
								<IconButton
									onClick={() => idFileRef.current.click()}
									aria-label="upload ID card"
									color="primary"
								>
									<input
										ref={idFileRef}
										type="file"
										style={{ display: "none" }}
									/>

									<CloudUploadIcon />
								</IconButton>
							}
						/>
						<Box sx={{ display: "flex", gap: { gap } }}>
							<TextField
								name="routeFrom"
								label="Route From"
								value={routeFrom}
								onChange={handleChange}
							/>
							<TextField
								name="routeTo"
								label="Route To"
								value={routeTo}
								onChange={handleChange}
							/>
						</Box>
						<Box sx={{ display: "flex", gap: { gap } }}>
							<TextField
								name="dateFrom"
								label="Date From"
								type="date"
								fullWidth
								value={dateFrom}
								onChange={handleChange}
								InputLabelProps={{ shrink: true }}
							/>
							<TextField
								label="Date To"
								type="date"
								fullWidth
								disabled={true}
								value={dateTo}
								InputLabelProps={{ shrink: true }}
							/>
						</Box>
						<TextField
							label="Fare Price"
							fullWidth
							type="text"
							disabled={true}
							value={"₹ " + farePrice}
						/>
						<Button
							variant="contained"
							disabled={buttonDisabled}
							fullWidth
							type="submit"
						>
							Submit
						</Button>
					</Box>
				</form>
			</Box>
		</Container>
	);
};

export default UserDashboard;
