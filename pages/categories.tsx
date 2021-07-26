import firebase from 'firebase';
import {
	AuthAction,
	useAuthUser,
	withAuthUser,
	withAuthUserTokenSSR,
	getFirebaseAdmin,
} from 'next-firebase-auth';
import React from 'react';
import CategoriesData from '../models/categoriesData';

function Categories({ categories }: any) {
	const AuthUser = useAuthUser();

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
	let result = await getFirebaseAdmin()
		.firestore()
		.collection('categories')
		.get();

	const categoriesData: CategoriesData[] = [];
	result.forEach((doc) => {
		const names = doc.data()['names'] as string[];
		if (names?.length > 0) {
			categoriesData.push({
				documentId: doc.id,
				names: names,
			});
		}
	});
	return {
		props: {
			categories: categoriesData,
		},
	};
});

export default withAuthUser({
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Categories);
