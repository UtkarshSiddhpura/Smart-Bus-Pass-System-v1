import { useContext, useEffect } from "react";
import { UserContext } from "./contexts/user";
import { useNavigate } from "react-router-dom";
import SignUpForm from "./routes/sign-up-form/sign-up-form.component";

function App() {
	const { currentUser, userFetched } = useContext(UserContext);
	const navigate = useNavigate();
	useEffect(() => {
		if (userFetched && currentUser) {
			navigate("/dashboard");
		}
	}, [userFetched]);
	return userFetched && !currentUser ? <SignUpForm /> : <></>;
}

export default App;
