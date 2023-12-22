import { initializeApp } from "firebase/app";
import {
	getAuth,
	updateProfile,
	RecaptchaVerifier,
	signInWithPhoneNumber,
	signInWithEmailAndPassword,
	EmailAuthProvider,
	linkWithCredential,
	fetchSignInMethodsForEmail,
	onAuthStateChanged,
} from "firebase/auth";
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	limitToLast,
} from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDOaa608aTROn9KRUzlzcBv2WHxeNs3JYg",
	authDomain: "e-bus-pass-2567a.firebaseapp.com",
	projectId: "e-bus-pass-2567a",
	storageBucket: "e-bus-pass-2567a.appspot.com",
	messagingSenderId: "222064828412",
	appId: "1:222064828412:web:5b1bbafd8937c9d862dc79",
	measurementId: "G-C95WMXXFX7",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth();

export const verifyUserOtp = async (userInfo) => {
	const { email, password, otp, ...additionalInfo } = userInfo;
	if (!email || !password || !otp)
		throw new Error("Please provide necessary fields");

	const { user } = await window.confirmationResult.confirm(otp);

	// Link Email/Phone auth
	const credential = EmailAuthProvider.credential(email, password);
	await linkWithCredential(user, credential);
	updateProfile(user, {
		displayName: additionalInfo.username,
	})
		.then(() => {})
		.catch((error) => {
			console.error("Error in udpating additional userInfo: ", error);
		});

	// Save user Info in users collection
	return await createUserFromAuth(user, email, additionalInfo);
};

export const signUpUser = async (phoneNumber, email) => {
	let appVerifier = window.recaptchaVerifier;

	// TODO: Verify email or use signInWithPopup
	const emailSignIn = await fetchSignInMethodsForEmail(auth, email);
	if (emailSignIn && emailSignIn.length > 0)
		throw new Error("Email already Exists!, please Sign-In");

	window.confirmationResult = await signInWithPhoneNumber(
		auth,
		phoneNumber,
		appVerifier
	);
};

export const signOutUser = async () => {
	await auth.signOut();
};

export const renderCaptcha = () => {
	window.recaptchaVerifier = new RecaptchaVerifier(
		"recaptcha-container",
		{
			size: "invisible",
		},
		auth
	);
};

const db = getFirestore();
export const createUserFromAuth = async (
	userAuth,
	email,
	additionalInfo = {}
) => {
	if (!userAuth) return;

	const userDocRef = doc(db, "users", userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		try {
			const createdAt = new Date();

			await setDoc(userDocRef, {
				email,
				createdAt,
				...additionalInfo,
			});
		} catch (e) {
			console.log("There is some err with user setDoc: " + e);
		}
	}
	return userSnapshot;
};

export const getCurrentUserData = async () => {
	if (!auth.currentUser) return;
	const userDocRef = doc(db, "users", auth.currentUser.uid);
	const userSnapshot = await getDoc(userDocRef);
	return userSnapshot.data();
};

export const signInUserFromEmailFromAuth = async (email, password) => {
	if (!email || !password) return;
	const response = await signInWithEmailAndPassword(auth, email, password);
	return response;
};

export const onAuthStateChangedListener = (callback) =>
	onAuthStateChanged(auth, callback);
