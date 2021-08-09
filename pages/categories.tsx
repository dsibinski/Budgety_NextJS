import {
	Flex,
	Heading,
	UnorderedList,
	ListItem,
	Text,
	Spinner,
} from '@chakra-ui/react';
import firebase from 'firebase';
import {
	AuthAction,
	useAuthUser,
	withAuthUser,
	withAuthUserTokenSSR,
	getFirebaseAdmin,
} from 'next-firebase-auth';
import React, { useEffect, useState } from 'react';
import CategoriesList from '../components/CategoriesList';
import UserCategories from '../models/userCategories';

function Categories() {
	const AuthUser = useAuthUser();
	const [categories, setCategories] = useState<UserCategories | null>(null);

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
					let userCategoriesData: UserCategories | null = null;

					const categoryDocData = doc.data();

					if (!categoryDocData) {
						throw new Error(
							"There's no categories data for this user"
						);
					}

					const names = categoryDocData['names'];
					if (names?.length > 0) {
						userCategoriesData = {
							names: names,
						};
					}

					setCategories(userCategoriesData);
				});
		}
	}, [AuthUser]);

	if (AuthUser) {
		return categories ? (
			<CategoriesList categories={categories} />
		) : (
			<Spinner />
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
