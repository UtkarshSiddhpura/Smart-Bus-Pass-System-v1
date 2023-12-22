import { Link } from "react-router-dom";
import { useState, useContext, useDebugValue, useEffect } from "react";
import { UserContext } from "../../contexts/user";
import Card from "@mui/material/Card";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import CardIcon from "@mui/icons-material/CreditCard";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import EmailIcon from "@mui/icons-material/Email";
import ArticleIcon from "@mui/icons-material/Article";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import PersonIcon from "@mui/icons-material/PersonOutline";

import { getCurrentUserData } from "../../utils/firebase/firebase.utils";

const defaultFields = {
	username: "",
	email: "",
	phone: "",
	college: "",
};
const UserDashboard = () => {
	const { currentUser } = useContext(UserContext);
	const [userData, setUserData] = useState(defaultFields);
	const { username, email, phone, college } = userData;
	useEffect(() => {
		async function getData() {
			const userData = await getCurrentUserData();
			if (userData) setUserData(userData);
		}
		getData();
	}, [currentUser]);

	return (
		currentUser && (
			<Container
				maxWidth="lg"
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: 5,
					py: 4,
					pt: 8,
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexWrap: "wrap",
						justifyContent: "space-evenly",
						gap: 5,
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 4,
						}}
					>
						<Card
							sx={{
								display: "flex",
								gap: 3,
								padding: 3,
								paddingInline: 2,
								border: "1px solid grey",
								justifyContent: "space-between",
								position: "relative",
								overflow: "visible",
								width: "min(92vw, 600px)",
							}}
						>
							<Box
								sx={{
									position: "absolute",
									top: -14,
									padding: "2px 7px",
									background: "white",
									border: "1px solid grey",
									borderRadius: 2,
								}}
							>
								<Typography color="text.secondary" sx={{ fontWeight: "bold" }}>
									User Profile
								</Typography>
							</Box>
							<Box
								sx={{
									display: "flex",
									flexWrap: "wrap",
								}}
							>
								<IconButton sx={{ p: 2, mr: 2, aspectRatio: 1 }}>
									<PersonAddIcon sx={{ fontSize: 120 }} />
								</IconButton>
								<Box
									sx={{
										flex: 1,
										display: "flex",
										flexDirection: "column",
										justifyContent: "space-evenly",
									}}
								>
									<Box>
										<Typography component="span" variant="h6">
											Name:&nbsp;
										</Typography>
										<Typography component="span" variant="body">
											{username}
										</Typography>
									</Box>
									<Box>
										<Typography component="span" variant="h6">
											Email: &nbsp;
										</Typography>
										<Typography component="span" variant="body">
											{email}
										</Typography>
									</Box>
									<Box>
										<Typography component="span" variant="h6">
											Phone:&nbsp;
										</Typography>
										<Typography component="span" variant="body">
											{phone}
										</Typography>
									</Box>
									<Box>
										<Typography component="span" variant="h6">
											College:&nbsp;
										</Typography>
										<Typography component="span" variant="body">
											{college}
										</Typography>
									</Box>
								</Box>
							</Box>
						</Card>
						<List>
							<Link
								style={{ textDecoration: "none", color: "rgba(0, 0, 0, .87)" }}
								to="/issue-new-pass"
							>
								<ListItem disablePadding>
									<ListItemButton>
										<ListItemIcon>
											<CardIcon color="primary" />
										</ListItemIcon>
										<ListItemText primary="Issue Your first Pass Now" />
										<ListItemIcon>
											<ArrowRightAltIcon />
										</ListItemIcon>
									</ListItemButton>
								</ListItem>
							</Link>
							<Divider />
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemIcon>
										<EmailIcon color="error" />
									</ListItemIcon>
									<ListItemText
										primary="Email not verified"
										secondary="Please check your inbox for verification link"
									/>
									<ListItemIcon>
										<PriorityHighIcon fontSize="small" />
									</ListItemIcon>
								</ListItemButton>
							</ListItem>
							<Divider />
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemIcon>
										<PersonIcon color="warning" />
									</ListItemIcon>
									<ListItemText primary="Student verification with college is Pending" />
									<ListItemIcon>
										<PriorityHighIcon fontSize="small" />
									</ListItemIcon>
								</ListItemButton>
							</ListItem>
							<Divider />
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemIcon>
										<ArticleIcon color="warning" />
									</ListItemIcon>
									<ListItemText primary="Required Documents are not Uploaded" />
									<ListItemIcon>
										<PriorityHighIcon fontSize="small" />
									</ListItemIcon>
								</ListItemButton>
							</ListItem>
							<Divider />
						</List>
					</Box>
					<Card
						sx={{
							display: "flex",
							gap: 3,
							padding: 3,
							paddingInline: 2,
							border: "1px solid #777",
							justifyContent: "space-between",
							position: "relative",
							overflow: "visible",
						}}
					>
						<Box
							sx={{
								position: "absolute",
								top: -14,
								padding: "2px 7px",
								background: "white",
								border: "1px solid #777",
								borderRadius: 2,
							}}
						>
							<Typography
								color="text.secondary"
								sx={{
									fontWeight: "bold",
									display: "flex",
									alignItems: "center",
									gap: 0.5,
								}}
							>
								<HistoryRoundedIcon />
								History
							</Typography>
						</Box>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								width: "min(85vw, 350px)",
								maxHeight: "70vh",
								overflowY: "auto",
							}}
						>
							<CardContent>
								<Box>
									<Typography color="grey" variant="body">
										No History found!
									</Typography>
								</Box>
							</CardContent>
						</Box>
					</Card>
				</Box>
			</Container>
		)
	);
};

export default UserDashboard;
