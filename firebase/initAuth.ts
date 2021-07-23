import { init } from 'next-firebase-auth';

const TWELVE_DAYS_IN_MS = 12 * 60 * 60 * 24 * 1000;

const initAuth = () => {
	init({
		debug: false,
		authPageURL: '/auth',
		appPageURL: '/',
		loginAPIEndpoint: '/api/login', // required
		logoutAPIEndpoint: '/api/logout', // required
		firebaseAdminInitConfig: {
			credential: {
				projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
				clientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
				privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(
					/\\n/g,
					'\n'
				),
			},
			databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || '',
		},
		firebaseClientInitConfig: {
			apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '', // required
			authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
			databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
			projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		},
		cookies: {
			name: 'BudgetyApp', // required
			// Keys are required unless you set `signed` to `false`.
			// The keys cannot be accessible on the client side.
			keys: [
				process.env.COOKIE_SECRET_CURRENT,
				process.env.COOKIE_SECRET_PREVIOUS,
			],
			httpOnly: true,
			maxAge: TWELVE_DAYS_IN_MS, // twelve days
			overwrite: true,
			path: '/',
			sameSite: 'strict',
			secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === 'true', // set this to false in local (non-HTTPS) development
			signed: true,
		},
	});
};

export default initAuth;
