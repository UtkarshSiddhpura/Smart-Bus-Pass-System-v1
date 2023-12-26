import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user";
import {
	updateCurrentUserData,
	generateNewPass,
} from "../../utils/firebase/firebase.utils";

import { Container, OutlinedInput } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import IconButton from "@mui/material/IconButton";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const gap = 20;
const UserDashboard = () => {
	//TODO: AutoFill
	const { currentUser } = useContext(UserContext);
	const navigate = useNavigate();
	const [formFields, setFormFields] = useState({
		photo: {},
		aadharFile: {},
		idFile: {},
		aadhar: "",
		collegeID: "",
		placeFrom: "",
		placeTo: "",
		dateFrom: new Date(),
		dateTo: "",
		passDuration: "",
		address: "",
		district: "Bharuch",
		block: "",
		route: "",
		farePrice: 0,
	});
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const {
		photo,
		aadharFile,
		idFile,
		collegeID,
		placeFrom,
		placeTo,
		dateFrom,
		dateTo,
		aadhar,
		passDuration,
		address,
		district,
		block,
		route,
		farePrice,
	} = formFields;

	const handlePassDuration = (e) => {
		const date = new Date();
		let fare = 0;
		switch (e.target.value) {
			case "Monthly":
				date.setMonth(dateFrom.getMonth() + 1);
				fare = 500;
				setFormFields({
					...formFields,
				});
				break;
			case "Tri-Monthly":
				date.setMonth(dateFrom.getMonth() + 3);
				fare = 1300;
				break;
			case "Yearly":
				date.setFullYear(dateFrom.getFullYear() + 1);
				fare = 12 * 400;
				break;
			default:
				break;
		}
		setFormFields({
			...formFields,
			farePrice: fare,
			passDuration: e.target.value,
			dateTo: date.toISOString().slice(0, 10),
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setButtonDisabled(true);
		if (!photo.name || !aadharFile.name || !idFile.name) {
			alert("Please Upload all the Required Documents!");
			return;
		}
		try {
			await updateCurrentUserData(
				{ aadhar, collegeID, district, block, address },
				{
					aadharFile,
					idFile,
					photo,
				}
			);
			await generateNewPass({
				placeFrom,
				placeTo,
				route,
				dateFrom: dateFrom.toISOString().slice(0, 10),
				dateTo,
				passDuration,
				farePrice,
			});
			navigate("/dashboard/passes/");
		} catch (e) {
			alert(
				e.code ? e.code : "Something Wrong with submitting Pass Application"
			);
		}
		setButtonDisabled(false);
	};

	const handleChange = (e) => {
		setFormFields({
			...formFields,
			[e.target.name]: e.target.value,
		});
	};
	const handleDocUpload = (e) => {
		if (!e.target.files[0].type.startsWith("image/")) {
			alert("Please select a valid image file.");
			return;
		}
		setFormFields({
			...formFields,
			[e.target.name]: e.target.files[0],
		});
	};

	const photoRef = useRef(null);
	const aadharFileRef = useRef(null);
	const idFileRef = useRef(null);

	return (
		<Container
			maxWidth="lg"
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
			<form onSubmit={handleSubmit}>
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
						gap: 2,
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: { gap },
						}}
					>
						<IconButton
							sx={{ p: 2, borderRadius: 1, backgroundColor: "grey.200" }}
							onClick={() => photoRef.current.click()}
						>
							<PersonAddIcon sx={{ fontSize: 120 }} />
							<Typography sx={{ fontWeight: "bold" }}>
								{photo.name ? photo.name : "Upload Your Photo"}
							</Typography>
							<input
								ref={photoRef}
								onChange={handleDocUpload}
								name="photo"
								accept="image/*"
								type="file"
								style={{ display: "none" }}
							/>
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
								<Box
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<Typography
										sx={{
											fontWeight: "bold",
											fontSize: "10px",
											color: "text.secondary",
											width: 70,
											whiteSpace: "nowrap",
											overflow: "hidden",
										}}
									>
										{aadharFile.name}
									</Typography>
									<Typography sx={{ pr: 1 }}>
										{aadharFile.name && "..."}
									</Typography>
									<IconButton
										onClick={() => aadharFileRef.current.click()}
										aria-label="upload ID card"
										color="primary"
									>
										<input
											ref={aadharFileRef}
											onChange={handleDocUpload}
											accept="image/*"
											name="aadharFile"
											type="file"
											style={{ display: "none" }}
										/>

										<CloudUploadIcon />
									</IconButton>
								</Box>
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
								<Box
									sx={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<Typography
										sx={{
											fontWeight: "bold",
											fontSize: "10px",
											color: "text.secondary",
											width: 70,
											whiteSpace: "nowrap",
											overflow: "hidden",
										}}
									>
										{idFile.name}
									</Typography>
									<Typography sx={{ pr: 1 }}>{idFile.name && "..."}</Typography>
									<IconButton
										onClick={() => idFileRef.current.click()}
										aria-label="upload ID card"
										color="primary"
									>
										<input
											ref={idFileRef}
											accept="image/*"
											onChange={handleDocUpload}
											name="idFile"
											type="file"
											style={{ display: "none" }}
										/>

										<CloudUploadIcon />
									</IconButton>
								</Box>
							}
						/>
						<Box sx={{ display: "flex", gap: { gap } }}>
							<TextField
								fullWidth
								select
								required
								value={district}
								name="district"
								label="City"
								onChange={handleChange}
							>
								<MenuItem disabled value="">
									Select City
								</MenuItem>
								{[
									"Ahemdabad",
									"Ankleshwar",
									"Bharuch",
									"Bhavnagar",
									"Surat",
									"Kim",
									"Panoli",
									"Rajkot",
									"Vadodara",
									"Ghandinagar",
									"Uttran",
									"Mehsana",
								].map((option, i) => (
									<MenuItem key={i} value={option}>
										{option}
									</MenuItem>
								))}
							</TextField>
							<TextField
								fullWidth
								select
								required
								value={block}
								name="block"
								label="Block"
								onChange={handleChange}
							>
								<MenuItem disabled value="">
									Select State
								</MenuItem>
								{[
									{ value: 242101, text: "AMOD" },
									{ value: 242102, text: "ANKLESHWAR" },
									{ value: 242103, text: "BHARUCH" },
									{ value: 242104, text: "HANSOT" },
									{ value: 242105, text: "JAMBUSAR" },
									{ value: 242106, text: "VAGRA" },
									{ value: 242107, text: "VALIA" },
									{ value: 242108, text: "ZAGHADIA" },
									{ value: 242109, text: "NETRANG" },
								].map((option, i) => (
									<MenuItem key={option.value} value={option.value}>
										{option.text}
									</MenuItem>
								))}
							</TextField>
						</Box>
						<TextField
							fullWidth
							name="address"
							multiline
							required
							rows={3}
							label="Address"
							value={address}
							onChange={handleChange}
						/>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: { gap },
						}}
					>
						<Box sx={{ display: "flex", gap: { gap } }}>
							<TextField
								fullWidth
								name="placeFrom"
								label="Place From"
								required
								value={placeFrom}
								onChange={handleChange}
							/>
							<TextField
								fullWidth
								name="placeTo"
								label="Place To"
								required
								value={placeTo}
								onChange={handleChange}
							/>
						</Box>
						<TextField
							fullWidth
							select
							required
							value={route}
							name="route"
							label="Route"
							onChange={handleChange}
						>
							<MenuItem disabled value="">
								Available Routes
							</MenuItem>
							{["Route_1", "Route_2", "Route_3", "Route_4"].map((option, i) => (
								// TODO don't use i for key
								<MenuItem key={i} value={option}>
									{option}
								</MenuItem>
							))}
						</TextField>
						<Box sx={{ display: "flex", gap: { gap } }}>
							<TextField
								name="dateFrom"
								label="Date From"
								type="date"
								fullWidth
								value={dateFrom.toISOString().slice(0, 10)}
								onChange={handleChange}
								InputLabelProps={{ shrink: true }}
								inputProps={{
									min: new Date().toISOString().slice(0, 10),
								}}
							/>
							<TextField
								label="Date To"
								type="date"
								fullWidth
								value={dateTo}
								disabled={true}
								InputLabelProps={{ shrink: true }}
							/>
						</Box>
						<TextField
							fullWidth
							select
							required
							value={passDuration}
							name="passDuration"
							label="Pass Duration"
							onChange={handlePassDuration}
						>
							<MenuItem disabled value="">
								Select Pass Duration
							</MenuItem>
							{["Monthly", "Tri-Monthly", "Yearly"].map((option, i) => (
								<MenuItem key={i} value={option}>
									{option}
								</MenuItem>
							))}
						</TextField>
						<TextField
							label="Fare Price"
							fullWidth
							type="text"
							disabled={true}
							value={"₹ " + farePrice}
						/>
					</Box>
				</Box>
				<Button
					sx={{ mt: 5 }}
					variant="contained"
					disabled={buttonDisabled}
					fullWidth
					type="submit"
				>
					Submit Application
				</Button>
			</form>
		</Container>
	);
};

export default UserDashboard;
