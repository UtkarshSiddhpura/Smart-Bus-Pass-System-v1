import { useState, useEffect, useRef, useContext } from "react";
import qrcode from "qrcode-generator";
import { UserContext } from "../../contexts/user";
import { getCurrentUserPasses } from "../../utils/firebase/firebase.utils";

import { Container, Card, Typography, Box } from "@mui/material";

const UserPasses = () => {
	const { currentUser } = useContext(UserContext);
	const [passes, setPasses] = useState(null);
	const qrCodesDataURL = useRef([]);

	useEffect(() => {
		async function fetchPasses() {
			const passes = await getCurrentUserPasses();
			setPasses(passes);
			if (passes && passes.length) {
				qrCodesDataURL.current = passes.map((pass) => {
					const qr = qrcode(0, "H");
					qr.addData(`${pass.id},${currentUser.uid}`);
					qr.make();
					return qr.createDataURL(4, 10);
				});
			}
		}
		fetchPasses();
	}, [currentUser]);

	return (
		<Container
			sx={{
				mt: 5,
				display: "flex",
				gap: 4,
				justifyContent: "center",
			}}
		>
			{passes &&
				passes.map((pass, i) => (
					<Card
						sx={{
							display: "flex",
							padding: 3,
							paddingInline: 2,
							border: "1px solid grey",
							justifyContent: "space-between",
							position: "relative",
							overflow: "visible",
							width: "min(92vw, 500px)",
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
								{"Pass_ID: " + pass.id}
							</Typography>
						</Box>
						<Box
							sx={{
								display: "flex",
								width: "100%",
								flexWrap: "wrap",
								gap: 4,
							}}
						>
							<Box sx={{ m: 2, aspectRatio: 1 }}>
								<img src={qrCodesDataURL.current[i]} alt="QR Code" />
							</Box>
							<Box
								sx={{
									flexGrow: 1,
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-evenly",
								}}
							>
								<Box>
									<Typography component="span" variant="h5">
										{`${pass.placeFrom} - ${pass.placeTo}`}
									</Typography>
								</Box>
								<Box>
									<Typography component="span" variant="h6">
										Route: &nbsp;
									</Typography>
									<Typography component="span" variant="body">
										{pass.route}
									</Typography>
								</Box>
								<Box>
									<Typography component="span" variant="h6">
										Duration:&nbsp;
									</Typography>
									<Typography component="span" variant="body">
										{pass.passDuration}
									</Typography>
								</Box>
								<Box>
									<Typography component="span" variant="h6">
										Date From:&nbsp;
									</Typography>
									<Typography component="span" variant="body">
										{pass.dateFrom}
									</Typography>
								</Box>
								<Box>
									<Typography component="span" variant="h6">
										Date To:&nbsp;
									</Typography>
									<Typography component="span" variant="body">
										{pass.dateTo}
									</Typography>
								</Box>
								<Box>
									<Typography component="span" variant="h6">
										Fare Paid:&nbsp;
									</Typography>
									<Typography component="span" variant="body">
										{`₹${pass.farePrice}`}
									</Typography>
								</Box>
							</Box>
						</Box>
					</Card>
				))}
		</Container>
	);
};
export default UserPasses;
