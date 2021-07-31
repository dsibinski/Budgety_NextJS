import firebase from 'firebase';
import {
	AuthAction,
	useAuthUser,
	withAuthUser,
	withAuthUserTokenSSR,
	getFirebaseAdmin,
} from 'next-firebase-auth';
import React, { useEffect, useState } from 'react';
import CategoriesData from '../models/categoriesData';

function Categories() {
	const AuthUser = useAuthUser();
	const [categories, setCategories] = useState<CategoriesData[] | null>(null);

	useEffect(() => {
		if (AuthUser) {
			if (typeof AuthUser.id !== 'string') {
				throw new Error('User has no id');
			}
			firebase
				.firestore()
				.collection('categories')
				.doc(AuthUser.id)
				.get()
				.then((doc) => {
					const categoriesData: CategoriesData[] = [];

					const categories = doc.data();

					if (!categories) {
						throw new Error(
							"There's no categories data for this user"
						);
					}

					const names = categories['names'];
					if (names?.length > 0) {
						categoriesData.push({
							documentId: doc.id,
							names: names,
						});
					}

					setCategories(categoriesData);
				});
		}
	}, [AuthUser]);

	if (AuthUser) {
		const categoriesData = categories as CategoriesData[];
		const categoriesItems = categoriesData ? (
			categoriesData.map((category) => {
				return category.names.map((categoryString) => (
					<li key={`${category.documentId}-${categoryString}`}>
						{categoryString}
					</li>
				));
			})
		) : (
			<p>Loading categories...</p>
		);

		return (
			<div className="flex flex-col">
				<h1 className="text-2xl">Hello {AuthUser.displayName}!</h1>
				<p>Categories list:</p>
				<ul className="list-disc">{categoriesItems}</ul>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={() => AuthUser.signOut()}
				>
					Log Out
				</button>
			</div>
		);
	} else {
		return <p>You need to login first</p>;
	}
}

export const getServerSideProps = withAuthUserTokenSSR({
	whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req }) => {
	const token = await AuthUser.getIdToken(); // TODO: use token to be sent to firebase for validation
	if (typeof AuthUser.id !== 'string') {
		throw new Error('User has no id');
	}
	const categoriesDocument = await getFirebaseAdmin()
		.firestore()
		.collection('categories')
		.doc(AuthUser.id)
		.get();

	if (!categoriesDocument.exists) {
		await getFirebaseAdmin()
			.firestore()
			.collection('categories')
			.doc(AuthUser.id)
			.set({});
	}

	return {
		props: {},
	};
});

export default withAuthUser({
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Categories);
