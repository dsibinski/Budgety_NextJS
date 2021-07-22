import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import initFirebase from '../firebase/firebaseClient';
import nookies from 'nookies';
import User from '../models/user';

initFirebase();

const useUser = (initUser: User | null) => {
	const [user, setUser] = useState<User | null>(initUser);
	const router = useRouter();

	const logout = async () => {
		return firebase
			.auth()
			.signOut()
			.then(() => {
				setUser(null);
				nookies.set(undefined, 'token', '', {});
				router.push('/auth');
			})
			.catch((e) => {
				console.error(e);
			});
	};

	useEffect(() => {
		const cancelAuthListener = firebase
			.auth()
			.onIdTokenChanged(async (user) => {
				if (user) {
					const token = await user.getIdToken();
					nookies.set(undefined, 'token', token, {});
					setUser({
						name: user.displayName || user.email || '',
						id: user.uid,
					});
				}
			});

		return () => {
			cancelAuthListener();
		};
	}, []);

	return { user, logout };
};

export { useUser };
