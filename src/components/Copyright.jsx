import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

export function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary" align="center" {...props}>
			{"Copyright © "}
			<Link color="inherit" href="#">
				__
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}
