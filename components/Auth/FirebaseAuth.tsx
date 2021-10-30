import { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {
	getAuth,
	EmailAuthProvider,
	GoogleAuthProvider,
	FacebookAuthProvider,
} from 'firebase/auth';
import 'firebase/auth';

const uiConfig = {
	signInFlow: 'popup',
	signInSuccessUrl: '/',
	signInOptions: [
		{
			provider: EmailAuthProvider.PROVIDER_ID,
			requireDisplayName: false,
		},
		GoogleAuthProvider.PROVIDER_ID,
		FacebookAuthProvider.PROVIDER_ID,
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
					firebaseAuth={getAuth()}
				/>
			) : null}
		</div>
	);
};

export default FirebaseAuth;
