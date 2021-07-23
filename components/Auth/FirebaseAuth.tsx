import { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';

const uiConfig = {
	signInFlow: 'popup',
	signInSuccessUrl: '/',
	signInOptions: [
		{
			provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
			requireDisplayName: false,
		},
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.FacebookAuthProvider.PROVIDER_ID,
	],
	credentialHelper: 'none',
	callbacks: {
		// https://github.com/firebase/firebaseui-web#signinsuccesswithauthresultauthresult-redirecturl
		signInSuccessWithAuthResult: () => false,
	},
};

const FirebaseAuth = () => {
	const [renderAuth, setRenderAuth] = useState(false);
	useEffect(() => {
		if (typeof window !== 'undefined') {
			setRenderAuth(true);
		}
	}, []);
	return (
		<div>
			{renderAuth ? (
				<StyledFirebaseAuth
					uiConfig={uiConfig}
					firebaseAuth={firebase.auth()}
				/>
			) : null}
		</div>
	);
};

export default FirebaseAuth;
