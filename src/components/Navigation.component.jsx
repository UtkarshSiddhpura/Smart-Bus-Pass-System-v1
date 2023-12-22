import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { signOutUser } from "../utils/firebase/firebase.utils";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import PersonIcon from "@mui/icons-material/PersonOutline";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Badge from "@mui/material/Badge";
import ListItemIcon from "@mui/material/ListItemIcon";

import IconButton from "@mui/material/IconButton";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import MenuIcon from "@mui/icons-material/Menu";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CardIcon from "@mui/icons-material/CreditCard";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";

const iconStyles = { mr: -0.8 };
const pages = [
	{
		name: "Home",
		icon: <HomeRoundedIcon sx={iconStyles} />,
	},
	{
		name: "My Passes",
		icon: <CardIcon sx={iconStyles} />,
	},
	{
		name: "Pass Renewal",
		icon: (
			<Badge badgeContent={0} color="secondary">
				<AutorenewIcon />
			</Badge>
		),
	},
];
export default function Navigation() {
	const navigate = useNavigate();
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [tab, setTab] = useState(0); //TODO https://mui.com/material-ui/guides/routing/#react-router-examples

	const signOut = async () => {
		await signOutUser();
		navigate("/sign-in");
	};

	const settings = [
		{
			name: "Edit Profile",
			icon: <EditIcon />,
			onClick: () => {},
		},
		{
			name: "Logout",
			icon: <LogoutIcon />,
			onClick: signOut,
		},
	];

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleTabChange = (event, newTabIndex) => {
		setTab(newTabIndex);
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<AppBar
				position="static"
				sx={{ backgroundColor: "white", maxWidth: "xl", marginInline: "auto" }}
			>
				<Toolbar>
					<DirectionsBusIcon
						sx={{
							fontSize: "36px",
							color: "secondary.main",
							display: { xs: "none", sm: "flex" },
						}}
					/>
					<Typography
						variant="h6"
						noWrap
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							textDecoration: "none",
							color: "#282828",
						}}
					>
						E-Pass
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
						>
							<MenuIcon />
						</IconButton>
						<Menu
							anchorEl={anchorElNav}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{pages.map((page) => (
								<MenuItem key={page.name} onClick={handleCloseNavMenu}>
									<ListItemIcon>{page.icon}</ListItemIcon>
									<Typography textAlign="center">{page.name}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<DirectionsBusIcon
						sx={{
							color: "secondary.main",
							fontSize: "36px",
							display: { xs: "flex", sm: "none" },
							mr: 1,
						}}
					/>
					<Typography
						variant="h5"
						noWrap
						sx={{
							display: { xs: "flex", sm: "none" },
							fontWeight: "bold",
							color: "#282828",
							flexGrow: 1,
						}}
					>
						E-Pass
					</Typography>
					<Tabs
						sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}
						value={tab}
						onChange={handleTabChange}
						centered
					>
						{pages.map((page) => (
							<Tab
								key={page.name}
								icon={page.icon}
								onClick={handleCloseNavMenu}
								iconPosition="start"
								label={page.name}
								color="secondary"
							/>
						))}
					</Tabs>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu}>
								<PersonIcon />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map((setting) => (
								<MenuItem key={setting.name} onClick={setting.onClick}>
									<ListItemIcon>{setting.icon}</ListItemIcon>
									<Typography textAlign="center">{setting.name}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</AppBar>
			<Outlet />
		</Box>
	);
}
