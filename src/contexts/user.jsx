import { createContext, useReducer, useEffect } from "react";
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

// To access the context state
export const UserContext = createContext({
	currentUser: null,
	userFetched: false,
	setCurrentUser: () => null,
	setUserFetched: () => null,
});

const USER_ACTION_TYPES = {
	SET_CURRENT_USER: "SET_CURRENT_USER",
	SET_USER_FETCHED: "SET_USER_FETCHED",
	SET_USER_DATA: "SET_USER_DATA",
};

// Dictate new state of context
const userReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return {
				...state,
				currentUser: payload,
			};
		case USER_ACTION_TYPES.SET_USER_FETCHED:
			return {
				...state,
				userFetched: payload,
			};
		default:
			throw new Error("Unhandled userReducer:" + type);
	}
};

const INITIAL_STATE = {
	currentUser: null,
	userFetched: false,
};

export const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
	const { currentUser, userFetched } = state;

	const setCurrentUser = (user) => {
		dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
	};

	const setUserFetched = (bool) => {
		dispatch({ type: USER_ACTION_TYPES.SET_USER_FETCHED, payload: bool });
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			setCurrentUser(user);
			setUserFetched(true);
		});
		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		userFetched,
		setCurrentUser,
		setUserFetched,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
