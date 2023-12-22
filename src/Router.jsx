import Navigation from "./components/Navigation.component";
import SignInForm from "./routes/sign-in-form/sign-in-form.component";
import UserDashboard from "./routes/user-dashboard/user-dashboard.component";
import IssuePassForm from "./routes/issue-pass/issue-pass.component";
import App from "@/App";

import {
	createBrowserRouter,
	RouterProvider,
	redirect,
} from "react-router-dom";

// not a good idea to put inside the Router component
const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/sign-in",
		element: <SignInForm />,
	},
	{
		path: "/dashboard",
		element: <Navigation />,
		children: [{ index: true, element: <UserDashboard /> }],
		// TODO auth to be handled
	},
	{
		path: "/issue-new-pass",
		element: <IssuePassForm />,
	},
]);

function Router() {
	return <RouterProvider router={router} />;
}

export default Router;
