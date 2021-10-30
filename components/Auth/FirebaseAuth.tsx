import { useCallback, useEffect, useState } from 'react';
const FirebaseUiStyle = require('firebaseui/dist/firebaseui.css');

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

let firebaseUi: firebaseui.auth.AuthUI;

const FirebaseAuth = () => {
	const [renderAuth, setRenderAuth] = useState(false);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setRenderAuth(true);
			// to be replaced with react-firebaseui, see https://github.com/dsibinski/Budgety/issues/29
			const renderReactUiStyledComponents = async () => {
				const firebaseui = await import('firebaseui');
				const ui = firebaseUi || new firebaseui.auth.AuthUI(getAuth());
				ui.start('#firebaseui-styled-auth-component', uiConfig);
			};

			renderReactUiStyledComponents();
		}
	}, []);

	return (
		<div>
			{renderAuth ? (
				<div id="firebaseui-styled-auth-component"></div>
			) : null}
		</div>
	);
};

export default FirebaseAuth;
