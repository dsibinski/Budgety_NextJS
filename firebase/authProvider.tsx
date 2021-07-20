import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from 'firebase';
import nookies from 'nookies';
import User from '../models/user';

const AuthContext = createContext<{ user: User | null }>({
	user: null,
});

export function AuthProvider({ children }: any) {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		return firebase.auth().onIdTokenChanged(async (user) => {
			if (!user) {
				console.log('User logged out');
				setUser(null);
				//nookies.destroy(null, 'token');
				//nookies.set(null, 'token', '', { path: '/' });
			} else {
				console.log('User logged in');
				const token = await user.getIdToken();
				const userModel: User = {
					name: user.displayName || '',
					id: user.uid,
				};
				setUser(userModel);
				nookies.destroy(null, 'token');
				nookies.set(null, 'token', token, { path: '/' });
				console.log(`Token set to ${token}`);
			}
		});
	}, []);

	return (
		<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
}

export const useAuth = () => {
	return useContext(AuthContext);
};
