import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import initFirebase from '../firebase/firebaseClient';
import nookies from 'nookies';

initFirebase();

const useUser = () => {
	const [user, setUser] = useState<firebase.User | null>();
	const router = useRouter();

	const logout = async () => {
		return firebase
			.auth()
			.signOut()
			.then(() => {
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
					setUser(user);
				} else {
					setUser(null);
					nookies.set(undefined, 'token', '', {});
				}
			});

		return () => {
			cancelAuthListener();
		};
	}, []);

	return { user, logout };
};

export { useUser };
