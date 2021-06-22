import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import initFirebase from '../firebase/firebaseClient';

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
		const cancelAuthListener = firebase.auth().onIdTokenChanged((user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});

		return () => {
			cancelAuthListener();
		};
	}, []);

	return { user, logout };
};

export { useUser };
